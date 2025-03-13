import { randomUUID } from 'crypto';
import { int, sqliteTable, text, blob, datetime } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";


export const usersTable = sqliteTable("users_table", {
	id: int("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull().unique(),
	username: text("username").notNull().unique(),
	password: text("password").notNull(),
	alias: text("alias").notNull().unique(),
	profile_pic: blob("profile_pic"),
	language: text("language").default('en'),
	wins: int("wins").default(0),
	loss: int("loss").default(0)
});

export type newUser = {
	uuid: string,
	username: string;
	password: string;
	alias: string;
	language?: string;
	wins?: number;
	loss?: number;
	profile_pic?: Buffer;
}

export const createUserTemplate = (data: Partial<newUser>): newUser => {
	return {
		uuid: data.uuid || crypto.randomUUID(),
		username: data.username || '',
		password: data.password || '',
		alias: data.alias || '',
		language: data.language || 'en',
		wins: data.wins || 0,
		loss: data.loss || 0,
		...data
	};
};


export const matchesTable = sqliteTable("matches", {
	id: int("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull().unique(),
	p1Alias: text("p1Alias").notNull(),
	p2Alias: text("p2Alias").notNull(),
	p1_id: text("p1_id").references(() => usersTable.uuid),
	p2_id: text("p2_id").references(() => usersTable.uuid),
	status: text("status", { enum: ['completed', 'interrupted'] }).notNull(),
	winner_id: int("winner", { enum: [0, 1, 2] }),
	start_time: text("start_time").default(sql`(current_timestamp)`),
	end_time: text("end_time").default(sql`(current_timestamp)`),
	duration: int("duration")
});

export type newMatch = {
	uuid: string,
	p1Alias: string;
	p2Alias: string;
	p1_id: string | null;
	p2_id: string | null;
	status: string;
	winner_id: number;
	start_time: string;
	end_time: string;
	duration: number;
}

export const createMatchTemplate = (data: Partial<newMatch>): newMatch => {
	const now = new Date().toISOString();
	return {
		uuid: data.uuid || crypto.randomUUID(),
		p1Alias: data.p1Alias || '',
		p2Alias: data.p2Alias || '',
		p1_id: data.p1_id || null,
		p2_id: data.p2_id || null,
		status: data.status || 'interrupted',
		winner_id: data.winner_id || 0,
		start_time: data.start_time || now, // sets it to current date/time
		end_time: data.end_time || now,
		duration: data.duration || 0
	};
};


// example table
export const simpleTable = sqliteTable("simple_table", {
	test: text("test"),
	numb: int("number")
})