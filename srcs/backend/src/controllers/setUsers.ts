// generate and update user settings
import { FastifyReply, FastifyRequest, FastifyPluginAsync } from 'fastify';
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { createUser, hashPassword, validateUser, publicUser } from '../models/users.ts';
import { usersTable } from '../db/schema.ts'
import { randomUUID } from 'crypto';

export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
	let sqlite = null;
	try {
		const body = request.body as createUser;
		validateUser(body);
		// set uuid
		body.uuid = randomUUID();
		// hash the password
		const passwordSalt = hashPassword(body.password);
		body.password = passwordSalt.hashedPassword;
		body.salt = passwordSalt.salt;

		// add to database
		sqlite = new Database('./data/data.db', { verbose: console.log });
		const db = drizzle(sqlite);
		await db.insert(usersTable).values(body);
		reply.send('user created');
	}
	catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'addUser error';
		request.log.error('User creation failed:', error);
		reply.status(400).send({ error: errorMessage });
	}
	finally {
		if (sqlite) sqlite.close();
	}
}

// export const populateUser: FastifyPluginAsync = async (fastify) => {
// 	try {
// 		const sqlite = new Database('./data/data.db', { verbose: console.log })
// 		const db = drizzle({ client: sqlite })

// 		const output = await db.select().from(usersTable);

// 		// Create a new user following the schema
// 		const newUser = createUserTemplate({ username: 'bruh', password: 'mypass', alias: 'my_alias' })

// 		await db.insert(usersTable).values(newUser);

// 		// fastify.addHook('onClose', async (instance) => {
// 		// 	await sqlite.close()
// 		// })
// 	} catch (error) {
// 		fastify.log.error('startDatabase initialization failed:', error)
// 		throw error
// 	}
// }
