// routes - users.ts

import { FastifyInstance } from 'fastify';
import {
	getAllUsers,
	getUserById,
	getUsersByRole,
	getUserByAlias,
	getUserStats,
	getUserMatches,
	getLeaderboard,
	getAllMatches,
	getMatchById
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

// Schema for match properties
const matchProperties = {
	id: { type: 'number' },
	uuid: { type: 'string' },
	player1Id: { type: 'number' },
	player2Id: { type: 'number' },
	status: { type: 'string' },
	winnerId: { type: ['number', 'null'] },
	startTime: { type: 'string' },
	endTime: { type: ['string', 'null'] },
	duration: { type: ['number', 'null'] }
};

// Schema for enhanced match properties (includes aliases)
const enhancedMatchProperties = {
	...matchProperties,
	player1Alias: { type: 'string' },
	player2Alias: { type: 'string' },
	winnerAlias: { type: ['string', 'null'] }
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

// Schema for user matches response
const getUserMatchesOptions = {
	schema: {
		response: {
			200: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						...enhancedMatchProperties,
						isWinner: { type: 'boolean' }
					}
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

// Schema for matches response
const getMatchesOptions = {
	schema: {
		response: {
			200: {
				type: 'array',
				items: {
					type: 'object',
					properties: enhancedMatchProperties
				}
			}
		}
	}
};

// Schema for single match response
const getMatchOptions = {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: enhancedMatchProperties
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

function userRoutes(fastify: FastifyInstance, options: any, done: () => void) {
	// User routes
	fastify.get('/users', getUsersOptions, getAllUsers);
	fastify.get('/users/:id', getUserOptions, getUserById);
	fastify.get('/users/role/:role', getUsersOptions, getUsersByRole);
	fastify.get('/users/alias/:alias', getUserOptions, getUserByAlias);
	fastify.get('/users/:id/stats', getUserStatsOptions, getUserStats);
	fastify.get('/users/:id/matches', getUserMatchesOptions, getUserMatches);

	// Leaderboard route
	fastify.get('/leaderboard', getLeaderboardOptions, getLeaderboard);

	// Match routes
	fastify.get('/matches', getMatchesOptions, getAllMatches);
	fastify.get('/matches/:id', getMatchOptions, getMatchById);

	done();
}

export default userRoutes;