import API from './API.js';

class GitAPI extends API {
	// Just for sake of lolz
	constructor() {
		super('https://api.github.com');
	}
}

export default GitAPI;