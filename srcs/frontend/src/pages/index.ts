import { setupCounter } from './counter';
import { setupAboutPage } from './about';
// import { translate } from '../script/language.ts';

document.addEventListener('DOMContentLoaded', () => {
	renderPage();
});

export function renderPage() {
	const root = document.getElementById('app');
	if (root) {
		if (window.location.pathname === '/counter') {
			setupCounter();
		} else if (window.location.pathname === '/about') {
			setupAboutPage();
		} else {
			root.innerHTML = `
<link rel="stylesheet" href="src/styles/index.css"> <!-- Link to the CSS file -->
<div class="overlay"></div>
	<div class="container">
		<h1 class="header" data-i18n="Index_Header">ffff</h1>
		<p data-i18n="Index_P"></p>
		<div class="buttons">
			<button class="btn" id="toCounter" data-i18n="btn_LogIn"></button>
			<button class="btn" id="toAbout" data-i18n="btn_SignUp"></button>
		</div>
	</div>
      `;

			document.getElementById('toCounter')?.addEventListener('click', () => {
				window.history.pushState({}, '', '/counter');
				renderPage();
			});

			document.getElementById('toAbout')?.addEventListener('click', () => {
				window.history.pushState({}, '', '/about');
				renderPage();
			});

			// // Call translate after rendering the page
            // translate();
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




