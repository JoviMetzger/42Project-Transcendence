import { FastifyInstance, } from 'fastify';
import { authenticatePrivateToken } from './authentication.ts';
import { securitySchemes, errorResponseSchema, publicUserProperties } from './userdocs.ts';
import { addFriend } from '../controllers/friends/addFriends.ts';
import { getFriends } from '../controllers/friends/getFriends.ts';


const relationProperties = {
	type: 'object',
	properties: {
		id: { type: 'number' },
		reqUUid: { type: 'string' },
		recUUid: { type: 'string' },
		status: { type: 'string' }
	}
}

/*

	friends: [...]
	sentRequests: [...]
	receivedRequests: [...]
	deniedRequests: [...]
	blocked: [...]

 */
const friendListProperties = {
	type: 'object',
	properties: {
		friends: {
			type: 'array',
			items: publicUserProperties
		},
		sentRequests: {
			type: 'array',
			items: publicUserProperties
		},
		receivedRequests: {
			type: 'array',
			items: publicUserProperties
		},
		deniedRequests: {
			type: 'array',
			items: publicUserProperties
		},
		blocked: {
			type: 'array',
			items: publicUserProperties
		}
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

	// get all Relations
	fastify.get<{ Params: { uuid: string } }>
		('/friends/:uuid', { preHandler: [authenticatePrivateToken], ...friendListProperties },
			getFriends)

	done();
}

export default friendsRoutes;