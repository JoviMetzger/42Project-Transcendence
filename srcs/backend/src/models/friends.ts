import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { friendsTable } from '../db/schema.ts';

// For reading operations
export type friend = InferSelectModel<typeof friendsTable>;

// For creating new friend relationships
type baseRelation = InferInsertModel<typeof friendsTable>;

export function createRelation(requestUUid: string, recepientUUid: string): baseRelation {
	return {
		requester: requestUUid,
		recipient: recepientUUid
	}
}