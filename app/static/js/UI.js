import UItools from './vandy.js';
import debug from './debug.js';

const UI = {
	_: {
		nav: {
			data: []
		},
		main: {
			sections: []
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
	},
	render: function() {
		debug.log('UI: Render');
		this.renderNav();
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
	renderRepoList: function(repos) {
		repos.forEach((repo) => {
			UItools.renderDiv(`<a href="/repo/${repo.name}">${repo.name}</a>`, this._.main.element, 'repos', repo.name);
		});
	},
	clearMain: function() {
		this._.main.element.innerHTML = '';
	}

};

class UISection {
	constructor(name, data) {
		
	}
}

export default UI;