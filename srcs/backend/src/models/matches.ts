import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { matchesTable } from '../db/schema.ts';

// InferSelect for reading operations
export type match = InferSelectModel<typeof matchesTable>;

// InferInsert for writing operations
export type createMatch = InferInsertModel<typeof matchesTable> & {
	uuid: string;
	p1Alias: string;
	p2Alias: string;
	p1_id: string | null;
	p2_id: string | null;
	status: number;
	winner_id: number;
	start_time?: string;
	end_time: string;
	duration?: number;
};