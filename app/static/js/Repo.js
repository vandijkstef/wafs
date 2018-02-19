import settings from './settings.js';
import GitAPI from './GitAPI.js';
import debug from './debug.js';
import tools from './tools.js';

class Repo {
	constructor(appData, data, persistant) {
		this.flow = {};
		this.gitAPI = new GitAPI();
		this.appData = appData;
		let isThere = tools.testDuplicateNamedObjectArray(data, this.appData.git.repos);

		// Actually do what the constructor should...
		if (isThere) {
			// ...unless we have a duplicate we should return
			return isThere;
		} else {
			if (persistant) {
				Object.assign(this, data);
				this.flow.persistant = true;
			} else {
				if (settings.debug) {
					// If debug, store the complete gitData with it
					// Do not use this within the app!
					this._gitData = data;
				}
				this.flow.new = true;
				this.name = data.name;
				this.urls = {
					forks: data.forks_url
				};
			}
			appData.git.repos.push(this);
		}
	}

	// Extention methods
	getAllForks(refresh, callback) {
		if (!this.forks || refresh) {
			this.forks = [];
			const gitAPI = new GitAPI();
			gitAPI.callPromise(this.appData, this.urls.forks)
				.then((data) => {
					data.forEach((forkData) => {
						const fork = {
							owner: forkData.owner.login,
							urls: {
								contributors: forkData.contributors_url
							}
						};
						if (settings.debug) {
							fork._forkData = forkData;
						}
						this.forks.push(fork);
					});
					return callback(this.forks);
				})
				.catch(() => {
					debug.warn('Repo: getAllForks: callPromise: catch()');
				});
			// gitAPI.callCallBack()
		} else {
			return callback(this.forks);
		}
	}
	// TODO: Is this doing fine within the Repo class? Or is this fitting better in the GitAPI?
	countAllCommits(refresh, callback) {
		if (!this.totalAllCommits || refresh) {
			// const gitAPI = new GitAPI();
			this.getAllForks(refresh, () => {
				// Get contributors per fork
				this.forks.forEach((fork) => {
					this.gitAPI.callPromise(this.appData, fork.urls.contributors)
						.then((data) => {
							fork.contribData = data;
							data.forEach(function(data) {
								data.iDidIt = true;
							});
							// console.log(20, data);
							// console.log('im done with this');
							// TODO: HERE

						})
						.catch(() => {
							debug.warn('Repo: countAllCommits: callPromise: catch()');
						});
				});
				this.totalAllCommits = 5;
				return callback(this);
			});
		} else {
			return callback(this);
		}
		// console.log(appData);
	}

}

export default Repo;