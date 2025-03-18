//controller files

// files
import { FastifyReply, FastifyRequest } from 'fastify';
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
// packages
import { usersTable } from '../db/schema.ts';
import { toPublicUser } from '../models/users.ts';

// get all Users
export const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
	let sqlite = null;
	try {
		sqlite = new Database('./data/data.db', { verbose: console.log });
		const db = drizzle(sqlite);

		const users = await db.select().from(usersTable);

		// Use the toPublicUser helper to map users to public format
		const publicUsers = users.map(toPublicUser);

		reply.send(publicUsers);
	} catch (error) {
		request.log.error('getAllUsers failed:', error);
		reply.code(500).send({ error: 'Failed to retrieve users' });
	} finally {
		if (sqlite) sqlite.close();
	}
};