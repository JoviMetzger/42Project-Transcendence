import envConfig from '../config/env';

export function requestBody(method:string, content:string | null)
{
	if (method.toUpperCase() === 'GET')
		return null;
	if (method.toUpperCase() === 'POST')
	{
		const mode = "cors";
		const headers = {
			Authorization : `Bearer ${envConfig.postApi}`,
			Accept : 'application/json',
			"Content-Type" : 'application/json'
		};
		// const body = {
		// 	username: 'testuser',
		// 	alias: 'testalias',
		// 	password: 'supersecret'
		// };
		// const body = JSON.parse(`{${content}}`);
		const body = content ? JSON.parse(`{${content}}`) : {};
		return {method, mode, headers, body};
	}
	if (method.toUpperCase() === 'DELETE')
		return null;
	return `ERROR (requestBody): Method '${method}' Not Recognized`;
}

async function httpGet(url:string, request:any | null)
{
	return fetch(url, request)
	.then((response) => {
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

export async function connectFunc(url: string, request:any| null){
	console.log("Connect To " + url + " Using:")
	console.log(request)
	const response = await httpGet(url, request);
	// console.log(response);
	return response
}
