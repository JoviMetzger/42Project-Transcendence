import { defineConfig } from "drizzle-kit";
import envConfig from './src/config/env.ts'

export default defineConfig({
	schema: './src/db/schema.ts',
	out: './drizzle',
	dialect: 'sqlite',
	dbCredentials: {
		url: envConfig.db_file
	}
});