import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getAllUsers, getUser, getUserImage } from '../controllers/user/getUsers.ts';
import { addUser, updateUserProfilePic } from '../controllers/user/setUsers.ts';
import { loginUser, updatePassword } from '../controllers/user/login.ts'
import { deleteUser } from '../controllers/user/deleteUser.ts'
import envConfig from "../config/env.ts";
import { userStatus, eLanguage } from '../db/schema.ts';
import {
	securitySchemes,
	imageOptions,
	getUserOptions,
	getUsersOptions,
	getPublicUsersOptions,
	createUserOptions,
	updateProfilePicOptions,
	loginUserOptions,
	updatePasswordProperties,
	deleteUserOptions
} from './userdocs.ts';

// Auth middleware
/**
 * @abstract allows both the private key and public key
 */
const authenticatePublicToken = async (request: FastifyRequest, reply: FastifyReply) => {
	const authHeader = request.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		reply.code(401).send({ error: 'Authentication required' });
		return;
	}

	const token = authHeader.split(' ')[1];

	if (token !== envConfig.public_key && token !== envConfig.private_key) {
		reply.code(403).send({ error: 'Invalid authentication token' });
		return;
	}
};

/**
 * @abstract allows only the private key
 */
const authenticatePrivateToken = async (request: FastifyRequest, reply: FastifyReply) => {
	const authHeader = request.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		reply.code(401).send({ error: 'Authentication required' });
		return;
	}

	const token = authHeader.split(' ')[1];

	if (token !== envConfig.private_key) {
		reply.code(403).send({ error: 'Invalid authentication token' });
		return;
	}
};

function userRoutes(fastify: FastifyInstance, options: any, done: () => void) {
	fastify.addSchema({
		$id: 'security',
		security: securitySchemes
	});

	// User routes
	// for testing:
	fastify.get<{
		Params: { uuid: string }
	}>('/user/:uuid/profile-pic', { preHandler: [authenticatePrivateToken], ...imageOptions }, getUserImage);

	fastify.get('/users', { preHandler: [authenticatePrivateToken], ...getUsersOptions }, getAllUsers);
	fastify.get<{
		Params: { uuid: string }
	}>('/user/:uuid', { preHandler: [authenticatePrivateToken], ...getUserOptions }, getUser);
	fastify.get('/public/users', { preHandler: [authenticatePublicToken], ...getPublicUsersOptions }, getAllUsers);

	// Create user with JSON data
	fastify.post<{
		Body: {
			username: string;
			password: string;
			alias: string;
			language?: eLanguage;
			status?: userStatus;
		}
	}>('/users/new', { preHandler: [authenticatePrivateToken], ...createUserOptions }, addUser);

	// Update profile picture with multipart/form-data
	fastify.post<{
		Params: { uuid: string }
	}>('/users/:uuid/profile-pic', { preHandler: [authenticatePrivateToken], ...updateProfilePicOptions }, updateUserProfilePic);

	// Log in
	fastify.post('/user/login', { preHandler: [authenticatePrivateToken], ...loginUserOptions }, loginUser);
	fastify.post('/user/updatepw', { preHandler: [authenticatePrivateToken], ...updatePasswordProperties }, updatePassword);

	// delete user
	fastify.delete<{
		Params: { uuid: string }
	}>('/user.:uuid/delete', { preHandler: [authenticatePrivateToken], ...deleteUserOptions }, deleteUser);
	done();
}

export default userRoutes;