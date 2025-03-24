import path from "node:path";
import { fileURLToPath } from "url";
import envSchema from "env-schema";

// variables set to be used in .js files, can be imported
const schema = {
	type: "object",
	required: ["PORT", "LOG_LEVEL", "PUBLIC_KEY", "PRIVATE_KEY", "DB_FILE"],
	properties: {
		PORT: {
			type: "number",
			default: process.env.PORT,
		},
		LOG_LEVEL: {
			type: "string",
			default: process.env.LOG_LEVEL,
		}, // can add DB file
		NODE_ENV: {
			type: "string",
			default: "development",
			enum: ["development", "testing", "production", "staging"],
		},
		PUBLIC_KEY: {
			type: "string",
			default: process.env.PUBLIC_KEY
		},
		PRIVATE_KEY: {
			type: "string",
			default: process.env.PRIVATE_KEY
		},
		DB_FILE: {
			type: "string",
			default: process.env.DB_FILE
		}
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
	public_key: config.PUBLIC_KEY,
	private_key: config.PRIVATE_KEY,
	db_file: config.DB_FILE

	// can add DB_file
};

export default envConfig;