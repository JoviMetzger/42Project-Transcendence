# 🧩 Transcendence 🏓🐍

Transcendence is a full-stack web application where users can <br>
create an account and play **3D Pong** or **2D Snake** games. <br>
This project was developed in collaboration with 📌[Julius]() and 📌[Acco]() .<br> 

## 🌱Table of Contents
- [About](#About)
- [Docker](#Docker)
- [Swagger - Backend](#Swagger-Backend)
- [Drizzle - Backend](#Drizzle-Backend)
- [HTTPS Certificate](#HTTPS-Certificate)
- [dompurify - HTML](#dompurify-HTML)
- [data-i18n - Language](#data-i18n-Language)
- [Backend Call - Connecting Frontend & Backend](#Backend-Call)
- [Installation](#Installation)


## 🌱About
Transcendence covers most things in full-stack webapplication. <br>
**The application is simple.**  <br>
User creates and acount, unless already created then just needs to loggin. <br>
The user can see there *stats* and a *leaderboard* displaying the top 3 players for each game. <br>
The user can choose for both games if he/she wants to play a tournemnet or with a freind. <br>
The user can aswell find their and from other users the history matchtes. <br>
user has a settings side, where Avatar, username, alias name, password can be changed. <br>
The user can view their given data, has the option to delete their account. <br>

The subject wants you to choose **7 Major modlues** *(two Minor modlues equal one Major module)*
<details>
  <summary><strong>We choose:</strong></summary>
  <br>

## We choose:

- **Major** : Use a framework to build the backend 	<br>
&emsp;&emsp;&emsp;&ensp; - Required framework **->** **Typscript** <br>
					
- **Major** : Implementing Advanced 3D Techniques <br>
&emsp;&emsp;&emsp;&ensp;- Reqiured tool is **babylon**	<br>
&emsp;&emsp;&emsp;&ensp;- We implemented a fully 3D version of the classic Pong game <br>

- **Major** : Standard user management, authentication, users across tournaments. <br>
&emsp;&emsp;&emsp;&ensp;- Registration with username, alias, password, and avatar. <br>
&emsp;&emsp;&emsp;&ensp;- Secure login. <br>
&emsp;&emsp;&emsp;&ensp;- Multiplayer support across tournaments. <br>
&emsp;&emsp;&emsp;&ensp;- Match history available to all users. <br>

- **Major** : Add another game with user history and matchmaking <br>
&emsp;&emsp;&emsp;&ensp;- Added Snake *(Snek)*, has a match history with scores, wins, and losses. <br>

- **Minor** : Use a framework or toolkit to build the front-end <br>	
&emsp;&emsp;&emsp;&ensp;- Tools: **HTML + Tailwind CSS**	<br>

- **Minor** : Use a database for the backend <br>
&emsp;&emsp;&emsp;&ensp;- We used **SQLite** <br>
&emsp;&emsp;&emsp;&ensp;- If you have a backend, it makes sence to use a database, <br> 
&emsp;&emsp;&emsp;&ensp;&ensp;because you can store user data, match history, scores, and more. <br>

- **Minor** : Expanding browser compatibility <br>
&emsp;&emsp;&emsp;&ensp;- Compatible with Chrome, Firefox, and other major browsers. <br>
&emsp;&emsp;&emsp;&ensp;- *Easy module, becuase that happends automtally*	<br>

- **Minor** : Supports multiple languages <br>
&emsp;&emsp;&emsp;&ensp;- User can switch for different languages <br>
&emsp;&emsp;&emsp;&ensp;- Could probably use a toolkit, but we used the **data-i18n** attribute for simple <br>
&emsp;&emsp;&emsp;&ensp;&ensp;multilingual support. <br>

- **Minor** : User and game stats dashboards <br>
&emsp;&emsp;&emsp;&ensp;- ***Dashboards shows:*** <br>
&emsp;&emsp;&emsp;&ensp;&emsp;&emsp;- Highest scores <br>
&emsp;&emsp;&emsp;&ensp;&emsp;&emsp;- Wins and losses <br>
&emsp;&emsp;&emsp;&ensp;&emsp;&emsp;- Leaderboards for top 3 players <br>

- **Minor** : GDPR compliance options with user anonymization, <br> local data management, and account deletion.	<br>
&emsp;&emsp;&emsp;&ensp;- User can delete account/ their data. <br>
&emsp;&emsp;&emsp;&ensp;- User can edit their data *(username, alias, password, avatar)* <br>	
&emsp;&emsp;&emsp;&ensp;- User can view their data. <br>
&emsp;&emsp;&emsp;&ensp;- **GDRP** *(General Data Protection Regulation)* : <br> 
&emsp;&emsp;&emsp;&ensp;&ensp;We have a privicy policy, so the user knows what will happend with their data <br>
&emsp;&emsp;&emsp;&ensp;&ensp; *(Ensures transparency and control over personal information)*

<br> <br>
</details>

<br><br>


## 🌱Docker

### ♣️Docker Compose Files
We used two different docker compose files.
- `docker-compose-dev.yml` **->** used during **development**.
- `docker-compose.yml` **->** Used for **production**.

***Why two files?*** <br>
The docker-compose-dev.yml file was created to streamline the development process. <br>
It allows live updates without needing to rebuild the entire Docker image after every change. <br>

*For example:*
- When editing HTML or frontend code, changes are reflected immediately.
- This drastically reduces development time by skipping unnecessary recompilation steps.

The docker-compose.yml file is optimized for production and includes the final setup with all necessary build steps and configurations.

***How to get a development and productio environment?*** <br>
In the docker-compose look for the backend environment:
- Development Option:
```
environment:
      - NODE_ENV=development
```
- Production Option:
```
environment:
    - NODE_ENV=production
```

In the docker-compose look for **command** for both backend & frontend:

- Development Option:
```
command: [ "pnpm", "run", "dev" ]
```
- Production Option:
```
command: [ "pnpm", "run", "prod" ]
```

### ♣️Containers
- **Frontend Container** <br>
  Serves the user interface built with HTML, Tailwind CSS, and TypeScript.
- **Backend Container** <br>
   Runs the TypeScript-based backend server that handles authentication, <br>
   matchmaking, and game logic.

### ♣️Volumes
We use two Docker volumes:
- **Database Volume**
  - Persists the SQLite database file.
  - Ensures that data is not lost between container restarts.
- **Cookie Volume**
  - Stores session and authentication cookies.
  - Keeps user login data across sessions.
<br>


## 🌱Swagger (Backend)
We used **Swagger UI** *(localhost:3000/docs)* <br>
It’s useful for both backend and frontend teams <br>

### What is Swagger?
Swagger UI is an open-source tool that reads an API’s OpenAPI **(Swagger)** specification and turns it into a clean, interactive web page. <br> 

***It displays:*** <br>
&emsp;&emsp;&emsp;&ensp; • All available endpoints <br>
&emsp;&emsp;&emsp;&ensp; • The parameters they require <br>
&emsp;&emsp;&emsp;&ensp; • The possible responses

### Why it's useful
- **Frontend** can see which routes to call, what parameters to send, and what responses to expect. <br>
- **Backend** can test endpoints directly in the browser without writing extra code. <br>

❗[Swagger Documentaion](https://swagger.io/docs/)❗

<br>






<!---


^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

## 🌱Drizzle (Backend)
Drizzle will help you vizualy seeing whats happening inside your database.

### What is Drizzle?
### How to use Drizzle
 





## 🌱HTTPS Certificate
## 🌱dompurify (HTML)
## 🌱data-i18n (Language)
## 🌱Backend Call
-  Connection between frontend and backend
- frontend
The supject requireds you to use a single web application, wich means only one html page is being used. 
We always reloaded the body of the html with the new content we needed.

Things that might be usefull:
call to the backend
took us a while to understand how we call the backend, but is pretty simple.
the string that you get from your html input needs to stringefid. 
export function inputToContent(input: string[]): string {
	const obj: Record<string, string> = {};

	input.forEach(id => {
		const elem = document.getElementById(id) as HTMLInputElement | null;
		if (elem)
		{
			const rawInput = elem.value;
			const sanitizedInput = DOMPurify.sanitize(rawInput); // Removes unsafe HTML
			obj[elem.id] = sanitizedInput;
		}
	});

	const jsonStr = JSON.stringify(obj);
	return jsonStr;
}

const content = inputToContent(["username", "password"]);
			const body = requestBody("POST", content, "application/json");

			try {
				const response = await connectFunc("/user/login", body);
      export async function connectFunc(url: string, request: RequestInit): Promise<Response> {
	
	// console.log("Connect To " + url + " Using:")
	// console.log(request)

	const response = await httpGet("https://localhost:3000" + url, request);
	if (response.status === 402) {
		window.history.pushState({}, '', '/logIn');
		setupLogIn(); // Redirect to logIn
	}
	return response
}








^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
-->

## 🌱Installation
**1. Step:**  Create a *.env*
<details>
  <summary><strong>📝 My .env</strong></summary>
  <br>

## 📝 .env

```
# random
ADMIN=admin
PASSWORD=iamAdmin42

# frontend
FRONTEND_PORT=5173

# backend variables
BACKEND_PORT=3000
LOG_LEVEL=info

# API protection
PUBLIC_KEY=asdfghjk
PRIVATE_KEY=qwertyuio
```

<br> <br>
</details>
<br>

**2. Step:** Start the Docker
```
make prod
```
<br>

**3. Step:**  Go to your web browser
```
https://localhost:5173
```
❗ If You using **FireFox**, Please [add the certificates]() to browser first. <br> <br>


**4. Extra Info:** <br>
`make prod` **-> Start the Docker Production mode** <br>
`make dev` **-> Start the Docker Development mode** <br>
`make push` **-> Updates the database & applies any pending changes to the actual database structure** <br>
`make clean` **-> Remove all containers and volumes** <br>
`make deepclean` **-> Reset - Removes containers, volumes, network, certificates, directories**
<br>
<br>
<br>
