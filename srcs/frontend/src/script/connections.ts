async function httpGet(url: string)
{
	return fetch(url)
	.then((response) => {
		if (!response.ok)
			return "GRRR Gimme Valid URL"
		const contentType = response.headers.get("Content-Type");
		if (contentType && contentType.includes("application/json"))
		  	return response.json();
		else
			return response.text();
		
	})
	.catch((error) => {
		console.log(error)
		return "GRRR Something Weird Happened"
	})
}

export async function connectFunc(url: string){
	console.log("Connect From " + url);
	const response = await httpGet(url);
	// console.log(response);
	return response
}
