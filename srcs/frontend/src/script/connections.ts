export async function connectFunc(){
				console.log("Connect From");
				let response: string = "";

				function httpGet(theUrl: string)
				{
				  var xmlHttp = null;
			  
				  xmlHttp = new XMLHttpRequest();
				  xmlHttp.open( "GET", theUrl, false );
				  xmlHttp.send( null );
				  return xmlHttp.responseText;
				}
				response = httpGet("http://localhost:3000/matches");

				console.log(response);
}
