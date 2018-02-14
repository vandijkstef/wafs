import Class from './class.js';
import AppData from './AppData.js';
import debug from './debug.js';
// import settings from './settings.js';
import appDataHelper from './appDataHelper.js';
import Repo from './Repo.js';
import router from './router.js';
import GitAPI from './GitAPI.js';

{
	let appData = new AppData();
	
	// App
	class App {
		constructor() {
			debug.log(Class);
			this.init();
			this.logCalls();
			window.addEventListener('popstate', function() {
				router.go();
			});
		}

		logCalls() {
			console.log('calls', appData.apiCalls);
			setTimeout(() => {
				this.logCalls();
			}, 1000);
		}
		
		// Called by constructor
		init() {
			debug.log('App: Init');
			router.init();

			// Add all routes
			router.add('/', function() {
				const gitAPI = new GitAPI();
				appDataHelper.fetch();
				gitAPI.callCallback(appData, '/orgs/cmda-minor-web/repos', function(data) {
					data.forEach(function(repo) {
						const repos = new Repo(appData, repo);
						if (!repo.flow) {
							repo.flow = {};
						}
						repos.flow.firstLoop = true;
						console.log(repos);
						repos.countAllCommits();
						const p = document.createElement('p');
						p.innerText = repo.name;
						document.body.appendChild(p);
					});
					console.log(appData);
				});
			});
			router.add('/test', function() {
				console.log('chocolate');
			});
			router.add('/test/novar', function() {
				console.log('no var');
			});
			router.add('/test/:var', function(vars) {
				console.log('testolate');
				console.log(vars.var);
			});

			// And try to render the page
			router.go();
		}
		
	}

	// TODO: Create a templating thingy?;
	// TODO: Maybe look into the not-simple way to inject HTML
	// TODO: Rework Vandy.UI tools for this?

	window.addEventListener('DOMContentLoaded', function() {
		new App();
	});

}