'use strict';

{
	// App settings
	const settings = {
		debug: true
	};

	// Debug helper - Splits (temporary) console.logs from solid logs
	const debug = {
		log: function(data) {
			if (settings.debug) {
				console.log(data);
			}
		}
	};

	// App
	class App {
		constructor() {
			this.init();
		}

		// Called by constructor
		init() {
			debug.log('Init App');
			this.setSections();
			routes.init();
		}

		// Fetches the available sections from the DOM
		setSections() {
			debug.log('Setting menu');
			document.querySelectorAll('section').forEach(function(section) {
				new Section(section);
			});
		}
	}

	// Section class - Contains information about the section and creates and stores the menu item
	class Section {
		constructor(section) {
			this.section = section;
			this.menu = this.addMenu(section);
			viewer.sections.push(this);
		}

		// Adds the section into the menu - Called by the constructor
		addMenu(section) {
			const nav = document.querySelector('nav ul');
			const hash = section.id;
			const name = section.querySelector('h1').innerText;
			const li = document.createElement('li');
			const a = document.createElement('a');

			a.href = '#' + hash;
			a.innerText = name;
			li.appendChild(a);
			nav.appendChild(li);

			return li;
		}

		// Hide the section and update the menu item
		hide() {
			this.section.classList.add('hidden');
			this.menu.classList.remove('active');
		}

		// Show the section and update the menu item
		show() {
			this.section.classList.remove('hidden');
			this.menu.classList.add('active');
		}
	}

	// Simply sets up the eventlistener and makes sure the app renders a page
	const routes = {
		init() {
			debug.log('Init routes');
			window.addEventListener('hashchange', function() {
				viewer.setTo(window.location.hash);
			});
			viewer.setTo(window.location.hash || 'start');
		}
	};

	// Controls the section display on the larger scale
	const viewer = {
		sections: [],
		setTo: function(hash) {
			hash = hash.replace('#', '');
			debug.log('Setting to ' + hash);

			this.sections.forEach(function(section) {
				if (section.section.id !== hash) {
					section.hide();
				} else {
					section.show();
				}
			});
		}
	};

	window.addEventListener('DOMContentLoaded', function() {
		new App();
	});
}
