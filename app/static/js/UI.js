import UItools from './UItools.js';
import debug from './debug.js';
import appDataHelper from './appDataHelper.js';

const UI = {
	_: {
		nav: {
			data: [] // Do I want to keep data in here? Or do I only wanna do this for the nav?
		},
		main: {
			//sections: [] // Guess Ill never use this?
		},
		footer: {
		},
		loader: {

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
		if (!this._.loader.element) {
			this._.loader.element = document.querySelector('#load');
		}
		this.renderNav();
	},
	render: function(appData, route, vars) {
		if (!route.section) {
			this.createSection(route);
		} else {
			this.clearSection(route.section);
		}
		debug.log('UI: Render');
		this._.loader.element.classList.add('hidden');
		appDataHelper.store(appData);
		try {
			route.template(appData, route, vars);
			this.toggleSection(route);
		} catch (err) {
			console.log(err);
			this.error();
		}
	},
	addNav: function(route) {
		const menuItem = {
			name: route.menu,
			path: route.path,
			id: route.id
		};
		this._.nav.data.push(menuItem);
	},
	renderNav: function() {
		debug.log('UI: renderNav');
		const listItems = [];
		this._.nav.data.forEach((item) => {
			listItems.push(UItools.getLinkListItem(item.name, item.path, '', item.id));
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
		if (calls.toString() !== this._.footer.logCounter.innerText) {
			this._.footer.logCounter.innerText = calls;
		}
	},
	clearMain: function() {
		this._.main.element.innerText = '';
	},
	clearSection: function(section) {
		section.innerText = '';
	},
	createSection: function(route) {
		route.section = UItools.render(UItools.createElement('', route.id, 'section'), this._.main.element);
	},
	toggleSection: function(newActiveRoute) {
		const sections = document.querySelectorAll('main > section');
		sections.forEach((section) => {
			if (newActiveRoute && newActiveRoute.id == section.id) {
				section.classList.remove('hidden');
			} else {
				section.classList.add('hidden');
			}
		});
	},
	load: function() {
		this._.loader.element.classList.remove('hidden');
		this.toggleSection();
	},
	error: function(errorType) {
		let errorText = 'Oops! Something went wrong, click here to reload';
		if (errorType === 404) {
			errorText = 'Oops! Page not found [404]';
		}
		this._.loader.element.classList.add('hidden');
		UItools.renderIn(UItools.getLink(errorText, '/'), this._.main.element, '', 'error', 'section');
	}

};

// class UISection {
// 	constructor(name, data) {
		
// 	}
// }

export default UI;