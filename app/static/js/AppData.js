import settings from './settings.js';

export default class AppData {
	constructor() {
		this.git = {
			organisation: settings.organisation,
			repos: []
		};
		this.apiCalls = 0; // ++ in every API requests .onLoad
	}
}