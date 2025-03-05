import { setupLogIn } from './logIn';
import { setupSignUp } from './signUp';

document.addEventListener('DOMContentLoaded', () => {
	renderPage();
});

export function renderPage() {
	const root = document.getElementById('app');
	if (root) {
		if (window.location.pathname === '/logIn') {
			setupLogIn();
		} else if (window.location.pathname === '/signUp') {
			setupSignUp();
		} else {
			root.innerHTML = `
			<link rel="stylesheet" href="src/styles/index.css"> <!-- Link to the CSS file -->
			<div class="overlay"></div>
			<div class="container">
				<h1 class="header" data-i18n="Index_Header">Welcome to Transcendence</h1>
				<p data-i18n="Index_P">Play classic Pong with your friends!</p>
				<div class="buttons">
					<button class="btn" id="LogIn" data-i18n="btn_LogIn">Log In</button>
					<button class="btn" id="SignUp" data-i18n="btn_SignUp">Sign Up</button>
				</div>
			</div>
      `;

			document.getElementById('LogIn')?.addEventListener('click', () => {
				window.history.pushState({}, '', '/logIn');
				renderPage();
			});

			document.getElementById('SignUp')?.addEventListener('click', () => {
				window.history.pushState({}, '', '/signUp');
				renderPage();
			});
		}
	}
}

window.addEventListener('popstate', renderPage);

// <div class="min-h-screen bg-gray-100 flex items-center justify-center">
//           <div class="bg-white p-8 rounded shadow-md text-center">
//             <h1 class="text-2xl font-bold text-gray-800 mb-4">Home Page</h1>
//             <button id="toCounter" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//               Go to Counter Page
//             </button>
//             <button id="toAbout" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//               Go to About Page
//             </button>
//           </div>
//         </div>



// <link rel="stylesheet" href="src/styles/index.css"> <!-- Link to the CSS file -->
// <div class="overlay"></div>
// <div class="container">
// 	<h1 class="header" data-i18n="Index_Header"></h1>
// 	<p data-i18n="Index_P"></p>
// 	<div class="buttons">
// 		<button class="btn" id="/src/pages/logIn.html" data-i18n="btn_LogIn"></button>
// 		<button class="btn" id="/src/pages/signUp.html" data-i18n="btn_SignUp"></button>
// 	</div>
// </div>




