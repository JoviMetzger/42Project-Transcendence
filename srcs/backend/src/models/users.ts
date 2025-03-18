// models/users.ts

import { InferSelectModel } from 'drizzle-orm';
import { usersTable, userStatus } from '../db/schema.ts';
import crypto from 'crypto';

/* types */

// Base user type with common fields
type BaseUser = {
	username: string;
	alias: string;
	profile_pic?: Buffer;
	language?: string;
	status?: userStatus;
};

// User interface for reading operations
export type User = InferSelectModel<typeof usersTable>;

// Type for creating a User (without profile pic)
export type CreateUser = BaseUser & {
	uuid: string;
	password: string;
	salt: string;
};

// Type for user creation request (JSON)
export type CreateUserRequest = Omit<BaseUser, 'profile_pic'> & {
	password: string;
};

// Type for public user data (omit sensitive fields)
export type PublicUser = Omit<User, 'password' | 'salt' | 'language'>;

// Type to update the user
export type UpdateUser = Partial<Omit<User, 'id' | 'uuid'>>;

export function toPublicUser(user: User): PublicUser {
	return {
		id: user.id,
		uuid: user.uuid,
		username: user.username,
		alias: user.alias,
		profile_pic: user.profile_pic,
		status: user.status,
		win: user.win,
		loss: user.loss
	};
}

/* validation */

// Validation constraints
const USER_VALIDATION = {
	MIN_USERNAME_LENGTH: 3,
	MIN_ALIAS_LENGTH: 3,
	MIN_PASSWORD_LENGTH: 6
};

const PROFILE_PIC_VALIDATION = {
	MAX_SIZE: 5 * 1024 * 1024 // 5MB in bytes
};

// function to validate user data
export function validateUser(user: Partial<CreateUser>): void {
	const errors: string[] = [];

	if (user.username && user.username.length < USER_VALIDATION.MIN_USERNAME_LENGTH) {
		errors.push(`Username must be at least ${USER_VALIDATION.MIN_USERNAME_LENGTH} characters`);
	}

	if (user.alias && user.alias.length < USER_VALIDATION.MIN_ALIAS_LENGTH) {
		errors.push(`Alias must be at least ${USER_VALIDATION.MIN_ALIAS_LENGTH} characters`);
	}

	if (user.password && user.password.length < USER_VALIDATION.MIN_PASSWORD_LENGTH) {
		errors.push(`Password must be at least ${USER_VALIDATION.MIN_PASSWORD_LENGTH} characters`);
	}

	if (errors.length > 0) {
		throw new Error(`Validation failed: ${errors.join(', ')}`);
	}
}

//validate profile pic
export function validateProfilePic(profilePic: Buffer): void {
	if (profilePic.length > PROFILE_PIC_VALIDATION.MAX_SIZE) {
		throw new Error(`Profile picture must be less than ${PROFILE_PIC_VALIDATION.MAX_SIZE / (1024 * 1024)}MB`);
	}
}

/* password hashing */

// function that returns the hashed password + the salt key for in the db
export function hashPassword(password: string): { hashedPassword: string, salt: string } {
	const salt = crypto.randomBytes(16).toString('hex');
	const hashedPassword = crypto.pbkdf2Sync(
		password,
		salt,
		1000,
		64,
		'sha512'
	).toString('hex');

	return { hashedPassword, salt };
}

// Checks if incoming password matches the stored hash
export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
	const hash = crypto.pbkdf2Sync(
		password,
		salt,
		1000,
		64,
		'sha512'
	).toString('hex');
	return hash === storedHash;
}