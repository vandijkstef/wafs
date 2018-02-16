import debug from './debug.js';
import appDataHelper from './appDataHelper.js';
import router from './router.js';

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
				router.go();
			});
		}


		logCalls() {
			UI.setApiCalls(appData.apiCalls);
			setTimeout(() => {
				this.logCalls();
			}, 1000);
		}
		
		// Called by constructor
		init() {
			debug.log('App: Init');
			appDataHelper.fetch();
			router.init();
			// Add all routes
			router.add('/', function() {
				debug.log('eehrm..');
			}, 'Home');
			router.add('/repo', function() {
				const gitAPI = new GitAPI();
				// TODO: This should probably be a promise and required to chain .then to get to rendering
				gitAPI.callCallback(appData, '/orgs/cmda-minor-web/repos', function(data) {
					// const repos = new Repo(appData, repo);
					data.forEach((repo) => {
						new Repo(appData, repo);
					});
					UI.renderRepoList(appData);
					// TODO: create new Repo, render list based on appData?
					// TODO: generalise named objectarray testing
					// if (!repo.flow) { 
					// repo.flow = {}; 
					// } 
					// repos.flow.firstLoop = true; 
					// repos.countAllCommits(false, () => { 
					// UItools.renderDiv(`<a href="/repo/${repo.name}">${repo.name}</a>`, document.body, 'repos', repo.name); 
					// }); 
				});
			}, 'Repos');
			router.add('/repo/:var', function(vars) {
				debug.log('reponame', vars.var);
			});

			UI.init();
			// And try to render the page
			router.go();

			// This is a lil' hacky, but it saves us API calls during dev
			setTimeout(() => {
				appDataHelper.store(appData);
			}, 5000);
		}
	}

	window.addEventListener('DOMContentLoaded', function() {
		new App();
	});

}