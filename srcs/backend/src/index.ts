// Require the framework and instantiate it

import Fastify from 'fastify'
//import logger from "./config/logger.js"


const fastify = Fastify({
	logger: true
})


// Declare a route
// fastify.get('/', function (request, reply) {
// 	reply.send({ hello: 'world' }) // automatically turns into a json
// })

// Declare a route
fastify.get('/', function (request, reply) {
	reply.send("hello gerjkngerger world") //automatically generates text
})

// Run the server!
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	fastify.log.info(`server listening on ${address}`)
})


// app.register(function plugin(app, opts, next) {
// 	next()
// })