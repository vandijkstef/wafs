import settings from './settings.js';

// Debug helper - Splits (temporary) console.logs from solid logs
const debug = {
	log: function(data, data2 = '') {
		if (settings.debug) {
			console.log(data, data2);
		}
	},
	warn: function(data) {
		console.warn(data);
	}
};

export default debug;