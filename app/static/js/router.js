import debug from './debug.js';
import Route from './Route.js';
import UI from './UI.js';

const router = {
	routes: [],
	init() {
		debug.log('Router: Init');
	},
	catchLinks: function(appData) {
		// Disable functionality of all A elements...
		document.querySelectorAll('a').forEach(function(a) {
			a.addEventListener('click', function(e) {
				console.log('trying');
				e.preventDefault(); // Must be last line
				try {
					// Try to update the URL, this will fail on external links
					history.pushState(null, null, e.target.href);
					// If this didn't fail, we are still here
				} catch(error) {
					// Probably an external url, dont prevent following the link
					debug.log('External URL', error);
				} finally {
					console.log('pushing state');
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
			// console.log(this.routes[i].route);
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
			console.log('Am I done with handler?');
			UI.render(appData, route);
			this.catchLinks(appData); // Wouldn't this make more sense in UI?
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
	add: function(route, handler, template, menu) {
		debug.log('Router: Add: ' + route);
		// TODO: Test route validity? -> Do we wanna pass in the route as an array? Or make it optional?
		this.routes.push(new Route(this.parseLocation(route), handler, template));
		if (menu) {
			UI.addNav(menu, route);
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