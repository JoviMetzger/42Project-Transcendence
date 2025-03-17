// generate and update user settings
import { FastifyReply, FastifyRequest, FastifyPluginAsync } from 'fastify';
import { MultipartFile } from '@fastify/multipart'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { CreateUserRequest, CreateUser, hashPassword, validateUser, PublicUser } from '../models/users.ts';
import { usersTable, userStatus } from '../db/schema.ts'
import { randomUUID } from 'crypto';

// Extend FastifyRequest to include multipart file handling
interface MultipartRequest extends FastifyRequest {
	file: () => Promise<MultipartFile>;
	body: CreateUserRequest;
}

export const addUser = async (request: MultipartRequest, reply: FastifyReply) => {
	let sqlite = null;
	try {
		const body = request.body;

		// profile pic first
		let profilePic: Buffer | null = null;

		const file = await request.file();
		if (file) {
			if (!file.mimetype.startsWith('image/')) {
				reply.code(400).send({ error: 'File must be an image (jpeg, png, or gif)' });
				return;
			}

			profilePic = await file.toBuffer();
		}

		const userData: CreateUser = {
			uuid: crypto.randomUUID(),
			username: body.username,
			alias: body.alias,
			profile_pic: profilePic || undefined,
			password: hashPassword(body.password).hashedPassword,
			salt: hashPassword(body.password).salt,
			language: body.language,
			status: body.status
		};

		validateUser(userData);

		// add to database
		sqlite = new Database('./data/data.db', { verbose: console.log });
		const db = drizzle(sqlite);
		await db.insert(usersTable).values(userData);

		const out: PublicUser = { ...userData }

		reply.code(201).send(out);
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
