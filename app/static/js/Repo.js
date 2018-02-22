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
			} else {
				if (settings.debug) {
					// If debug, store the complete gitData with it
					// Do not use this within the app!
					this._gitData = data;
				}
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
					return callback();
				})
				.catch(() => {
					debug.warn('Repo: getAllForks: callPromise: catch()');
				});
		} else {
			return callback();
		}
	}
	// TODO: Is this doing fine within the Repo class? Or is this fitting better in the GitAPI? -> it is...
	countAllCommits(refresh, callback) {
		if (!this.totalCommitsInForks || refresh) {
			const gitAPI = new GitAPI();
			// const gitAPI = new GitAPI();
			let fetched = 0;
			this.getAllForks(refresh, () => {
				// Get contributors per fork
				this.forks.forEach((fork, i, forks) => {
					gitAPI.callPromise(this.appData, fork.urls.contributors)
						.then((data) => {
							fetched++;
							fork.contribData = data;
							const ownerContributions = fork.contribData.filter((data) => {
								return data.login === fork.owner;
							});
							fork.ownerContributions = ownerContributions[0];
							if (fetched === forks.length) {
								let count = this.forks.reduce((total, fork) => {
									if (fork.ownerContributions === undefined) {
										// Some people did fork, but didn't commit. Jerks
										fork.ownerContributions = {
											contributions: 0
										};
									}
									return total + fork.ownerContributions.contributions;
								}, 0);
								this.totalCommitsInForks = count;
								callback();
							}
						})
						.catch((err) => {
							console.log(err);
							debug.warn('Repo: countAllCommits: callPromise: catch()');
						});
				});
			});
		} else {
			return callback();
		}
	}
}

export default Repo;