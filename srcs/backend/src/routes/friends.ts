import { FastifyInstance, } from 'fastify';
import { friendStatus } from '../db/schema.ts';
import { authenticatePrivateToken } from './authentication.ts';
import { addFriend } from '../controllers/friends/addFriends.ts';
import { securitySchemes, errorResponseSchema } from './userdocs.ts';


const relationProperties = {
	type: 'object',
	properties: {
		id: { type: 'number' },
		reqUUid: { type: 'string' },
		recUUid: { type: 'string' },
		status: { type: 'string' }
	}
}

export const createFriendOptions = {
	schema: {
		security: [{ apiKey: [] }],
		summary: 'adds a new friend relation',
		tags: ['friends'],
		consumes: ['application/json'],
		body: {
			type: 'object',
			required: ['reqUUid', 'recUUid'],
			properties: {
				reqUUid: { type: 'string' },
				recUUid: { type: 'string' }
			}
		},
		response: {
			201: {
				type: 'object',
				properties: {
					msg: { type: 'string' },
					relation: relationProperties
				}
			},
			400: errorResponseSchema,
			404: errorResponseSchema,
			409: {
				type: 'object',
				properties: {
					error: { type: 'string' },
					relation: relationProperties
				}
			},
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
			reqUUid: string;
			recUUid: string;
		}
	}>('/friends/new', { preHandler: [authenticatePrivateToken], ...createFriendOptions }, addFriend);

	done();
}

export default friendsRoutes;