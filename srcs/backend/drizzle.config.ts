import { defineConfig } from "drizzle-kit";

export default {
	schema: './src/db/schema.ts',
	out: './drizzle',
	dialect: 'sqlite',
	// driver: 'better-sqlite3',
	dbCredentials: {
		url: './data/data.db'
	}
} satisfies defineConfig