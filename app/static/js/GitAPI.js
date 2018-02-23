import API from './API.js';
import Repo from './Repo.js';

class GitAPI extends API {
	// Just for sake of lolz
	constructor() {
		super('https://api.github.com');
	}

	
	GetReposFromOrg(appData, organisation, callback) {
		// Theres no cache fallback here, this ain't a heavy call
		// Note that they are not added again to the AppData if the repo is already there
		// So, any repo-level changes in the data are not stored
		this.callPromise(appData, '/orgs/' + organisation + '/repos')
			.then((data) => {
				data.forEach((repo) => { 
					new Repo(appData, repo);
				});
				callback();
			})
			.catch((err) => {
				callback(false);
			});
	}
}

export default GitAPI;