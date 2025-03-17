//controller files

import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

import { usersTable } from '../db/schema.ts';
import { publicUser } from '../models/users.ts';

// get all Users
export const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
	let sqlite = null;
	try {
		sqlite = new Database('./data/data.db', { verbose: console.log });
		const db = drizzle(sqlite);

		const users = await db.select().from(usersTable);

		const publicUsers: publicUser[] = users.map((user) => {
			return {
				id: user.id,
				uuid: user.uuid,
				username: user.username,
				alias: user.alias,
				profile_pic: user.profile_pic,
				status: user.status,
				win: user.win,
				loss: user.loss
			};
		});

		reply.send(publicUsers);
	} catch (error) {
		request.log.error('getAllUsers failed:', error);
		reply.code(500).send({ error: 'Failed to retrieve users' });
	} finally {
		if (sqlite) sqlite.close();
	}
};