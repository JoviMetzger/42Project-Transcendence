import { InferModel } from 'drizzle-orm';
import { matchesTable } from '../db/schema';

export type match = InferModel<matchesTable>

export type createMatch = Omit<matchesTable, 'id'> & {
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
} 