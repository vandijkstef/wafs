import debug from './debug.js';
import settings from './settings.js';

class API {
	constructor(server) {
		debug.log('API: Created for: ' + server);
		this.server = server;
	}

	callCallback(appData, path, callback) {
		debug.log('API: Calling: "' + path + '" on ' + this.server);
		const API = new XMLHttpRequest();
		console.log(path);
		path = path.replace(this.server, ''); // Git gives full urls, so strip the server from the url
		API.open('GET', this.server + path + '?access_token=' + settings.tokens.git);
		API.setRequestHeader('Content-Type', 'application/json');
		API.onload = function() {
			appData.apiCalls++;
			if (API.status === 200) {
				return callback(JSON.parse(API.responseText));
			} else {
				console.warn('We didn\'t receive 200 status');
			}
		};
		API.send();
	}

	// Yes this function is mainly repeating the above, I will ultimately choose the method that suits me best
	callPromise(appData, path) {
		const promise = new Promise((resolve, reject) => {
			const API = new XMLHttpRequest();
			path = path.replace(this.server, ''); // Git gives full urls, so strip the server from the url
			API.open('GET', this.server + path + '?access_token=' + settings.tokens.git);
			API.setRequestHeader('Content-Type', 'application/json');
			API.onload = function() {
				appData.apiCalls++;
				if (API.status === 200) {
					resolve(JSON.parse(API.responseText));
				} else {
					console.log('really?');
					reject('We didn\'t receive 200 status');
				}
			};
			API.send();
		});
		return promise;
	}
}

export default API;