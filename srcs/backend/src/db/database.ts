import { FastifyPluginAsync } from 'fastify'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import Database from 'better-sqlite3'
import { createUserTemplate, simpleTable, usersTable, userTableProperties } from './schema.ts'
import { int, sqliteTable, text, blob } from "drizzle-orm/sqlite-core";
//import envConfig from '../config/env.ts'

declare module 'fastify' {
	interface FastifyInstance {
		db: ReturnType<typeof drizzle>
	}
}

export const startDatabase: FastifyPluginAsync = async (fastify) => {

	try {
		const sqlite = new Database('./data/data.db', { verbose: console.log })
		const db = drizzle({ client: sqlite })

		fastify.decorate('db', db)

		fastify.addHook('onClose', async (instance) => {
			await sqlite.close()
		})

	} catch (error) {
		fastify.log.error('startDatabase initialization failed:', error)
		throw error
	}
}

export const populateUser: FastifyPluginAsync = async (fastify) => {
	try {
		const sqlite = new Database('./data/data.db', { verbose: console.log })
		const db = drizzle({ client: sqlite })

		const output = await db.select().from(usersTable);

		// Create a new user following the schema
		const newUser = createUserTemplate({ username: 'bruh', password: 'mypass', alias: 'my_alias' })

		await db.insert(usersTable).values(newUser);

		// fastify.addHook('onClose', async (instance) => {
		// 	await sqlite.close()
		// })
	} catch (error) {
		fastify.log.error('startDatabase initialization failed:', error)
		throw error
	}
}

// export default startDatabase