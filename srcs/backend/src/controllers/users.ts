import { FastifyReply, FastifyRequest } from 'fastify';
import Users, { User, VALID_ROLES, Role } from '../models/users.ts';

export const getAllUsers = (request: FastifyRequest, reply: FastifyReply) => {
	reply.send(Users);
};

export const getUserById = (request: FastifyRequest, reply: FastifyReply) => {
	const { id } = request.params as { id: string };
	const user = Users.find((user) => user.id === Number(id));

	if (!user) {
		reply.code(404).send({ error: 'User not found' });
		return;
	}

	reply.send(user);
};

export const getUsersByRole = (request: FastifyRequest, reply: FastifyReply) => {
	const { role } = request.params as { role: string };

	if (!VALID_ROLES.includes(role as Role)) {
		reply.code(400).send({ error: 'Invalid role' });
		return;
	}

	const filteredUsers = Users.filter((user: { id: number; name: string; role: string }) =>
		user.role === (role as Role)
	);
	reply.send(filteredUsers);
};