import { getLanguage } from '../script/language';

export function setupAdmin() {
	const root = document.getElementById('app');
	if (root) {
		root.innerHTML = "";
		root.insertAdjacentHTML("beforeend", `
		<link rel="stylesheet" href="src/styles/admin.css"> <!-- Link to the CSS file -->
		<div class="overlay"></div>
		<div class="topBar">
			<div class="topBarFrame">
				<div class="adminName">Admin</div>
				<div class="profile-picture">
					<img src="src/component/Pictures/defaultPP.avif" alt="Profile Picture">
				</div>
			</div>
		</div>
		
		<div class="middle">
			<!-- BODY CHANGE -->

			<p>List of Users</p>
			<div class="buttons">
				<button class="btn">Remove</button>
			</div>
			<div class="buttons">
				<button class="btn">Change password</button>
			</div>

			</div>
			<!-- ^^^ -->
		</div>
		`);

		getLanguage();
	}
}