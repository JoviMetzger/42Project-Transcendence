// packages
import { FastifyReply, FastifyRequest } from 'fastify';
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { eq } from 'drizzle-orm'

// files
import { usersTable } from '../db/schema.ts';
import { toPublicUser } from '../models/users.ts';


export const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
	let sqlite = null;
	try {
		const { username, password } = request.body as { username?: string; password?: string };
		if (!username || !password) {
			reply.code(400).send({ error: 'Username and password are required' });
			return;
		}

		sqlite = new Database('./data/data.db', { verbose: console.log });
		const db = drizzle(sqlite);
		const userArray = await db.select().from(usersTable).where(eq(usersTable.username, username));

		if (userArray.length === 0) {
			reply.code(401).send({ error: 'username and password combination do not match database entry' });
			return;
		}

		const user = userArray[0];
	} catch (error) {
		request.log.error('getAllUsers failed:', error);
		reply.code(500).send({ error: 'Failed to retrieve users' });
	} finally {
		if (sqlite) sqlite.close();
	}
}
