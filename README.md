# 🧩 Transcendence 🏓🐍

Transcendence is a full-stack web application where users can <br>
create an account and play **3D Pong** or **2D Snake** games. <br>
This project was developed in collaboration with 📌[Julius](https://github.com/Codam-jde-baai) and 📌[Acco](https://github.com/Solypsist) .<br> 

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

## ♣️We choose:

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


## 🌱Drizzle (Backend)

### What is Drizzle?
Drizzle is a type-safe Object-Relational Mapping **(ORM)** tool for TypeScript and JavaScript. <br>

**In other words:** <br>
You can write database queries in TypeScript with full type safety—your database schema and queries are strongly typed, so mistakes are caught during development instead of breaking your app at runtime.
<br>

### What Drizzle Lets You Do
1) ***Viewing the database*** <br>
- Use Drizzle Studio *(the included web UI)* to explore tables, columns, and data.
- Run queries, view schemas, and inspect results directly in the browser.

2) ***Change Column Types Safely***
- Define your schema in TypeScript.
- If a column’s type changes *(age from a number to text)*, update your schema file.
- Run a migration *(generated by Drizzle)* to update the database.
- The database will try to convert existing values automatically *(25 → "25")*.
- If conversion isn’t possible *("hello" → number)*, the migration will fail unless you add explicit casting.


### How to Use Drizzle Studio
1. Install drizzle-kit
2. Open Studio <br>
Run `npx drizzle-kit studio` <br> This will give you your web UI → *you copy-paste the web UI into your browser*
3. Use the web UI to view and inspect your database
<br>
 

❗[Drizzle Documentaion](https://orm.drizzle.team/docs/get-started)❗

<br>






<!---

## 🌱HTTPS Certificate





^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^




-->





## 🌱dompurify (HTML)

### What is dompurify?
DOMPurify is a fast, client-side library for sanitizing HTML.
- It removes malicious or dangerous code *(like scripts, event handlers, or inline JavaScript)* from user-provided HTML.
- It ensures the HTML is safe to insert into the DOM, preventing vulnerabilities like Cross-Site Scripting *(XSS)*.
- It works in browsers and even on server environments *(like Node.js)*.

### Why use dompurify?
When working with user input or dynamic HTML updates, we often need to insert content into the DOM. <br>
A common way to do this is via `element.innerHTML`. <br>

⚠️ However, innerHTML is not safe because:
- Attackers can inject `<script>` tags that execute malicious JavaScript.
- Inline event attributes *(onclick, onmouseover, etc.)* can execute harmful code.
- CSS tricks or malicious `<iframe>` tags can steal user data.

#### 🦠Example <br>
**Input:** `<img src=x onerror=alert('Hacked!')>` <br>
**Output:** `<img src="x">` <br> <br>
The dangerous onerror attribute is removed, leaving only safe HTML. <br>
If you directly set this into the DOM with innerHTML, it will execute `alert('Hacked!')`.

DOMPurify solves this by stripping out unsafe attributes, tags, and scripts while keeping the safe HTML intact.

***Code Example***
```html
// User input fields (hardcoded for example)
const inputIds = ["username", "email", "password"];
const formData: Record<string, string> = {};

inputIds.forEach(id => {
  const elem = document.getElementById(id) as HTMLInputElement | null;
  if (elem) 
  {
    const rawInput = elem.value;
    const sanitizedInput = DOMPurify.sanitize(rawInput); // Removes unsafe HTML
    formData[elem.id] = sanitizedInput;
  }
});

// for Testing
console.log(formData);
```

### Alternatives
We used a single-page application *(SPA)*. <br>
The way we handle navigation is by replacing the entire `<body>` content dynamically. <br>The simplest way to do this is with **innerHTML**, which lets us insert new HTML directly.

We looked at alternatives, but they didn’t quite work for us:
- `element.innerHTML = ...` → unsafe unless sanitized with DOMPurify.
- `element.textContent = ...` → safe for plain text (but strips HTML).
- `element.insertAdjacentHTML()` → same risks as innerHTML.
- `document.createElement() + appendChild()` → safe if you construct DOM nodes directly, but less convenient.

❗Use DOMPurify when working with HTML strings and prefer *textContent* for plain text.

<br>


## 🌱data-i18n (Language)

We decided we gonna use data-i18n. <br>
data-i18n is just one common convention for handling translations, ***but*** *it’s not the only option*. <br> Depending on your needs, you can either roll your own approach or use well-established i18n libraries/toolkits that handle translations, pluralization, formatting, and even right-to-left languages. <br> 

### ♣️What is data-i18n?
data-i18n is not a built-in HTML attribute, but a custom data attribute.
It’s part of the HTML5 **data-*** **attribute system**, which allows you to store extra information *(custom data)* on HTML elements.

In the case of data-i18n, developers use it to mark elements that should be translated.

### ♣️Why use data-i18n?
Instead of hardcoding text into your HTML like this:
```html
<h1>Welcome!</h1>
<p>This is the intro.</p>
```
You write:
```html
<h1 data-i18n="welcome_message"></h1>
<p data-i18n="intro_text"></p>
```
This makes your page language-agnostic. The actual words will be filled in by JavaScript/TypeScript at runtime, depending on the selected language.

### ♣️Alternatives to data-i18n

#### 🌍 1. Inline text replacement markers <br>
You can insert placeholders directly in your HTML. <br>
A templating engine then replaces those placeholders with the correct translations at runtime.

<br> 

```html
<h1>{{welcome_message}}</h1>
```


`{{welcome_message}}` is a placeholder *(a translation key).*

A templating engine *(like Handlebars, Mustache, Vue, or React)* looks up the key in your translation files. <br>
The engine automatically swaps the placeholder with the correct text for the active language. <br> <br>

#### 🌍 2. Popular Toolkits for Internationalization

General JavaScript / Web | Short explanation
--- | ---
i18next | Full-featured i18n library, works in plain JS and all major frameworks. 
FormatJS / React Intl |  Powerful message formatting, best for React apps. 
Polyglot.js |  Lightweight library, good for small projects. 

---

Framework-Specific | Short explanation
--- | ---
React Intl / Next.js i18n | Built for React/Next.js, integrates with components and routing.
Vue I18n | Official Vue plugin for translations.
Angular i18n | Built-in Angular support for template translations.

---

Server-Side *(Backend)* | Short explanation
--- | ---
Django i18n *(Python)* | Built-in translation system using .po files.
Rails i18n *(Ruby)* | Built-in YAML-based translations.
Spring i18n *(Java)* | Uses messages.properties for localization.

---

<br>

### ♣️How it works
The attribute itself does nothing by default—it’s just metadata. <br>
What makes it work is JavaScript *(or a translation library)* that reads the data-i18n attributes, looks up the corresponding translations, and replaces the element’s text.

Here is a small overview how it will work in JavaScript.

#### 🌍 1. Create a json file:
You can store translations either as separate files per language or a single combined file.

**Option1:** Separate JSON files *(recommended for larger projects)*
`en.json`
```json
{
    "welcome_message": "Welcome!",
    "intro_text": "This is the intro."
}
```

`de.json`
```json
{
    "welcome_message": "Welkommen!",
    "intro_text": "Dies ist das Intro"
}
```

**Option2:** Single JSON file *(for small projects)*

`language.json`
```json
{
  "en": {
    "welcome_message": "Welcome!",
    "intro_text": "This is the intro."
  },
  "de": {
    "welcome_message": "Welkommen!",
    "intro_text": "Dies ist das Intro"
  }
}
```

The option depends on how much needs to be translated and ofcourse personal preference. <br>
I preferd having every language sepreate. <br> <br>


#### 🌍 2. Implement the data-i18n into your HTML
**Before** *(hardcoded text):*
```html
<h1 class="header">Welcome!</h1>
```
**After** *(translation key only):*
```html
<h1 class="header" data-i18n="welcome_message"></h1>
```
**Don't forget to call at the function for the translation** <br> <br>

#### 🌍 3. The function 
**Example:**
- Reads the user’s selected language from localStorage
- Loads the correct JSON file
- Updates all **[data-i18n]** elements with translated text
```typescript
// Import language files
import en from '../languages/en.json';
import de from '../languages/de.json';
import nl from '../languages/nl.json';

export function getLanguage()
{
	let langData: LangData;
	let lang = localStorage.getItem('selectedLang') || 'en';

	// Determine which language data to use
	switch (lang) {
		case 'de':
			langData = de;
			break;
		case 'nl':
			langData = nl;
			break;
		default: // Default to English
            langData = en;
			lang = "en";
			break;
	}

	// Function for setting the language to the correct language
	updateContent(langData);
}

// Function to update content based on selected language
function updateContent(langData: LangData): void {
	document.querySelectorAll('[data-i18n]').forEach((element) => {
		const key = element.getAttribute('data-i18n');
		if (key || langData[key]) 
    		element.textContent = langData[key];
	});

    // Update here other elements if needed (like placeholders)
    // Example: 4. Handle Placeholders
}
```
For more details 
**or** how a switch language buttons functionality works <br>
**please look at:**
`srcs/frontend/src/script/language.ts` <br> <br>

#### 🌍 4. Handle Placeholders 
You can also translate placeholders by using a separate attribute like `data-i18n-placeholder` <br>
**Example:**
```html
<p class="login">Username</p>
<input class="input-field" placeholder="Enter your username or email here">
```
<br>

**Which turns into:**
```htm
<p class="login" data-i18n="LoginHeader"></p>
<input class="input-field" data-i18n-placeholder="Login_placeholder">
```
Now you just need to extend the function `updateContent`.<br>
Same logic as with the **data-i18n**, but it will be replaced with **data-i18n-placeholder** <br> <br>

#### 🌍 5. Inline Translation
Sometimes you don’t want the entire sentence translated as one block. <br> <br>
***Common cases:***
- A paragraph where only one word is styled differently *(colored, bold, etc.).*
- A sentence where one word is a link *(“Click here to login”).*
If you just put data-i18n on the whole `<p>`, you’ll lose the formatting or the link.

Wrap them in `<span>` for safer placement. <br>
**Example** <br>

![Picture](https://github.com/user-attachments/assets/411e3702-928f-4158-a9af-a55b7a2efb7b)

- The word **"Sart here"** should be a hyperlink with different styling.
- We split it into two translation keys: ***LoginParagraph*** *and* ***btn_LogIn.***
```html
<p>
    <span data-i18n="LoginParagraph"></span>
    <a class="login" data-i18n="btn_LogIn"></a>
</p>
```
<br>
<br>


<!--


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
