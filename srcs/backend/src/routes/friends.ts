import { FastifyInstance, } from 'fastify';
import { userStatus, eLanguage } from '../db/schema.ts';
import { authenticatePrivateToken } from './authentication.ts';
import { addFriend } from '../controllers/friends/addFriends.ts';
import { securitySchemes, errorResponseSchema } from './userdocs.ts';




export const createFriendOptions = {
	schema: {
		security: [{ apiKey: [] }],
		summary: 'adds a new friend relation',
		tags: ['friends'],
		consumes: ['application/json'],
		body: {
			type: 'object',
			required: ['requester', 'recepient'],
			properties: {
				requester: { type: 'string' },
				recepient: { type: 'string' }
			}
		},
		response: {
			201: {
				type: 'object',
				properties: {
					error: { type: 'string' },
					id: { type: 'number' }
				}
			},
			400: errorResponseSchema,
			404: errorResponseSchema,
			500: errorResponseSchema
		}
	}
};


function friendsRoutes(fastify: FastifyInstance, options: any, done: () => void) {
	fastify.addSchema({
		$id: 'security',
		security: securitySchemes
	});

	// addRelation
	fastify.post<{
		Body: {
			requester: string;
			recepient: string;
		}
	}>('/friends/new', { preHandler: [authenticatePrivateToken], ...createFriendOptions }, addFriend);

	done();
}

export default friendsRoutes;