import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getAllUsers, getUser, getUserImage } from '../controllers/getUsers.ts';
import { addUser, updateUserProfilePic } from '../controllers/setUsers.ts';
import { loginUser } from '../controllers/login.ts'
import envConfig from "../config/env.ts";

// Security schema for swagger
const securitySchemes = {
	apiKey: {
		type: 'http',
		scheme: 'bearer'
	}
};

//propertiieis for profile_pic

const loginProperties = {
	username: { type: 'string' },
	password: { type: 'string' }
}

const profilePicProperties = {
	data: { type: ['string', 'null'] },
	mimeType: { type: ['string', 'null'] }
};


// Schema for user properties
const userProperties = {
	id: { type: 'number' },
	uuid: { type: 'string' },
	username: { type: 'string' },
	alias: { type: 'string' },
	profile_pic: {
		type: 'object',
		properties: profilePicProperties
	},
	status: { type: 'number' },
	language: { type: 'string' },
	wins: { type: 'number' },
	losses: { type: 'number' }
};

const imageOptions = {
	schema: {
		security: [{ apiKey: [] }],
		summary: 'Get user profile picture by UUID',
		tags: ['users'],
		response: {
			200: {
				type: 'object',
				properties: profilePicProperties
			},
			404: {
				type: 'object',
				properties: {
					error: {
						type: 'string',
						description: 'Error message if image not found'
					}
				}
			}
		}
	}
};

// Schema for GET user response
const getUserOptions = {
	schema: {
		security: [{ apiKey: [] }],
		summary: 'Get user by UUID',
		tags: ['users'],
		response: {
			200: {
				type: 'object',
				properties: userProperties
			},
			403: {
				type: 'object',
				properties: {
					error: { type: 'string' }
				}
			},
			404: {
				type: 'object',
				properties: {
					error: { type: 'string' }
				}
			}
		}
	}
};

const getUsersOptions = {
	schema: {
		security: [{ apiKey: [] }],
		summary: 'Get all users',
		tags: ['users'],
		response: {
			200: {
				type: 'array',
				items: {
					type: 'object',
					properties: userProperties
				}
			},
			403: {
				type: 'object',
				properties: {
					error: { type: 'string' }
				}
			},
			404: {
				type: 'object',
				properties: {
					error: { type: 'string' }
				}
			}
		}
	}
};

// Schema for creating a new user (JSON)
const createUserOptions = {
	schema: {
		security: [{ apiKey: [] }],
		summary: 'Creates a new user in the database',
		tags: ['users'],
		consumes: ['application/json'],
		body: {
			type: 'object',
			required: ['username', 'alias', 'password'],
			properties: {
				username: { type: 'string', minLength: 3 },
				password: { type: 'string', minLength: 6 },
				alias: { type: 'string', minLength: 3 },
				language: { type: 'string' },
				status: { type: 'number' }
			}
		},
		response: {
			201: {
				type: 'object',
				properties: userProperties
			},
			400: {
				type: 'object',
				properties: {
					error: { type: 'string' }
				}
			}
		}
	}
};

// Schema for updating profile picture (multipart/form-data)
const updateProfilePicOptions = {
	schema: {
		security: [{ apiKey: [] }],
		tags: ['users'],
		summary: 'Upload user profile picture',
		consumes: ['multipart/form-data'],
		params: {
			type: 'object',
			required: ['uuid'],
			properties: {
				uuid: { type: 'string' }
			}
		}
	},
	response: {
		200: {
			type: 'object',
			properties: userProperties
		},
		400: {
			type: 'object',
			properties: {
				error: { type: 'string' }
			}
		},
		404: {
			type: 'object',
			properties: {
				error: { type: 'string' }
			}
		}
	}
};

const loginUserOptions = {
	schema: {
		security: [{ apiKey: [] }],
		summary: 'Logs a user in',
		tags: ['users'],
		consumes: ['application/json'],
		body: {
			type: 'object',
			required: ['username', 'password'],
			properties: {
				username: { type: 'string', minLength: 3 },
				password: { type: 'string', minLength: 6 },
			}
		},
		response: {
			200: {
				type: 'object',
				properties: userProperties
			},
			400: {
				type: 'object',
				properties: {
					error: { type: 'string' }
				}
			},
			401: {
				type: 'object',
				properties: {
					error: { type: 'string' }
				}
			},
			500: {
				type: 'object',
				properties: {
					error: { type: 'string' }
				}
			}
		}
	}
};

// Auth middleware
const authenticateAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
	const authHeader = request.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		reply.code(401).send({ error: 'Authentication required' });
		return;
	}

	const token = authHeader.split(' ')[1];
	const validToken = request.method === 'POST'
		? envConfig.post_api
		: envConfig.user_api;

	if (token !== validToken) {
		reply.code(403).send({ error: 'Invalid authentication token' });
		return;
	}
};

function userRoutes(fastify: FastifyInstance, options: any, done: () => void) {
	fastify.addSchema({
		$id: 'security',
		security: securitySchemes
	});

	// User routes
	// for testing:
	fastify.get('/user/:uuid/profile-pic', { ...imageOptions }, getUserImage);


	fastify.get('/users', { ...getUsersOptions }, getAllUsers);
	fastify.get('/user/:uuid', { ...getUserOptions }, getUser);

	// Create user with JSON data
	fastify.post('/users/new', { ...createUserOptions }, addUser);

	// Update profile picture with multipart/form-data
	fastify.post('/users/:uuid/profile-pic', { ...updateProfilePicOptions }, updateUserProfilePic);

	// Log in
	fastify.post('/user/login', { ...loginUserOptions }, loginUser)

	done();
}

export default userRoutes;