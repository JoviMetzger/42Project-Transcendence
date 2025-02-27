
export const VALID_ROLES = ['admin', 'user', 'guest'] as const;
export type Role = typeof VALID_ROLES[number];

export interface User {
	id: number;
	name: string;
	role: Role;
}

// will be replaced with database interactoins
export const Users = [
	{ id: 1, name: 'jovi', role: 'admin' },
	{ id: 2, name: 'Acco', role: 'admin' },
	{ id: 3, name: 'Julius', role: 'admin' },
	{ id: 4, name: 'player', role: 'user' },
	{ id: 5, name: 'failure', role: 'guest' },
	{ id: 6, name: 'person', role: 'guest' }
]


export default Users;


/*
alternative export options 

export default jsut one. Or the file calling tihs one can directly call the export const instanecs

*/