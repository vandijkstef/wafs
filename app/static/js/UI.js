import UItools from './UItools.js';
import debug from './debug.js';

// So.. UI
// Ideally I want to build all the UI straight from the application
// Every page should render its own section, at the moment it needs it
// If the section is there, it should try to update the section
// Above 2 rules should apply to elements/components within the section
// Optionally, I want to upgrade this system into using a "virtual DOM", much like react does

// So, stating the above
// TODO: Do some test to see if we can update stuff instead of re-rendering

// If every element has a connection to the datapiece
// How easily can I compare and/or update that on the UI?

const UI = {
	_: {
		nav: {
			data: [] // Do I want to keep data in here? Or do I only wanna do this for the nav?
		},
		main: {
			//sections: [] // Guess Ill never use this?
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
		} else {
			this.clearSection(route.section);
		}
		debug.log('UI: Render');
		route.template(appData, route);
		this.toggleSection(route);
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
		const listItems = [];
		this._.nav.data.forEach((item) => {
			listItems.push(UItools.getLinkListItem(item.name, item.path));
		});
		const list = UItools.getList(listItems);
		UItools.render(list, this._.nav.element);
	},
	setApiCalls: function(calls) {
		if (!this._.footer.logCounter) {
			const content = [UItools.getText('API Calls: '), UItools.getText('0')];
			const logCounter = UItools.renderIn(content, document.querySelector('footer'), '', 'logCounter');
			this._.footer.logCounter = logCounter.querySelector('p+p');
		}
		if (calls.toString() !== this._.footer.logCounter.innerHTML) {
			this._.footer.logCounter.innerHTML = calls;
		}
	},
	clearMain: function() {
		this._.main.element.innerHTML = '';
	},
	clearSection: function(section) {
		section.innerHTML = '';
	},
	createSection: function(route) {
		route.section = UItools.render(UItools.createElement('', route.id, 'section'), this._.main.element);
		console.log(3, route.section);
	},
	toggleSection: function(newActiveRoute) {
		const sections = document.querySelectorAll('main > section');
		sections.forEach((section) => {
			if (newActiveRoute.id == section.id) {
				section.classList.remove('hidden');
			} else {
				section.classList.add('hidden');
			}
		});
	}

};

// class UISection {
// 	constructor(name, data) {
		
// 	}
// }

export default UI;