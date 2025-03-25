export function setupError404() {
	const root = document.getElementById('app');
	if (root) {
		root.innerHTML = "";
		root.insertAdjacentHTML("beforeend", `
		<link rel="stylesheet" href="src/styles/errorPage.css"> <!-- Link to the CSS file -->
		<div class="overlay"></div>
		<div class="container">
			<div class="error-code">404</div>
			<h1>Not Found</h1>
			<p>The requested resource could not be found on the server!</p>
		</div>
		`);
	}
}
