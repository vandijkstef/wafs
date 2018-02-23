class Route {
	constructor(id, route, handler, template) {
		this.id = id;
		this.route = route;
		this.handler = handler;
		this.template = template;
	}
}

export default Route;