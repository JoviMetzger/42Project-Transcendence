import { FastifyReply, FastifyRequest } from 'fastify';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { or, inArray, eq } from 'drizzle-orm';
import Database from 'better-sqlite3';
//files
import { friendsTable, usersTable, friendStatus } from '../../db/schema.ts'
import { User, PublicUser, toPublicUser } from '../../models/users.ts'

export const getFriends = async (request: FastifyRequest<{ Params: { uuid: string } }>, reply: FastifyReply) => {
	let sqlite = null;
	try {
		const { uuid } = request.params;

		let returnData = {
			friendsData: [] as PublicUser[],
			sentRequestData: [] as PublicUser[],
			receivedRequestData: [] as PublicUser[],
			deniedRequestData: [] as PublicUser[],
			blockedUserData: [] as PublicUser[]
		};


		sqlite = new Database('./ data / data.db', { verbose: console.log })
		const db = drizzle(sqlite);
		const RelationArray = await db.select().from(friendsTable).where(
			or(
				eq(friendsTable.reqUUid, uuid),
				eq(friendsTable.recUUid, uuid)
			)
		);
		if (RelationArray.length == 0) {
			reply.code(200).send(returnData)
		}
		const reqRelation = RelationArray.filter(relation => relation.reqUUid === uuid);
		const recRelation = RelationArray.filter(relation => relation.recUUid === uuid);

		const friends = [];
		const denied = [];
		const sentRequests = [];
		const receivedRequests = [];
		const blockedUsers = [];
		// where the user is the requester
		for (const relation of reqRelation) {
			if (relation.status == friendStatus.ACCEPTED) {
				friends.push(relation.recUUid)
			}
			if (relation.status == friendStatus.DENIED) {
				denied.push(relation.recUUid)
			}
			if (relation.status == friendStatus.PENDING) {
				sentRequests.push(relation.recUUid)
			}
			if (relation.status == friendStatus.BLOCKED) {
				blockedUsers.push(relation.recUUid)
			}
		}
		// where the user is the receiver
		for (const relation of recRelation) {
			if (relation.status == friendStatus.ACCEPTED) {
				friends.push(relation.reqUUid)
			}
			if (relation.status == friendStatus.PENDING) {
				receivedRequests.push(relation.reqUUid)
			}
		}
		// combine all userIDs to make a single DB query
		const allUserIds = [
			...friends,
			...sentRequests,
			...receivedRequests,
			...denied,
			...blockedUsers
		].filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
		const userArray = await db.select().from(usersTable).where(inArray(usersTable.uuid, allUserIds));

		// map the UserData retreived from DB
		const userMap: Record<string, User> = {};
		userArray.forEach(user => {
			userMap[user.uuid] = user;
		});
		// assign the data to different fields
		returnData.friendsData = friends.map(id => toPublicUser(userMap[id]));
		returnData.sentRequestData = sentRequests.map(id => toPublicUser(userMap[id]));
		returnData.receivedRequestData = receivedRequests.map(id => toPublicUser(userMap[id]));
		returnData.deniedRequestData = denied.map(id => toPublicUser(userMap[id]));
		returnData.blockedUserData = blockedUsers.map(id => toPublicUser(userMap[id]));
		reply.code(200).send(returnData)

	}
	catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'getFriends errorr';
		reply.status(500).send({ error: errorMessage })
	}
	finally {
		if (sqlite) sqlite.close();
	}


}

