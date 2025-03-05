// import { FastifyPluginCallback } from 'fastify'
// import fastifySQLite from 'fastify-better-sqlite3'
// import Database from 'better-sqlite3'
// import path from 'path'
// import fs from 'fs'

// const initializeDatabaseSchema: FastifyPluginCallback = (fastify, opts, done) => {
//   const dbPath = path.resolve(__dirname, '../../database/app.db')
  
//   // Read SQL schema files
//   const userSchema = fs.readFileSync(path.resolve(__dirname, '../../database/users.sql'), 'utf8')
//   const matchesSchema = fs.readFileSync(path.resolve(__dirname, '../../database/matches.sql'), 'utf8')

//   // Create database instance
//   const db = new Database(dbPath)

//   // Execute schema creation scripts
//   try {
//     db.exec(userSchema)
//     db.exec(matchesSchema)
    
//     fastify.log.info('Database schemas initialized successfully')
//   } catch (error) {
//     fastify.log.error('Database initialization failed', error)
//     throw error
//   }

//   // Register SQLite plugin
//   fastify.register(fastifySQLite, {
//     path: dbPath,
//     name: 'db', // This allows accessing via fastify.db
//     options: {
//       verbose: process.env.NODE_ENV === 'development' ? console.log : undefined
//     }
//   })

//   done()
// }

// export default initializeDatabaseSchema