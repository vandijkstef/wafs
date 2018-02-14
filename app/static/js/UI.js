import UItools from './vandy.js';
import debug from './debug.js';

const UI = {
	_: {
		nav: {
			data: []
		}
	},
	render: function() {
		debug.log('UI: Render:');
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
		if (!this._.nav.element) {
			this._.nav.element = document.querySelector('nav');
			console.log(8888, this._.nav.element);
		}
		// console.log(9999, UItools.getList());
		console.log(9999, this._.nav.data);
		this._.nav.element.appendChild(UItools.getLinkList(this._.nav.data));
		// UItools.getLinkList(this._.nav.data)
	}
};

export default UI;