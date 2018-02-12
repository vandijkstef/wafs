'use strict';

{
	// App settings
	const settings = {
		debug: true
	};
	
	// Debug helper - Splits (temporary) console.logs from solid logs
	const debug = {
		log: function(data) {
			if (settings.debug) {
				console.log(data);
			}
		}
	};

	const tools = {
		// Compares arrays, but is aware of var path parts
		compareRoute: function(route, path) {
			if (route.length === path.length) {
				for (let i = 0; i < route.length; i++) {
					if (route[i] !== path[i]) {
						if (route[i][0] === ':') {
							// We are talking variables here							
							// I can easily fetch the set variable name here, but I can't use it here
							// Returning smth else then bool is retarded...
							// What about multivariable urls? (Do we really wanna go that far?)
							return true;
						}
						return false;
					}
				}
				return true;
			}
			return false;
		}
	};

	// API class
	class API {
		constructor(server) {
			debug.log('API: Created for: ' + server);
			this.server = server;
		}

		call(path, callback) {
			debug.log('API: Calling: "' + path + '" on ' + this.server);
			const API = new XMLHttpRequest();
			API.open('GET', this.server + path);
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

			router.add('/', function() {
				const gitAPI = new API('https://api.github.com');
				gitAPI.call('/orgs/cmda-minor-web/repos', function(data) {
					const gitDATA = data;
					console.log(gitDATA);
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

			console.log(router.routes);
			router.go();
		}
		
	}
	
	// Router
	// TODO: Subpages/variable passing...
	const router = {
		routes: [],
		init() {
			debug.log('Router: Init');
			// Disable functionality of all A elements...
			document.querySelectorAll('a').forEach(function(a) {
				a.addEventListener('click', function(e) {
					try {
						history.pushState(null, null, e.target.href);
						router.go();
						e.preventDefault(); // Must be last line
					} catch(error) {
						// ... unless it's an external url
						debug.log('External URL', error);
					}
				});
			});
		},
		add: function(route, handler) {
			debug.log('Router: Add: ' + route);
			this.routes.push({route: this.parseLocation(route), handler: handler});
		},
		go: function() {
			let route;
			const vars = {};
			const page = this.parseLocation(window.location.pathname);
			debug.log('Router: Go: ' + page);
			for (let i = 0; i < this.routes.length; i++) {
				if (route) {
					break;
				}
				if (tools.compareRoute(this.routes[i].route, page)) {
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
		// Splits the URL, returns the path as an array
		parseLocation: function(pathname) {
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
		noRoute: function() {
			// Render 404 page
			console.warn(404);
		}
	};
	
	// TODO: Create a templating thingy?;
	// TODO: Maybe look into the not-simple way to inject HTML
	// TODO: Rework Vandy.UI tools for this?

	window.addEventListener('DOMContentLoaded', function() {
		new App();
		console.log('This is an auto update test - 2');
	});

}
