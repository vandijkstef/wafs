import API from './API.js';
import Repo from './Repo.js';

class GitAPI extends API {
	// Just for sake of lolz
	constructor() {
		super('https://api.github.com');
	}

	GetReposFromOrg(appData, organisation, callback) {
		this.callPromise(appData, '/orgs/' + organisation + '/repos')
			.then((data) => {
				data.forEach((repo) => { 
					new Repo(appData, repo);
					console.log(8523, appData);
				});
				callback();
			});
	}
}

export default GitAPI;