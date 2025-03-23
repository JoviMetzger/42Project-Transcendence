import envConfig from '../config/env';

export function requestBody(method:string, content:string | null)
{
	if (method.toUpperCase() === 'GET')
	{
		const headers = {
			// "Authorization" : `Bearer ${envConfig.userApi}`,
			"Authorization" : `Bearer asdfghjk`,
		}
		return {"method": method, "headers": headers}
	}
	if (method.toUpperCase() === 'POST')
	{
		const headers = {
			// "Authorization" : `Bearer ${envConfig.postApi}`,
			"Authorization" : `Bearer qwertyuio`,
			"Content-Type" : "application/json",
		}
		const body = '{' + content + '}'
		return {"method": method, "headers": headers, "body": body};
	}
	if (method.toUpperCase() === 'DELETE')
	{
		const headers = {
			"Authorization" : `Bearer ${envConfig.deleteApi}`,
			"Content-Type" : "application/json",
		}
		const body = '{' + content + '}'
		return {"method": method, "headers": headers, "body": body};
	}
	return `ERROR (requestBody): Method ${method} Not Recognized`
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

export async function connectFunc(url: string, request:any | null){
	console.log("Connect To " + url + " Using:")
	console.log(request)
	const response = await httpGet(url, request);
	return response
}