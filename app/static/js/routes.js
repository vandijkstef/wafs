import settings from './settings.js';
import UItools from './UItools.js';
import GitAPI from './GitAPI.js';
// import debug from './debug.js';
// import tools from './tools.js';

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
		// var fields = [];
		// fields.push(UItools.getText('Config', '', '', 'h2'));
		// fields.push(UItools.getInput(UItools.getLabel('Textlabel'), 'text', 'textField'));
		// fields.push(UItools.getInput(UItools.getLabel('Numberlabel'), 'number', 'numberField'));
		// fields.push(UItools.getInput(UItools.getLabel('Checkboxlabel'), 'checkBox', 'testCheck'));
		// const form = UItools.getForm('testForm', fields);
		// UItools.addHandler(form, tools.catchForm, 'submit');
		// UItools.renderIn(form, route.section);
	},
	menu: 'Home'
};

const _repos = {
	id: 'repos',
	path: '/repo',
	handler: (appData, vars, callback) => {
		gitAPI.GetReposFromOrg(appData, settings.organisation, function(status) {
			console.log(appData);
			// if (status === false) {
			// 	callback(false);
			// } else {
			let count = 0;
			if (appData.git.repos.length > 0) {
				appData.git.repos.forEach((repo) => {
					repo.countAllCommits(false, () => {
						console.log(2, repo);
						count++;
						if (count == appData.git.repos.length) {
							callback();
						}
					});
				});
			} else {
				callback(false);
			}
			// }
		});
	},
	template: (appData, route) => {
		// Title
		UItools.render(UItools.getText(`Organisation: ${appData.git.organisation}`, '', '', 'h1'), route.section);
		// Repos
		appData.git.repos.forEach((repo) => {
			UItools.renderIn([UItools.getLink(repo.name, `/repo/${repo.name}`), UItools.getText(`Commits on forks: ${repo.totalCommitsInForks}`)], route.section);
		});
		console.log(appData);
	},
	menu: 'Repos'
};

const _repoDetail = {
	id: 'repoDetail',
	path: '/repo/:id',
	handler: (appData, vars, callback) => {
		console.log('Detail repo handler');
		callback();

		// TODO: This doesn't work directly
		// gitAPI.GetReposFromOrg(appData, settings.organisation, function() {
		// 	let count = 0;
		// 	// 
		// 	// appData.git.repos.forEach((repo) => {
		// 	// 	repo.countAllCommits(false, () => {
		// 	// 		console.log(2, repo);
		// 	// 		count++;
		// 	// 		if (count == appData.git.repos.length) {
		// 	// 			callback();
		// 	// 		}
		// 	// 	});
		// 	// });
		// });
	},
	template: (appData, route, vars) => {
		const repo = appData.git.repos.find((repo) => {
			return repo.name === vars.id;
		});
		const content = [];
		content.push(UItools.getText(repo.name, '', '', 'h1'));
		UItools.renderIn(content, route.section);
		repo.forks.sort((fork1, fork2) => {
			return fork2.ownerContributions.contributions - fork1.ownerContributions.contributions;
		});
		const forkList = [];
		repo.forks.forEach((fork) => {
			forkList.push(UItools.getLinkListItem(`${fork.owner}: ${fork.ownerContributions.contributions}`, fork.urls.html_url));
		});
		UItools.renderIn(UItools.getList(forkList, '', '', 'ol'), route.section);
	}
};

const routes = [
	_home,
	_repos,
	_repoDetail
];
export default routes;