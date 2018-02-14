import settings from './settings.js';

// Debug helper - Splits (temporary) console.logs from solid logs
const debug = {
	log: function(data) {
		if (settings.debug) {
			console.log(data);
		}
	},
	warn: function(data) {
		console.warn(data);
	}
};

export default debug;