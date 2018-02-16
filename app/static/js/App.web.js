import debug from './debug.js';
import appDataHelper from './appDataHelper.js';
import router from './router.js';
import settings from './settings.js';

import AppData from './AppData.js';
import Repo from './Repo.js';
import GitAPI from './GitAPI.js';

import UI from './UI.js';

{
	let appData = new AppData();
	
	// App
	class App {
		constructor() {
			this.init();
			this.logCalls();
			window.addEventListener('popstate', function() {
				router.go(appData);
			});
		}
		
		// Called by constructor
		init() {
			debug.log('App: Init');
			appData = appDataHelper.fetch();
			router.init();

			// TODO: Move the routing definition outside of this file
			// TODO: Possibly, call the routes from router.init() to make this file unbiased to the application

			// Add all routes
			router.add('/', function() {
				debug.log('eehrm..');
			}, (appData) => {
				return `template ${appData.git.organisation}`;
			}, 'Home'); // Possibly need to wrap the template into a function and pass all relevant data into it

			router.add('/repo', function() {
				const gitAPI = new GitAPI();
				// TODO: This should probably be a promise and required to chain .then to get to rendering
				gitAPI.callCallback(appData, '/orgs/' + settings.organisation + '/repos', function(data) {
					data.forEach((repo) => {
						new Repo(appData, repo);
					});
					UI.renderRepoList(appData);
				});
			}, (appData) => {
				return `template ${appData.git.organisation}`;
			}, 'Repos');

			router.add('/repo/:var', function(vars) {
				debug.log('reponame', vars.var);
			}, (appData) => {
				return `template ${appData.git.organisation}`;
			});

			UI.init();
			// And try to render the page
			router.go(appData);

			// This is a lil' hacky, but it saves us API calls during dev
			setTimeout(() => {
				appDataHelper.store(appData);
			}, 5000);
		}

		logCalls() {
			UI.setApiCalls(appData.apiCalls);
			setTimeout(() => {
				this.logCalls();
			}, 1000);
		}
	}

	window.addEventListener('DOMContentLoaded', function() {
		new App();
	});

}