import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getAllUsers } from '../controllers/getUsers.ts';
import { addUser, updateUserProfilePic } from '../controllers/setUsers.ts';
import envConfig from "../config/env.ts";

// Security schema for swagger
const securitySchemes = {
	apiKey: {
		type: 'http',
		scheme: 'bearer'
	}
};

// Schema for user properties
const userProperties = {
	id: { type: 'number' },
	uuid: { type: 'string' },
	username: { type: 'string' },
	alias: { type: 'string' },
	profile_pic: { type: ['string', 'null'] },
	wins: { type: 'number' },
	losses: { type: 'number' }
};

// Schema for GET users response
const getUsersOptions = {
	schema: {
		security: [{ apiKey: [] }],
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
			}
		}
	}
};

// Schema for creating a new user (JSON)
const createUserOptions = {
	schema: {
		security: [{ apiKey: [] }],
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
		},
		body: {
			type: 'object',
			required: ['profile_pic'],
			properties: {
				profile_pic: {
					type: 'string',
					format: 'binary',
					description: 'Profile picture file (JPEG, PNG, or GIF)'
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
	fastify.get('/users', getAllUsers);

	// Create user with JSON data
	fastify.post('/users/new', { ...createUserOptions }, addUser);

	// Update profile picture with multipart/form-data
	fastify.post('/users/:uuid/profile-pic', { ...updateProfilePicOptions }, updateUserProfilePic);

	done();
}

export default userRoutes;