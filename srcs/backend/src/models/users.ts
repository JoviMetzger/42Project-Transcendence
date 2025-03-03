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

export default Users

/*
alternative export options 

export default jsut one. Or the file calling tihs one can directly call the export const instanecs

*/