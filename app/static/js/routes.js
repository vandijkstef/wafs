import settings from './settings.js';
import UItools from './UItools.js';
import GitAPI from './GitAPI.js';

const gitAPI = new GitAPI();

const _home = {
	id: 'home',
	path: '/',
	handler: (appData, vars, callback) => {
		callback();
	},
	template: (appData, route) => {
		const content = [];
		content.push(UItools.getText(`Github organisation explorer`, '', '', 'h1'));
		content.push(UItools.getText(`Discover irrelevant metadata on the repositories of an organisation.`));
		UItools.renderIn(content, route.section);
	},
	menu: 'Home'
};

const _repos = {
	id: 'repos',
	path: '/repo',
	handler: (appData, vars, callback) => {
		gitAPI.GetReposFromOrg(appData, settings.organisation, function() {
			appData.git.repos.forEach((repo) => {
				repo.countAllCommits(false, () => {
					console.log(2, repo);
					callback();
				});
			});
		});
	},
	template: (appData, route) => {
		// Title
		UItools.render(UItools.getText(`Organisation: ${appData.git.organisation}`, '', '', 'h1'), route.section);
		// Repos
		appData.git.repos.forEach((repo) => {
			UItools.renderIn([UItools.getLink(repo.name, `/repo/${repo.name}`), UItools.getText(`Commits on forks: ${repo.totalCommitsInForks}`)], route.section);
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
	template: (appData, route, vars) => {
		const repo = appData.git.repos.find((repo) => {
			return repo.name === vars.id;
		});
		const content = [];
		content.push(UItools.getText(repo.name, '', '', 'h1'));
		UItools.renderIn(content, route.section);
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