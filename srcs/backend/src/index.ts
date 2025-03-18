import envConfig from './config/env.ts';
import Fastify from 'fastify';
import userRoutes from './routes/users.ts';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import multipart from '@fastify/multipart';

console.log("reading from index.ts backend");

const fastify = Fastify({
	logger: true
})

await fastify.register(swagger, {
	openapi: {  // Change from 'swagger' to 'openapi'
		info: {
			title: 'Your API',
			description: 'API documentation',
			version: '1.0.0'
		},
		components: {  // Change from securityDefinitions to components
			securitySchemes: {
				apiKey: {
					type: 'http',
					scheme: 'bearer',
					description: 'Enter token with Bearer prefix, e.g., "Bearer your-token-here"'
				}
			}
		},
		tags: [
			{ name: 'users', description: 'User related endpoints' }
		]
	}
});

// Update multipart configuration with more specific options
fastify.register(multipart, {
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB limit
		files: 1 // Allow only 1 file upload at a time
	},
	attachFieldsToBody: true, // Automatically attach fields to request body
	onFile: async (event) => {
		// Optional: Add file type validation here if needed
		const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
		if (!mimeTypes.includes(event.mimetype)) {
			throw new Error('Invalid file type');
		}
	}
});


await fastify.register(swaggerUi, {
	routePrefix: '/docs'
});

fastify.register(userRoutes);
//fastify.register(matchesRoutes);


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


//default route
fastify.get('/', function (request, reply) {
	reply.send("hello this is transendence world") //automatically generates text
})



// // Run the server!
// fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
// 	if (err) {
// 		fastify.log.error(err)
// 		process.exit(1)
// 	}
// 	fastify.log.info(`server listening on ${address}`)
// })
