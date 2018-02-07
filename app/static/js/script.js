'use strict';

{
	const settings = {
		debug: true,
		test: 'test'
	};

	const debug = {
		log: function(data) {
			if (settings.debug) {
				console.log(data);
			}
		}
	};

	class App {
		constructor() {
			this.smth = 9;
			this.init();
		}

		init() {
			debug.log('Init App');
			this.setMenu();
			routes.init();
		}

		setMenu() {
			debug.log('Setting menu');
			const sections = document.querySelectorAll('section');
			const nav = document.querySelector('nav ul');
			sections.forEach(function(section) {
				const hash = section.id;
				const name = section.querySelector('h1').innerText;
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = '#' + hash;
				a.innerText = name;
				li.appendChild(a);
				nav.appendChild(li);
			});
		}
	}

	const routes = {
		init() {
			debug.log('Init routes');
			window.addEventListener('hashchange', function() {
				viewer.setTo(window.location.hash);
			});
			document.querySelector('nav a').click();
		}
	};

	const viewer = {
		active: null,
		sections: document.querySelectorAll('sections'),
		setTo: function(hash) {
			console.log(hash);
			console.log(this.active);
			if (hash !== this.active) {
				debug.log('Setting to ' + hash);
				this.active = hash;
				this.sections.forEach(function(section) {
					if (section.id !== hash) {
						console.log(section);
						section.classList.add('hidden');
					}
				});
			}
		}
	};
	
	window.addEventListener('DOMContentLoaded', function() {
		new App();
	});
}