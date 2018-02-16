import UItools from './vandy.js';
import debug from './debug.js';

// So.. UI
// Ideally I want to build all the UI straight from the application
// Every page should render its own section, at the moment it needs it
// If the section is there, it should try to update the section
// Above 2 rules should apply to elements/components within the section
// Optionally, I want to upgrade this system into using a "virtual DOM", much like react does

// So, stating the above
// TODO: Create section stuff
// TODO: Do some test to see if we can update stuff instead of re-rendering



// We have routes that should correspond to sections
// Thus, every route should create a section (upon fetching that route?)
// If we store this in the router.Route, we can pass the Route to the UI class together with the full appData
// Thus, we can define our templates within the Route?

const UI = {
	_: {
		nav: {
			data: [] // Do I want to keep data in here? Or do I only wanna do this for the nav?
		},
		main: {
			sections: [] // Guess Ill never use this?
		},
		footer: {
		}
	},
	init: function() {
		debug.log('UI: Init');
		if (!this._.nav.element) {
			this._.nav.element = document.querySelector('nav');
		}
		if (!this._.main.element) {
			this._.main.element = document.querySelector('main');
		}
		if (!this._.footer.element) {
			this._.footer.element = document.querySelector('footer');
		}
		this.renderNav();
	},
	render: function(appData, route) {
		if (!route.section) {
			this.createSection(route);
		}
		debug.log('UI: Render');
		// appData.git.organisation = 'test';
		console.log(route.template(appData));
	},
	addNav: function(name, path) {
		const menuItem = {
			name: name,
			path: path
		};
		this._.nav.data.push(menuItem);
	},
	renderNav: function() {
		debug.log('UI: renderNav');
		this._.nav.element.appendChild(UItools.getLinkList(this._.nav.data));
	},
	setApiCalls: function(calls) {
		if (!this._.footer.logCounter) {
			this._.footer.logCounter = UItools.renderDiv([UItools.getText('API Calls:'), UItools.getText(calls)], this._.footer.element, null, 'logCounter').querySelector('p+p');
		}
		if (calls.toString() !== this._.footer.logCounter.innerHTML) {
			this._.footer.logCounter.innerHTML = calls;
		}
	},
	renderRepoList: function(appData) {
		appData.git.repos.forEach((repo) => {
			UItools.renderDiv(`<a href="/repo/${repo.name}">${repo.name}</a>`, this._.main.element, 'repos', repo.name);
		});
	},
	clearMain: function() {
		this._.main.element.innerHTML = '';
	},
	createSection: function(route) {
		// UItools.renderDiv()
		route.section = UItools.renderDiv('text', this._.main.element, null, route.route);
		console.log(route);
	}

};

// class UISection {
// 	constructor(name, data) {
		
// 	}
// }

export default UI;