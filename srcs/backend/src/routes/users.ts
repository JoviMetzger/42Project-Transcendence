import allUsers from '../models/users.ts'; // calls the default
import { users } from '../models/users.ts'; // import a specific const export
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

function userRoutes(fastify: FastifyInstance, options: any, done: () => void) {
	// users route displaying all users, using the default export allUser
	fastify.get('/users', (request: FastifyRequest, reply: FastifyReply) => {
		reply.send(allUsers); // reply something
	});

	// base route displaying base users, using the default export allUser
	fastify.get('/users/base', (request: FastifyRequest, reply: FastifyReply) => {
		reply.send(allUsers.users); // reply something
	});

	// admin route displaying admin users, using the default export allUser
	fastify.get('/users/admins', (request: FastifyRequest, reply: FastifyReply) => {
		reply.send(allUsers.admins); // reply something
	});

	// user route getting a single item, using the specific const export user
	fastify.get('/users/:id', (request: FastifyRequest, reply: FastifyReply) => {
		// get id from the params
		const { id } = request.params as { id: string };

		// Ensure id is a number for comparison
		const returnuser = users.find((user) => user.id === Number(id));

		reply.send(returnuser);
	});

	done();
}

export default userRoutes;