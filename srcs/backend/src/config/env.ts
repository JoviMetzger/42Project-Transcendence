import path from "node:path";
import { fileURLToPath } from "url";
import envSchema from "env-schema";

// variables set to be used in .js files, can be imported
const schema = {
	type: "object",
	required: ["PORT", "LOG_LEVEL"],
	properties: {
		PORT: {
			type: "number",
			default: 3000,
		},
		LOG_LEVEL: {
			type: "string",
			default: "info",
		}, // can add DB file
		NODE_ENV: {
			type: "string",
			default: "development",
			enum: ["development", "testing", "production", "staging"],
		},
	},
};

// points to the .env file set from the host system by docker-compose
const config = envSchema({
	schema: schema,
	dotenv: {
		path: path.join(path.dirname(fileURLToPath(import.meta.url)), "../../.env"),
	},
});

const envConfig = {
	port: Number(config.PORT),
	logLevel: config.LOG_LEVEL,
	nodeEnv: config.NODE_ENV,
	// can add DB_file
};

export default envConfig;