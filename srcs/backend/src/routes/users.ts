// routes - users.ts

import { FastifyInstance } from 'fastify';
import {
	getAllUsers,
	getUserById,
	getUsersByRole,
	getUserByAlias,
	getUserStats,
	getLeaderboard
} from '../controllers/users.ts';

// Schema for user properties
const userProperties = {
	id: { type: 'number' },
	uuid: { type: 'string' },
	username: { type: 'string' },
	alias: { type: 'string' },
	profilePic: { type: ['string', 'null'] },
	wins: { type: 'number' },
	losses: { type: 'number' },
	role: { type: 'string' }
};

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



function userRoutes(fastify: FastifyInstance, options: any, done: () => void) {
	// User routes
	fastify.get('/users', getUsersOptions, getAllUsers);
	fastify.get('/users/:id', getUserOptions, getUserById);
	fastify.get('/users/role/:role', getUsersOptions, getUsersByRole);
	fastify.get('/users/alias/:alias', getUserOptions, getUserByAlias);
	fastify.get('/users/:id/stats', getUserStatsOptions, getUserStats);

	// Leaderboard route
	fastify.get('/leaderboard', getLeaderboardOptions, getLeaderboard);

	done();
}

export default userRoutes;