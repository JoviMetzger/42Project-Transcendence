import { randomUUID } from 'crypto';
import { int, sqliteTable, text, blob, datetime } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";


export enum userStatus {
	ONLINE = 0,
	OFFLINE = 1
}

// table with all users
export const usersTable = sqliteTable("users_table", {
	id: int("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull().unique(),
	username: text("username").notNull().unique(),
	password: text("password").notNull(),
	alias: text("alias").notNull().unique(),
	profile_pic: blob("profile_pic"),
	language: text("language").default('en'),
	status: int("status").$type<userStatus>(),
	win: int("wins").default(0),
	loss: int("loss").default(0)
});

export enum matchStatus {
	COMPLETED = 0,
	INTERRUPTED = 1
}

// table with all matches
export const matchesTable = sqliteTable("matches", {
	id: int("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull().unique(),
	p1Alias: text("p1Alias").notNull(),
	p2Alias: text("p2Alias").notNull(),
	p1_id: text("p1_id").references(() => usersTable.uuid),
	p2_id: text("p2_id").references(() => usersTable.uuid),
	status: int("status").$type<matchStatus>().notNull(),
	winner_id: int("winner", { enum: [0, 1, 2] }),
	start_time: text("start_time").default(sql`(current_timestamp)`),
	end_time: text("end_time").default(sql`(current_timestamp)`),
	duration: int("duration").default(0)
});

export enum friendStatus {
	PENDING = 0,
	ACCEPTED = 1,
	DENIED = 2,
	BLOCKED = 3
}

// friends-relations table
export const friendsTable = sqliteTable("friends", {
	requester: text("requester").references(() => usersTable.uuid),
	recipient: text("recipient").references(() => usersTable.uuid),
	status: int("status").$type<friendStatus>().default(FriendStatus.PENDING)
})