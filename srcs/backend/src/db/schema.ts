
import { randomUUID } from "crypto";
import { int, sqliteTable, text, blob } from "drizzle-orm/sqlite-core";


export const usersTable = sqliteTable("users_table", {
	id: int("id").primaryKey({ autoIncrement: true }),
	// uuid: text("uuid").default(() => randomUUID()).unique(),
	// uuid: text("uuid").default(crypto.randomUUID).unique(),
	username: text("username").notNull().unique(),
	password: text("password").notNull(),
	alias: text("alias").notNull().unique(),
	profile_pic: blob("profile_pic"),
	language: text("language").default('en'),
	wins: int("wins").default(0),
	loss: int("loss").default(0)
});

export type NewUser = {
	username: string;
	password: string;
	alias: string;
	language?: string;
	wins?: number;
	loss?: number;
	profile_pic?: Buffer;
}

export const createUserTemplate = (data: Partial<NewUser>): NewUser => {
	return {
		username: data.username || '',
		password: data.password || '',
		alias: data.alias || '',
		language: data.language || 'en',
		wins: data.wins || 0,
		loss: data.loss || 0,
		...data
	};
};

export const simpleTable = sqliteTable("simple_table", {
	test: text("test"),
	numb: int("number")
})

// export default { schema: { usersTable } };