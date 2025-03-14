import { InferModel } from 'drizzle-orm';
import { friendsTable } from '../db/schema';

export type friend = InferModel<friendsTable>

export type createFriend = Omit<friendsTable, 'status'> & {
	requester: string;
	recipient: string;
} 