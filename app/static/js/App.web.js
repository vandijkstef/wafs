import debug from './debug.js';
import appDataHelper from './appDataHelper.js';
import router from './router.js';

import UI from './UI.js'; // TODO: Move to router

{	
	// App
	class App {
		constructor() {
			// First things first, lets try to fetch out app cached data, else it will just setup the appData object.
			this.appData = appDataHelper.fetch();
			// Init the system
			this.init();

			//////////////////////
			// Debug stuff:
			// Start an infinite loop that shows the amount of calls we make
			this.logCalls();
			// Save our data after 5 seconds
			// This is a lil' hacky, but it saves us API calls during dev
			// setTimeout(() => {
			// 	appDataHelper.store(this.appData);
			// }, 5000);
			//////////////////////
		}
		
		// Called by constructor
		init() {
			debug.log('App: Init');
			// Try to fetch API key from local storage, fallback to default if not
			router.init(this.appData);
		}

		// Debug function: Should probably move to UI for usage in production
		logCalls() {
			UI.setApiCalls(this.appData.apiCalls);
			setTimeout(() => {
				this.logCalls();
			}, 1000);
		}
	}

	window.addEventListener('DOMContentLoaded', function() {
		new App();
	});

}