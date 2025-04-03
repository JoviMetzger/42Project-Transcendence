import { connectFunc, inputToContent, requestBody } from "./connections"

export function searchBar() {
	console.log("Searching...")

	const response = connectFunc("/public/users", requestBody("GET", null))
	response.then((response) => {
		if (response.ok) {
			// list the users, filtered by input
		}
		else {
			// error, couldn't load users from database, check your connection or wait 5 minutes
		}
	})

}