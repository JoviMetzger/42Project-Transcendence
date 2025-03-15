import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { usersTable, userStatus } from '../db/schema.ts';

/* types */

// User interface for reading operations
export type User = InferSelectModel<typeof usersTable>;
// Type for creating a User 
export type createUser = Omit<InferInsertModel<typeof usersTable>, 'id' | 'win' | 'loss'> & {
	uuid: string;
	username: string;
	password: string;
	salt: string; // Added salt field
	alias: string;
	profile_pic?: Buffer;
	language?: string;
	status?: userStatus;
};

// Type for public user data (omit password and salt)
export type publicUser = Omit<User, 'password' | 'salt'>;

// Type to update the user, omits fields that shouldn't be changed (id/uuid)
export type updateUser = Partial<Omit<User, 'id' | 'uuid'>>;

/* validation interfaces */

// Validation constraints
const USER_VALIDATION = {
	MIN_USERNAME_LENGTH: 3,
	MIN_ALIAS_LENGTH: 3,
	MIN_PASSWORD_LENGTH: 6,
	MAX_PROFILE_PIC_SIZE: 5 * 1024 * 1024 // 5MB in bytes
};

interface UserValidationErrors {
	username?: string;
	password?: string;
	alias?: string;
	profile_pic?: string;
}

export function validateUser(user: Partial<createUser>): UserValidationErrors {
	// Using multiple errors to show all validation errors at once
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

	if (user.profile_pic && user.profile_pic.length > USER_VALIDATION.MAX_PROFILE_PIC_SIZE) {
		errors.push(`Profile picture must be less than ${USER_VALIDATION.MAX_PROFILE_PIC_SIZE / (1024 * 1024)}MB`);
	}

	if (errors.length > 0) {
		throw new Error(`Validation failed: ${errors.join(', ')}`);
	}
}

// Helper function for password hashing
export function hashPassword(password: string): { hashedPassword: string, salt: string } {
	const crypto = require('crypto');
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

// Helper function to verify password
export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
	const crypto = require('crypto');
	const hash = crypto.pbkdf2Sync(
		password,
		salt,
		1000,
		64,
		'sha512'
	).toString('hex');

	return hash === storedHash;
}