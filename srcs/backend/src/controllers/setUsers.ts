// controllers/setUsers.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import Database from 'better-sqlite3';
// files
import {
	CreateUser,
	hashPassword,
	validateUser,
	validateProfilePic,
	toPublicUser
} from '../models/users.ts';
import { usersTable, userStatus } from '../db/schema.ts';

// Create a user with JSON data (no profile pic)
export const addUser = async (request: FastifyRequest<{
	Body: {
		username: string;
		password: string;
		alias: string;
		language?: string;
		status?: userStatus;
	}
}>,
	reply: FastifyReply) => {
	let sqlite = null;
	try {
		const body = request.body;
		const { hashedPassword, salt } = hashPassword(body.password);

		const userData: CreateUser = {
			uuid: crypto.randomUUID(),
			username: body.username,
			alias: body.alias,
			password: hashedPassword,
			salt: salt,
			language: body.language,
			status: body.status
		};

		validateUser(userData);

		// Add to database
		sqlite = new Database('./data/data.db', { verbose: console.log });
		const db = drizzle(sqlite);
		await db.insert(usersTable).values(userData);

		const createdUser = await db.select().from(usersTable).where(eq(usersTable.username, userData.username));

		// Use the helper function to create the public user object
		reply.code(201).send(toPublicUser(createdUser[0]));
	}
	catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'addUser error';
		request.log.error('User creation failed:', error);
		reply.status(400).send({ error: errorMessage });
	}
	finally {
		if (sqlite) sqlite.close();
	}
};

// Update profile picture for an existing user
export const updateUserProfilePic = async (
	request: FastifyRequest<{
		Params: { uuid: string }
	}>,
	reply: FastifyReply
) => {
	let sqlite = null;
	try {
		const { uuid } = request.params;

		// Get the profile pic from multipart data
		const file = await request.file();
		if (!file) {
			reply.code(400).send({ error: 'No file uploaded' });
			return;
		}

		if (!file.mimetype.startsWith('image/')) {
			reply.code(400).send({ error: 'File must be an image (jpeg, png, or gif)' });
			return;
		}

		const profilePic = await file.toBuffer();

		// Validate profile pic separately
		validateProfilePic(profilePic);

		// Update database
		sqlite = new Database('./data/data.db', { verbose: console.log });
		const db = drizzle(sqlite);

		// Check if user exists
		const existingUser = await db.select().from(usersTable).where(eq(usersTable.uuid, uuid));
		if (existingUser.length === 0) {
			reply.code(404).send({ error: 'User not found' });
			return;
		}

		// Update the profile picture
		await db.update(usersTable)
			.set({ profile_pic: profilePic })
			.where(eq(usersTable.uuid, uuid));

		// Get the updated user
		const updatedUser = await db.select().from(usersTable).where(eq(usersTable.uuid, uuid));

		// Use the helper function to create the public user object
		reply.code(200).send(toPublicUser(updatedUser[0]));
	}
	catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Update profile picture error';
		request.log.error('Profile picture update failed:', error);
		reply.status(400).send({ error: errorMessage });
	}
	finally {
		if (sqlite) sqlite.close();
	}
};