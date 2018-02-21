import settings from './settings.js';
// import Repo from './Repo.js';

import UItools from './UItools.js';
import GitAPI from './GitAPI.js';

const gitAPI = new GitAPI();

const _home = {
	id: 'home',
	path: '/',
	handler: (appData, vars, callback) => {
		console.log('Route handler');
		callback();
	},
	template: (appData, route) => {
		const content = [];
		content.push(UItools.getText(`Github organisation explorer`, '', '', 'h1'));
		content.push(UItools.getText(`Discover irrelevant meta data on the repositories of an organisation.`));
		UItools.renderIn(content, route.section);
	},
	menu: 'Home' 
};

const _repos = {
	id: 'repos',
	path: '/repo',
	handler: (appData, vars, callback) => {
		// const gitAPI = new GitAPI();
		// Possibly move this into GitAPI as GetReposFromOrg(organisation)
		// gitAPI.callCallback(appData, '/orgs/' + settings.organisation + '/repos', function(data) { 
		// 	data.forEach((repo) => { 
		// 		new Repo(appData, repo);
		// 		console.log(1234, appData);
		// 	});
		// 	callback();
		// });
		gitAPI.GetReposFromOrg(appData, settings.organisation, function() {
			console.log(123, appData);
			callback();
		});

	},
	template: (appData, route) => {
		// Title
		UItools.render(UItools.getText(`Organisation: ${appData.git.organisation}`, '', '', 'h1'), route.section);
		// Repos
		appData.git.repos.forEach((repo) => {
			UItools.renderIn(UItools.getLink(repo.name, `/repo/${repo.name}`), route.section);
		});
	},
	menu: 'Repos'
};

const _repoDetail = {
	id: 'repoDetail',
	path: '/repo/:id',
	handler: (appData, vars, callback) => {
		console.log('Detail repo handler');
		callback();
	},
	template: (appData) => {
		return `Detail repo template ${appData.git.organisation}`;
	}
};

const routes = [
	_home,
	_repos,
	_repoDetail
];
export default routes;

// Add all routes
// router.add('/', function() {
// 	debug.log('eehrm..');
// }, (appData) => {
// 	return `template ${appData.git.organisation}`;
// }, 'Home'); // Possibly need to wrap the template into a function and pass all relevant data into it

// router.add('/repo', function() {
// 	const gitAPI = new GitAPI();
// 	// TODO: This should probably be a promise and required to chain .then to get to rendering
// 	gitAPI.callCallback(appData, '/orgs/' + settings.organisation + '/repos', function(data) {
// 		data.forEach((repo) => {
// 			new Repo(appData, repo);
// 		});
// 		UI.renderRepoList(appData);
// 	});
// }, (appData) => {
// 	return `template ${appData.git.organisation}`;
// }, 'Repos');

// router.add('/repo/:var', function(vars) {
// 	debug.log('reponame', vars.var);
// }, (appData) => {
// 	return `template ${appData.git.organisation}`;
// });