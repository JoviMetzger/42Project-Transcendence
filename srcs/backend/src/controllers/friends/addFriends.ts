//modules
import { FastifyReply, FastifyRequest } from 'fastify';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import Database from 'better-sqlite3';
//files
import { friendsTable, usersTable } from '../../db/schema.ts'
import { createRelation } from '../../models/friends.ts'


export const addFriend = async (request: FastifyRequest<{
	Body: {
		requester: string;
		recepient: string;
	}
}>, reply: FastifyReply) => {
	let sqlite = null;
	try {
		const { requester, recepient } = request.body
		if (!requester || !recepient)
			reply.code(400).send("requester and recepient must have values");

		sqlite = new Database('./data/data.db', { verbose: console.log })
		const db = drizzle(sqlite)
		const reqUserArray = await db.select().from(usersTable).where(eq(usersTable.uuid, requester))
		const recUserArray = await db.select().from(usersTable).where(eq(usersTable.uuid, recepient))
		if (reqUserArray.length == 0 || recUserArray.length == 0)
			reply.code(404).send("requester or recepient do not exist in db");
		const reqUser = reqUserArray[0];
		const recUser = recUserArray[0];

		const relation = createRelation(reqUser.uuid, recUser.uuid)

		const result = await db.insert(friendsTable).values(relation).returning()
		reply.code(201).send({ msg: "created relation", id: result[0].id })
		// @todo do something to send a friend request, can backend do this or frontend?
	}
	catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'addFriend errorr';
		reply.status(500).send({ error: errorMessage })
	}
	finally {
		if (sqlite) sqlite.close();
	}
}

