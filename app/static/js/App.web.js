import Class from './class.js';
import AppData from './AppData.js';
import debug from './debug.js';
// import settings from './settings.js';
import appDataHelper from './appDataHelper.js';
import router from './router.js';
import GitAPI from './GitAPI.js';
import UI from './UI.js';

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
			UI.setApiCalls(appData.apiCalls);
			setTimeout(() => {
				this.logCalls();
			}, 1000);
		}
		
		// Called by constructor
		init() {
			debug.log('App: Init');
			appDataHelper.fetch();
			UI.init();
			router.init();

			// Add all routes
			router.add('/', function() {
				debug.log('eehrm..');
			}, 'Home');
			router.add('/repo', function() {
				const gitAPI = new GitAPI();
				// TODO: This should probably be a promise and required to chain .then to get to rendering
				gitAPI.callCallback(appData, '/orgs/cmda-minor-web/repos', function(data) {
					// TODO: create new Repo, render list based on appData?
					// TODO: generalise named objectarray testing
					UI.renderRepoList(data);
					// const repos = new Repo(appData, repo); 
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

			// And try to render the page
			router.go();

			// This is a lil' hacky, but it saves us API calls during dev
			setTimeout(() => {
				appDataHelper.store(appData);
			}, 5000);
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