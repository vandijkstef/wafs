'use strict';
const vandy = {};
vandy.UI = {
	addClasses: function(element, classes) {
		if (classes) {
			if (typeof classes === 'string') {
				element.classList.add(classes);
				return element;
			} else if (classes.length > 0) {
				classes.forEach(function(cl) {
					element.classList.add(cl);
				});
				return element;
			}
		}
		return element;
	},
	getText: function() {
		var el = document.createElement('p');
		return el;
	},
	renderText: function(string, container) {
		var el = this.getText();
		el.innerHTML = string;
		container.appendChild(el);
	},
	getDiv: function(classes, id) {
		var el = document.createElement('div');
		el = vandy.UI.addClasses(el, classes);
		if (id) {
			el.id = id;
		}
		return el;
	},
	renderDiv: function(content, container, classes, id) {
		var div = this.getDiv(classes, id);
		div.innerHTML = content;
		container.appendChild(div);
		return div;
	},
	getList: function(items) {
		var ul = document.createElement('ul');
		items.forEach(function(item) {
			var el = document.createElement('li');
			el.innerHTML = item;
			ul.appendChild(el);
		});
		return ul;
	},
	getForm: function(name, action, method) {
		var form = document.createElement('form');
		form.id = name;
		form.name = name;
		form.action = action;
		form.method = method;
		return form;
	},
	renderForm: function(container, name, action = '#', method = 'post') {
		var form = this.getForm(name, action, method);
		container.appendChild(form);
		return form;
	},
	getField: function(name, value = null, type = 'text') {
		var input = document.createElement('input');
		input.name = name;
		input.type = type;
		if (type === 'checkbox' || type === 'radio') {
			input.checked = value;
		} else {
			input.value = value;
		}
		return input;
	}
};
