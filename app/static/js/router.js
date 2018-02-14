import debug from './debug.js';
import Route from './Route.js';

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

export default router;