import Class from './class.js';
import AppData from './AppData.js';
import debug from './debug.js';
// import settings from './settings.js';
import appDataHelper from './appDataHelper.js';
import Repo from './Repo.js';
import router from './router.js';
import GitAPI from './GitAPI.js';
import UItools from './vandy.js';

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
			if (!this.logCounter) {
				this.logCounter = UItools.renderDiv(0, document.body, null, 'logCounter');
			}
			if (appData.apiCalls.toString() !== this.logCounter.innerHTML) {
				this.logCounter.innerHTML = appData.apiCalls;
			}
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
				// TODO: This should probably be a promise and required to chain .then to get to rendering
				// Also, why is there so much logic within the router handler?
				gitAPI.callCallback(appData, '/orgs/cmda-minor-web/repos', function(data) {
					data.forEach(function(repo) {
						const repos = new Repo(appData, repo);
						if (!repo.flow) {
							repo.flow = {};
						}
						repos.flow.firstLoop = true;
						repos.countAllCommits(false, () => {
							UItools.renderDiv(`<a href="/repo/${repo.name}">${repo.name}</a>`, document.body, 'repos', repo.name);
						});
					});
					debug.log('appData', appData);
				});
			}, 'Home');
			router.add('/repo', function() {
				debug.log('eehrm..');
			});
			router.add('/repo/:var', function(vars) {
				debug.log('reponame', vars.var);
			});

			// And try to render the page
			router.go();
		}
	}

	// TODO: Create a templating thingy?;


	// TODO: Maybe look into the not-simple way to inject HTML

	// So.. UI
	// Ideally I want to build all the UI straight from the application
	// Every page should render its own section, at the moment it needs it
	// If the section is there, it should try to update the section
	// Above 2 rules should apply to elements/components within the section
	// Optionally, I want to upgrade this system into using a "virtual DOM", much like react does


	window.addEventListener('DOMContentLoaded', function() {
		new App();
	});

}