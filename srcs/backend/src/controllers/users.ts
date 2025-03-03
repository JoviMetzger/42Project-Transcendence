// controllers - users.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { Users, User, VALID_ROLES, Role } from '../models/users.ts';

export const getAllUsers = (request: FastifyRequest, reply: FastifyReply) => {
	reply.send(Users);
};

export const getUserById = (request: FastifyRequest, reply: FastifyReply) => {
	const { id } = request.params as { id: string };
	const user = Users.find((user) => user.id === Number(id));

	if (!user) {
		reply.code(404).send({ error: 'User not found' });
		return;
	}

	reply.send(user);
};

export const getUsersByRole = (request: FastifyRequest, reply: FastifyReply) => {
	const { role } = request.params as { role: string };

	if (!VALID_ROLES.includes(role as Role)) {
		reply.code(400).send({ error: 'Invalid role' });
		return;
	}

	const filteredUsers = Users.filter(user => user.role === (role as Role));
	reply.send(filteredUsers);
};

export const getUserByAlias = (request: FastifyRequest, reply: FastifyReply) => {
	const { alias } = request.params as { alias: string };
	const user = Users.find((user) => user.alias.toLowerCase() === alias.toLowerCase());

	if (!user) {
		reply.code(404).send({ error: 'User not found' });
		return;
	}

	reply.send(user);
};

export const getUserStats = (request: FastifyRequest, reply: FastifyReply) => {
	const { id } = request.params as { id: string };
	const user = Users.find((user) => user.id === Number(id));

	if (!user) {
		reply.code(404).send({ error: 'User not found' });
		return;
	}

	const winRate = user.wins + user.losses > 0 ? (user.wins / (user.wins + user.losses) * 100).toFixed(1) : '0.0';

	reply.send({
		...user,
		totalGames: user.wins + user.losses,
		winRate: `${winRate}%`
	});
};

export const getLeaderboard = (request: FastifyRequest, reply: FastifyReply) => {
	// Create leaderboard based on win ratio
	const leaderboard = Users.map(user => {
		const totalGames = user.wins + user.losses;
		const winRate = totalGames > 0 ? (user.wins / totalGames) : 0;

		return {
			...user,
			totalGames,
			winRate
		};
	})
		.sort((a, b) => {
			// Sort by win rate first
			if (b.winRate !== a.winRate) {
				return b.winRate - a.winRate;
			}
			// If win rates are equal, sort by total games
			return b.totalGames - a.totalGames;
		})
		.map((entry, index) => ({
			...entry,
			rank: index + 1,
			winRate: `${(entry.winRate * 100).toFixed(1)}%`
		}));

	reply.send(leaderboard);
};
