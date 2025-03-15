// generate and update user settings
import { FastifyReply, FastifyRequest, FastifyPluginAsync } from 'fastify';
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { createUser, updateUser, validateUser } from '../modules/user.ts';
import crypto from 'crypto';

export const addUser = (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const body = request.body as createUser;
		// validate for rules in the models.ts
		const validationErrors = validateUser(body);

		// if validation errors exist
		if (Object.keys(validationErrors).length > 0) {
			return reply.status(400).send({ errors: validationErrors });
		}

		// hash the password
		const salt = crypto.randomBytes(16).toString('hex');
		body.password = crypto.pbkdf2Sync(
			body.password,
			salt,
			1000,  // iterations
			64,    // key length
			'sha512'
		).toString('hex');
	}
	catch (error) {
		fastify.log.error('startDatabase initialization failed:', error)
		throw error
	}

}

export const populateUser: FastifyPluginAsync = async (fastify) => {
	try {
		const sqlite = new Database('./data/data.db', { verbose: console.log })
		const db = drizzle({ client: sqlite })

		const output = await db.select().from(usersTable);

		// Create a new user following the schema
		const newUser = createUserTemplate({ username: 'bruh', password: 'mypass', alias: 'my_alias' })

		await db.insert(usersTable).values(newUser);

		// fastify.addHook('onClose', async (instance) => {
		// 	await sqlite.close()
		// })
	} catch (error) {
		fastify.log.error('startDatabase initialization failed:', error)
		throw error
	}
}
