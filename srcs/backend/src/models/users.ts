// models - users.ts
// models - users.ts
export const VALID_ROLES = ['admin', 'user', 'guest'] as const;
export type Role = typeof VALID_ROLES[number];

export interface User {
	id: number;
	uuid: string;
	username: string;
	alias: string;
	profilePic: string | null; // URL or base64 string for demo
	wins: number;
	losses: number;
	role: Role;
}

export interface Match {
	id: number;
	uuid: string;
	player1Id: number;
	player2Id: number;
	status: 'completed' | 'interrupted';
	winnerId: number | null;
	startTime: string; // ISO date string
	endTime: string | null; // ISO date string
	duration: number | null; // in seconds
}

// Dummy users data
export const Users: User[] = [
	{
		id: 1,
		uuid: 'user-uuid-1',
		username: 'jovi',
		alias: 'JoviMaster',
		profilePic: null,
		wins: 15,
		losses: 5,
		role: 'admin'
	},
	{
		id: 2,
		uuid: 'user-uuid-2',
		username: 'Acco',
		alias: 'AccoTheGreat',
		profilePic: null,
		wins: 12,
		losses: 8,
		role: 'admin'
	},
	{
		id: 3,
		uuid: 'user-uuid-3',
		username: 'Julius',
		alias: 'JuliusCaesar',
		profilePic: null,
		wins: 20,
		losses: 2,
		role: 'admin'
	},
	{
		id: 4,
		uuid: 'user-uuid-4',
		username: 'player',
		alias: 'PongKing',
		profilePic: null,
		wins: 10,
		losses: 10,
		role: 'user'
	},
	{
		id: 5,
		uuid: 'user-uuid-5',
		username: 'failure',
		alias: 'NeverGiveUp',
		profilePic: null,
		wins: 0,
		losses: 15,
		role: 'guest'
	},
	{
		id: 6,
		uuid: 'user-uuid-6',
		username: 'person',
		alias: 'RandomPlayer',
		profilePic: null,
		wins: 5,
		losses: 5,
		role: 'guest'
	}
];

// Dummy matches data
export const Matches: Match[] = [
	{
		id: 1,
		uuid: 'match-uuid-1',
		player1Id: 1,
		player2Id: 2,
		status: 'completed',
		winnerId: 1,
		startTime: '2025-03-01T10:00:00Z',
		endTime: '2025-03-01T10:15:00Z',
		duration: 900 // 15 minutes in seconds
	},
	{
		id: 2,
		uuid: 'match-uuid-2',
		player1Id: 3,
		player2Id: 4,
		status: 'completed',
		winnerId: 3,
		startTime: '2025-03-02T14:30:00Z',
		endTime: '2025-03-02T14:45:00Z',
		duration: 900
	},
	{
		id: 3,
		uuid: 'match-uuid-3',
		player1Id: 5,
		player2Id: 6,
		status: 'completed',
		winnerId: 6,
		startTime: '2025-03-02T16:00:00Z',
		endTime: '2025-03-02T16:10:00Z',
		duration: 600
	},
	{
		id: 4,
		uuid: 'match-uuid-4',
		player1Id: 1,
		player2Id: 4,
		status: 'interrupted',
		winnerId: null,
		startTime: '2025-03-03T09:00:00Z',
		endTime: null,
		duration: null
	},
	{
		id: 5,
		uuid: 'match-uuid-5',
		player1Id: 2,
		player2Id: 3,
		status: 'completed',
		winnerId: 3,
		startTime: '2025-03-03T11:00:00Z',
		endTime: '2025-03-03T11:20:00Z',
		duration: 1200
	}
];

export default { Users, Matches };

/*
alternative export options 

export default jsut one. Or the file calling tihs one can directly call the export const instanecs

*/