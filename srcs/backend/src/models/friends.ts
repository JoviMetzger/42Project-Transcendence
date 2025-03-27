import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { friendsTable, friendStatus } from '../db/schema.ts';

// For reading operations
export type friend = InferSelectModel<typeof friendsTable>;

// For creating new friend relationships
type baseRelation = InferInsertModel<typeof friendsTable>;

type publicRelation = Omit<friend, 'status'> & {
	status: string;
}

export function createRelation(requestUUid: string, recepientUUid: string): baseRelation {
	return {
		reqUUid: requestUUid,
		recUUid: recepientUUid
	}
}

export function toPublicRelation(databaseRelation: friend): publicRelation {
	return {
		...databaseRelation,
		status: friendStatus[databaseRelation.status] // Convert enum number to string
	}
}