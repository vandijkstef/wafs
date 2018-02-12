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
				console.log('camtono');
			});
			router.add('/test', function() {
				console.log('chocolate');
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
			this.routes.push({route: route, handler: handler});
		},
		go: function() {
			let page = window.location.pathname;
			debug.log('Router: Go: ' + page);
			let route;
			this.routes.forEach(function(r) {
				if (page === r.route) {
					route = r;
					return;
				}
			});
			if (route) {
				route.handler();
			} else {
				this.noRoute();
			}
		},
		noRoute: function() {
			// Render 404 page
			console.warn(404);
		}
	};
	
	// TODO: Create a templating thingy?
	// TODO: Maybe look into the not-simple way to inject HTML
	// TODO: Rework Vandy.UI tools for this?
	
	window.addEventListener('DOMContentLoaded', function() {
		new App();

		// TODO: Move somewhere-ish? Its working at least...
		// const gitAPI = new API('https://api.github.com');
		// gitAPI.call('/orgs/cmda-minor-web/repos', function(data) {
		// 	const gitDATA = data;
		// 	console.log(gitDATA);
		// });
	});

}
