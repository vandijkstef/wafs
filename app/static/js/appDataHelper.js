import AppData from './AppData.js';
import Repo from './Repo.js';

const appDataHelper = {
	// TODO: Do I wanna put the filler functions in here?
	store: function(appData) {
		localStorage.setItem('appData', JSON.stringify(appData));
	},
	fetch: function() {
		let appData = new AppData();
		if (localStorage.getItem('appData')) {
			const fetchedData = JSON.parse(localStorage.getItem('appData'));
			fetchedData.git.repos.forEach(function(repo) {
				new Repo(repo, true);
			});
		}
		return appData;
	}
};

export default appDataHelper;