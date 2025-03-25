import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { friendsTable } from '../db/schema.ts';

// For reading operations
export type friend = InferSelectModel<typeof friendsTable>;

// For creating new friend relationships
export type createFriend = {
	requester: string;
	recipient: string;
}; 