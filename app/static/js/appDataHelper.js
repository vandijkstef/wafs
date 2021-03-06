import AppData from './AppData.js';
import Repo from './Repo.js';
import debug from './debug.js';

const appDataHelper = {
	store: function(appData) {
		if (!localStorage) {
			console.warn('Local storage is disabled', 'Store');
			return;
		}
		// Copy the appData into something we can work with without having it reflect in the actual appData
		let workData = Object.assign({}, appData);
		workData.git.repos.forEach((repo) => {
			delete repo.appData;
			delete repo._gitData;
			delete repo.flow;
		});
		debug.log('appDataHelper: Store', workData);
		localStorage.setItem('appData', JSON.stringify(workData));
	},
	fetch: function() {
		let appData = new AppData();
		if (!localStorage) {
			console.warn('Local storage is disabled', 'Fetch');
			return appData;
		}
		if (localStorage.getItem('appData')) {
			const fetchedData = JSON.parse(localStorage.getItem('appData'));
			fetchedData.git.repos.forEach(function(repo) {
				new Repo(appData, repo, true);
			});
		}
		return appData;
	}
};

export default appDataHelper;