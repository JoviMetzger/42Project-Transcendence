//modules
import { FastifyReply, FastifyRequest } from 'fastify';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { or, eq, and } from 'drizzle-orm';
import Database from 'better-sqlite3';
//files
import { friendsTable, usersTable } from '../../db/schema.ts'
import { createRelation, toPublicRelation } from '../../models/friends.ts'


export const addFriend = async (request: FastifyRequest<{
	Body: {
		reqUUid: string;
		recUUid: string;
	}
}>, reply: FastifyReply) => {
	let sqlite = null;
	try {
		const { reqUUid, recUUid } = request.body
		if (!reqUUid || !recUUid)
			reply.code(400).send("requester and recepient must have values");

		sqlite = new Database('./data/data.db', { verbose: console.log })
		const db = drizzle(sqlite)
		// pull from users database
		const reqUserArray = await db.select().from(usersTable).where(eq(usersTable.uuid, reqUUid))
		const recUserArray = await db.select().from(usersTable).where(eq(usersTable.uuid, recUUid))
		if (reqUserArray.length == 0 || recUserArray.length == 0)
			reply.code(404).send("requester or recepient do not exist in db");
		// check if they already have a relation in friends database
		const existingRelationArray = await db.select().from(friendsTable).where(
			or(
				and(
					eq(friendsTable.reqUUid, reqUUid),
					eq(friendsTable.recUUid, recUUid)
				),
				and(
					eq(friendsTable.reqUUid, recUUid),
					eq(friendsTable.recUUid, reqUUid)
				)
			)
		).limit(1);
		if (existingRelationArray.length > 0) {
			return (reply.code(409).send({ error: "users already have relation", relation: toPublicRelation(existingRelationArray[0]) }))
		}

		const relation = createRelation(reqUUid, recUUid)
		const result = await db.insert(friendsTable).values(relation).returning()
		reply.code(201).send({ msg: "created relation", relation: toPublicRelation(result[0]) })
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

