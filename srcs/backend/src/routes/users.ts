import { FastifyInstance } from 'fastify';
import { getAllUsers, getUserById, getUsersByRole } from '../controllers/users.ts';

// Schema for multiple users response
const getUsersOptions = {
	schema: {
		response: {
			200: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: { type: 'number' },
						name: { type: 'string' },
						role: { type: 'string' }
					}
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
				properties: {
					id: { type: 'number' },
					name: { type: 'string' },
					role: { type: 'string' }
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

function userRoutes(fastify: FastifyInstance, options: any, done: () => void) {
	// Get all users
	fastify.get('/users', getUsersOptions, getAllUsers);

	// Get user by ID
	fastify.get('/users/:id', getUserOptions, getUserById);

	// Get users by role
	fastify.get('/users/role/:role', getUsersOptions, getUsersByRole);

	done();
}

export default userRoutes;