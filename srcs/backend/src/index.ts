import envConfig from './config/env.ts';
import Fastify from 'fastify';
import userRoutes from './routes/users.ts';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import matchesRoutes from './routes/matches.ts';
import cors, { fastifyCors } from '@fastify/cors'

console.log("reading from index.ts backend");

const fastify = Fastify({
	logger: true
}) // making the fastify instance out of the imported Fastify

// Setting Up The CORS Plugin First
fastify.register(cors, {
	origin: '*',
	methods: ['GET', 'POST', 'DELETE'],
	allowedHeaders: ['Origin', 'Content-Type', 'Authorization'],
});
// 'X-Requested-With', 'Accept'

await fastify.register(swagger, {
	swagger: {
		info: {
			title: 'Your API',
			description: 'API documentation',
			version: '1.0.0'
		},
		securityDefinitions: {
			apiKey: {
				type: 'apiKey',
				name: 'Authorization',
				in: 'header',
				description: 'Enter token with Bearer prefix, e.g., "Bearer your-token-here"'
			}
		}
	}
});

await fastify.register(swaggerUi, {
	routePrefix: '/docs',
	exposeRoute: true
})

fastify.register(userRoutes);
fastify.register(matchesRoutes);

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



// Run the server!
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	fastify.log.info(`server listening on ${address}`)
})

/*--------------------------------------------------------------------------------------------------------------*/
// import envConfig from './config/env.ts';
// import Fastify from 'fastify';
// import userRoutes from './routes/users.ts';
// import swagger from '@fastify/swagger';
// import swaggerUi from '@fastify/swagger-ui';
// import matchesRoutes from './routes/matches.ts';
// import cors from '@fastify/cors';  // Import the CORS plugin

// console.log("reading from index.ts backend");

// const fastify = Fastify({
//   logger: true,
// });

// // Register CORS plugin with configuration
// fastify.register(cors, {
//   origin: '*',  // You can set this to a specific URL (e.g., 'http://localhost:5173') if you want to restrict access
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
//   preflight: true,  // Ensure preflight requests are handled
// });

// // Register Swagger and Swagger UI
// await fastify.register(swagger, {
//   swagger: {
//     info: {
//       title: 'Your API',
//       description: 'API documentation',
//       version: '1.0.0',
//     },
//     securityDefinitions: {
//       apiKey: {
//         type: 'apiKey',
//         name: 'Authorization',
//         in: 'header',
//         description: 'Enter token with Bearer prefix, e.g., "Bearer your-token-here"',
//       },
//     },
//   },
// });

// await fastify.register(swaggerUi, {
//   routePrefix: '/docs',
//   exposeRoute: true,
// });

// // Register other routes
// fastify.register(userRoutes);
// fastify.register(matchesRoutes);

// // Start the server
// const start = async () => {
//   try {
//     const address = await fastify.listen({ port: envConfig.port, host: '0.0.0.0' });
//     fastify.log.info(`server listening on ${address}`);
//   } catch (error) {
//     fastify.log.error(error);
//     process.exit(1);
//   }
// };

// start();

// // Default route
// fastify.get('/', function (request, reply) {
//   reply.send("hello this is transcendence world"); // Automatically generates text
// });