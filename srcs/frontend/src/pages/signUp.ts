import { setupUserHome } from './home';
import { getLanguage } from '../script/language';
import { connectFunc, requestBody } from '../script/connections';

export function setupSignUp() {
	const root = document.getElementById('app');
	if (root) {
		root.innerHTML = "";
		root.insertAdjacentHTML("beforeend", `
		<link rel="stylesheet" href="src/styles/signUp.css"> <!-- Link to the CSS file -->
		<div class="overlay"></div>
		<div class="btn-container">
			<button class="language-btn">
				<span data-i18n="Language"></span> <img id="selected-flag" src="src/component/Pictures/flagIcon-en.png">
			</button>
			<div class="language-content">
				<div class="language-option" id="gb">
					<img src="src/component/Pictures/flagIcon-en.png"> <span data-i18n="English"></span>
				</div>
				<div class="language-option" id="de">
					<img src="src/component/Pictures/flagIcon-de.png"> <span data-i18n="German"></span>
				</div>
				<div class="language-option" id="nl">
					<img src="src/component/Pictures/flagIcon-nl.png"> <span data-i18n="Dutch"></span>
				</div>
			</div>
		</div>
		<div class="container">
			<h1 class="header" data-i18n="SignUp_Header"></h1>
				
			<p class="p1" data-i18n="SignUp_Avatar"></p>
			<button class="edit-picture">
				<img id="avatar" src="src/component/Pictures/defaultPP.avif">
			</button>

			<p class="p1" data-i18n="LogIn_Name"></p>
			<input type="Login_Name" id="username" class="input-field" data-i18n-placeholder="SignUp_placeholder1">

			<p class="p1" data-i18n="SignUp_Alias"></p>
			<input type="Alias_Name" id="alias" class="input-field" data-i18n-placeholder="SignUp_placeholder2">

			<p class="p1" data-i18n="Password"></p>
			<input type="Password" id="password" class="input-field">

			<p class="p1" data-i18n="ConfirmPassword"></p>
			<input type="Password" id="password_confirm" class="input-field">
				
			<div class="buttons">
				<button class="btn" id="Home" data-i18n="btn_SignUp"></button>
			</div> 
		</div>
		`);

		getLanguage();
		document.getElementById('Home')?.addEventListener('click', () => {
			// const content:string = '"username": "test123", "alias": "test123", "password": "test123", "profilePic": "null"' // the fields:content you want to pass to the backend
			
				// const avatar= document.getElementById("avatar").src
				const username= document.getElementById("username") as HTMLInputElement
				const alias= document.getElementById("alias") as HTMLInputElement
				const password= document.getElementById("password") as HTMLInputElement
				const password_confirm= document.getElementById("password_confirm") as HTMLInputElement
				// function for comparing passwords
				const content:string = `"username": "${username.value}", "alias": "${alias.value}", "password": "${password.value}"`
			const body = requestBody("POST", content) // Used for requests where the frontend has to send info to the backend (like making a new user). Will return null in case of GET
			const response = connectFunc("http://localhost:3000/users/new", body); // saves the response.json. this can be changed to response.text in connections.ts (automatically does so if a response.json cannot be generated)
			response.then((response) => {
				console.log(response); // this is where you insert the code that actually uses the information
		})

			// window.history.pushState({}, '', '/home');
			// setupUserHome();
		});
	// 	document.getElementById('Connect')?.addEventListener('click', () => {
	// 		// window.history.pushState({}, '', '/Connect');
	// 		// renderPage();
	// 		const url:string = "http://localhost:3000/users/new" // The backend route you want to reuest from
	// 		const method:string = "poSt" // GET or post or dElEtE. works with any case usage
	// 		const content:string = '"username": "string112", "alias": "string112", "password": "string112"' // the fields:content you want to pass to the backend
	// 		const body = requestBody(method, content) // Used for requests where the frontend has to send info to the backend (like making a new user). Will return null in case of GET
	// 		const response = connectFunc(url, body); // saves the response.json. this can be changed to response.text in connections.ts (automatically does so if a response.json cannot be generated)
	// 		response.then((response) => {
	// 			console.log(response); // this is where you insert the code that actually uses the information
	// 		})
	// 	});

	}
}

