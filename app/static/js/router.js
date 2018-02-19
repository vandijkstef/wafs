import debug from './debug.js';
import Route from './Route.js';
import UI from './UI.js';
import routes from './routes.js';

const router = {
	routes: [],
	init(appData) {
		debug.log('Router: Init');
		// Catch browser back/forward
		window.addEventListener('popstate', function() {
			router.go(appData);
		});
		// Prepare all routes
		this.getRoutes();
		// Prepare the UI based on the available routes
		UI.init();
		// And try to render the page
		router.go(appData);

	},
	getRoutes: function() {
		routes.map(route => {
			this.add(route);
		});
	},
	catchLinks: function(appData) {
		// Disable functionality of all A elements...
		document.querySelectorAll('a').forEach(function(a) {
			a.addEventListener('click', function(e) {
				e.preventDefault(); // Must be last line
				try {
					// Try to update the URL, this will fail on external links
					history.pushState(null, null, e.target.href);
					// If this didn't fail, we are still here
				} catch(error) {
					// Probably an external url, dont prevent following the link
					debug.log('External URL', error);
				} finally {
					router.go(appData);
				}
				return false;
			});
		});
	},
	// Go to the current path, the <a> click handler takes care of this
	go: function(appData) {
		let route;
		const vars = {};
		const page = this.parseLocation(window.location.pathname);
		debug.log('Router: Go: ' + page);
		for (let i = 0; i < this.routes.length; i++) {
			if (route) {
				break;
			}
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
			route.handler(appData, vars, ()=>{
				debug.log('Router: Handler done: Rendering');
				UI.render(appData, route);
				this.catchLinks(appData); // Are we stacking eventlisteners?
				// Pretty sure we don't want to move this into UI since it will require us to pass the router into the UI
			});
		} else {
			this.noRoute();
		}
	},
	// 404
	noRoute: function() {
		// Render 404 page
		debug.warn(404);
	},
	// Helpers
	// Add new route to the router
	add: function(route) {
		const newRoute = new Route(route.id, this.parseLocation(route.path), route.handler, route.template);
		this.routes.push(newRoute);
		if (route.menu) {
			UI.addNav(route.menu, route.path);
		}
	},
	// Splits the URL, returns the path as an array
	parseLocation(path) {
		let route = [];
		path = path.split('/');
		// Clear empty elements
		path.forEach(function(p) {
			if (p.length > 0) {
				route.push(p);
			}
		});
		return route;
	},
	compareRoute: function(route, path) {
		// TODO: Try to use filter to fetch a first batch of items
		// Maybe filter again? Try variable/solid urls?
		if (route.length === path.length) {
			for (let i = 0; i < route.length; i++) {
				if (route[i] !== path[i]) {
					if (route[i][0] === ':') {
						return true;
					}
					debug.warn('Notify dev if you see this');
					return false;
				}
			}
			return true;
		}
		return false;
	}
};

export default router;