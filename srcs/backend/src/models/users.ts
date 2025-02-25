
// will be replaced with database interactoins
export const users = [
	{ id: 1, name: 'jovi' },
	{ id: 2, name: 'Acco' },
	{ id: 3, name: 'Julius' }
]

export const admins = [
	{ id: 1, name: 'adjovi' },
	{ id: 2, name: 'adAcco' },
	{ id: 3, name: 'adJulius' }
]


const allUsers = {
	users,
	admins
};

export default allUsers;


/*
alternative export options 

export default jsut one. Or the file calling tihs one can directly call the export const instanecs

*/