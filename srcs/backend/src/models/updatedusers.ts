import { InferModel } from 'drizzle-orm';
import { usersTable, userStatus } from '../db/schema';


// user interface based on the /db/schema.ts sqlite tables
export type User = InferModel<typeof usersTable>;

// type for creating a User 
export type createUser = Omit<User, 'id' | 'win' | 'loss'> & {
	uuid: string;
	username: string;
	password: string;
	alias: string;
	profile_pic?: Buffer;
	language?: string;
	status?: userStatus;
};

// Type for public user data (omit password)
export type publicUser = Omit<User, 'password'> & {};

// type to update the user, ommits fields that shouldnt be changed (id/uuid)
export type updateUser = Partial<Omit<User, 'id' | 'uuid'>>;