'use strict';

{
	// App settings
	const settings = {
		debug: true,
		tokens: {
			git: '6eeca6c5c52087f95f8ebdbdaa3720efb2ad7c55'
		}
	};
	
	// Debug helper - Splits (temporary) console.logs from solid logs
	const debug = {
		log: function(data) {
			if (settings.debug) {
				console.log(data);
			}
		},
		warn: function(data) {
			console.warn(data);
		}
	};

	// const tools = {
	// };

	class AppData {
		constructor() {
			this.git = {
				repos: []
			};
		}
	}
	let appData = new AppData();

	const appDataHelper = {
		// TODO: Do I wanna put the filler functions in here?
		store: function() {
			localStorage.setItem('appData', JSON.stringify(appData));
		},
		fetch: function() {
			appData = new AppData();
			if (localStorage.getItem('appData')) {
				const fetchedData = JSON.parse(localStorage.getItem('appData'));
				fetchedData.git.repos.forEach(function(repo) {
					new Repo(repo, true);
				});
			}
		}
	};

	// API classes
	class API {
		constructor(server) {
			debug.log('API: Created for: ' + server);
			this.server = server;
		}

		callCallback(path, callback) {
			debug.log('API: Calling: "' + path + '" on ' + this.server);
			const API = new XMLHttpRequest();
			path = path.replace(this.server, '');
			API.open('GET', this.server + path + '?access_token=' + settings.tokens.git);
			API.setRequestHeader('Content-Type', 'application/json');
			API.onload = function() {
				if (API.status === 200) {
					return callback(JSON.parse(API.responseText));
				} else {
					console.warn('We didn\'t receive 200 status');
				}
			};
			API.send();
		}

		callPromise(path) {
			const promise = new Promise((resolve, reject) => {
				const API = new XMLHttpRequest();
				path = path.replace(this.server, ''); // Git gives full urls, so strip the server from the url
				API.open('GET', this.server + path + '?access_token=' + settings.tokens.git);
				API.setRequestHeader('Content-Type', 'application/json');
				API.onload = function() {
					if (API.status === 200) {
						resolve(JSON.parse(API.responseText));
					} else {
						reject('We didn\'t receive 200 status');
					}
				};
				API.send();
			});
			return promise;
		}
	}

	class GitAPI extends API {
		// Just for sake of lolz
		constructor() {
			super('https://api.github.com');
		}
	}

	// Repo class
	class Repo {
		constructor(data, persistant) {
			let isThere = false;
			this.flow = {};

			// Test if we are not adding duplicates
			appData.git.repos.forEach(function(repo) {
				if (repo.name === data.name) {
					repo.flow.duplicate = true;
					isThere = repo;
				}
			});

			if (isThere) {
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
		// This will probably even update in the appData (if we call this on the item that is placed there)
		countAllCommits(refresh) {
			if (!this.totalAllCommits || refresh) {
				this.getAllForks(refresh, () => {
					// Get contributors per fork
					this.forks.forEach(function(fork) {
						const gitAPI = new GitAPI();
						gitAPI.callPromise(fork.urls.contributors)
							.then((data) => {
								// TODO: HERE
								console.log(20, data);
							})
							.catch(() => {
								console.log('Oops');
							});
					});
				});

				this.totalAllCommits = 5;
			} else {
				return this.totalAllCommits;
			}
			console.log(appData);
		}

		getAllForks(refresh, callback) {
			if (!this.forks || refresh) {
				this.forks = [];
				const gitAPI = new GitAPI();
				gitAPI.callPromise(this.urls.forks)
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
					.catch(function() {
						debug.warn('No API data');
					});
			} else {
				return callback(this.forks);
			}
		}
	}
	
	// App
	class App {
		constructor() {
			this.init();
			window.addEventListener('popstate', function() {
				router.go();
			});
		}
		
		// Called by constructor
		init() {
			debug.log('App: Init');
			router.init();

			// Add all routes
			router.add('/', function() {
				const gitAPI = new GitAPI();
				appDataHelper.fetch();
				gitAPI.callCallback('/orgs/cmda-minor-web/repos', function(data) {
					data.forEach(function(repo) {
						const repos = new Repo(repo);
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

	class Route {
		constructor(route, handler) {
			this.route = route;
			this.handler = handler;
		}
	}
	
	// Router
	const router = {
		routes: [],
		init() {
			debug.log('Router: Init');
			// Disable functionality of all A elements...
			document.querySelectorAll('a').forEach(function(a) {
				a.addEventListener('click', function(e) {
					try {
						// Try to update the URL, this will fail on external links
						history.pushState(null, null, e.target.href);
						// If this didn't fail, we are still here
						router.go();
						e.preventDefault(); // Must be last line
					} catch(error) {
						// Probably an external url, dont prevent following the link
						debug.log('External URL', error);
					}
				});
			});
		},
		// Go to the current path, the <a> click handler takes care of this
		go: function() {
			let route;
			const vars = {};
			const page = this.parseLocation(window.location.pathname);
			debug.log('Router: Go: ' + page);
			for (let i = 0; i < this.routes.length; i++) {
				if (route) {
					break;
				}
				console.log(this.routes[i].route);
				if (this.compareRoute(this.routes[i].route, page)) {
					debug.log('Router: Assigning: ' + this.routes[i].route);
					route = this.routes[i];
					// Scan the route for variables, add them to the vars object
					for (let j = 0; j < route.route.length; j++) {
						if (route.route[j][0] == ':') {
							vars[route.route[j].replace(':', '')] = page[i];
						}
					}
				}
			}
			if (route) {
				route.handler(vars);
			} else {
				this.noRoute();
			}
		},
		// 404
		noRoute: function() {
			// Render 404 page
			console.warn(404);
		},
		// Helpers
		// Add new route to the router
		add: function(route, handler) {
			debug.log('Router: Add: ' + route);
			// TODO: Test route validity? -> Do we wanna pass in the route as an array? Or make it optional?
			this.routes.push(new Route(this.parseLocation(route), handler));
		},
		// Splits the URL, returns the path as an array
		parseLocation(pathname) {
			let path = [];
			pathname = pathname.split('/');
			// Clear empty elements
			pathname.forEach(function(p) {
				if (p.length > 0) {
					path.push(p);
				}
			});
			return path;
		},
		compareRoute: function(route, path) {
			if (route.length === path.length) {
				for (let i = 0; i < route.length; i++) {
					if (route[i] !== path[i]) {
						if (route[i][0] === ':') {
							return true;
						}
						console.log('I guess I will never this, am I rite?');
						return false;
					}
				}
				return true;
			}
			return false;
		}
	};
	
	// TODO: Create a templating thingy?;
	// TODO: Maybe look into the not-simple way to inject HTML
	// TODO: Rework Vandy.UI tools for this?

	window.addEventListener('DOMContentLoaded', function() {
		new App();
	});

}