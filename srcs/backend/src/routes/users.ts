// routes - users.ts

import { FastifyInstance } from 'fastify';
import {
	getAllUsers,
	getUserById,
	getUserByAlias,
	getUserStats,
	getLeaderboard,
	AddUser
} from '../controllers/users.ts';

// Schema for user properties
const userProperties = {
	id: { type: 'number' },
	uuid: { type: 'string' },
	username: { type: 'string' },
	alias: { type: 'string' },
	profilePic: { type: ['string', 'null'] },
	wins: { type: 'number' },
	losses: { type: 'number' }
};

const addUserProperties = {
	username: { type: 'string', minLength: 3 },
	alias: { type: 'string', minLength: 3 },
	password: { type: 'string', minLength: 6 },
	profilePic: { type: ['string', 'null'] }
} as const;

// Schema for multiple users response
const getUsersOptions = {
	schema: {
		response: {
			200: {
				type: 'array',
				items: {
					type: 'object',
					properties: userProperties
				}
			}
		}
	}
};

// Schema for single user response
const getUserOptions = {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: userProperties
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

// Schema for user stats response
const getUserStatsOptions = {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					...userProperties,
					totalGames: { type: 'number' },
					winRate: { type: 'string' }
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

// Schema for leaderboard response
const getLeaderboardOptions = {
	schema: {
		response: {
			200: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						...userProperties,
						rank: { type: 'number' },
						totalGames: { type: 'number' },
						winRate: { type: 'string' }
					}
				}
			}
		}
	}
};


// POST

// Schema for single user response
const postUserOptions = {
	schema: {
		body: {
			type: 'object',
			required: ['username', 'alias', 'password'],
			properties: addUserProperties
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


function userRoutes(fastify: FastifyInstance, options: any, done: () => void) {
	// User routes
	fastify.get('/users', getUsersOptions, getAllUsers);
	fastify.get('/users/:id', getUserOptions, getUserById);
	fastify.get('/users/alias/:alias', getUserOptions, getUserByAlias);
	fastify.get('/users/:id/stats', getUserStatsOptions, getUserStats);

	// Leaderboard route
	fastify.get('/leaderboard', getLeaderboardOptions, getLeaderboard);


	// user POST
	fastify.post('/users/new', postUserOptions, AddUser);


	done();
}

export default userRoutes;