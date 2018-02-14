export default class AppData {
	constructor() {
		this.git = {
			repos: []
		};
		this.apiCalls = 0; // ++ in every API requests .onLoad
	}
}