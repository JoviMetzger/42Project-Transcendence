import { InferModel } from 'drizzle-orm';
import { usersTable } from '../db/schema';


// user interface based on the /db/schema.ts sqlite tables
export type User = InferModel<typeof usersTable>;

// type for creating a User (omits the fields with defaults)
export type CreateUser = Omit<User, 'id' | 'friends' | 'win' | 'loss'> & {
	friends?: string[];
	win?: number;
	loss?: number;
};

// Type for public user data (omit password)
export type PublicUser = Omit<User, 'password'> & {
	winRate?: string;  // For stats/leaderboard
	totalGames?: number;
};

// type to update the user, only fields that should never be adjusted omitted (id/uuid)
export type UpdateUser = Partial<Omit<User, 'id' | 'uuid'>>;