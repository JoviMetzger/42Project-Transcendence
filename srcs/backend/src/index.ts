import envConfig from './config/env.ts';
import Fastify from 'fastify'


console.log("reading from index.ts backend")

const fastify = Fastify({
	logger: true
})

// defining a function in TS
const start = async () => {
	try {
		const address = await fastify.listen({ port: envConfig.port, host: '0.0.0.0' });
		fastify.log.info(`server listening on ${address}`);
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
}

start()


// Declare a route
fastify.get('/', function (request, reply) {
	reply.send("hello this is transendence world") //automatically generates text
})

// Run the server!
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	fastify.log.info(`server listening on ${address}`)
})
