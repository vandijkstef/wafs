const UItools = {
	////////////// BASE //////////////
	// Create a new DOM element and attach the classes/id's
	createElement: function(classes, id, elementName = 'div') {
		let element = document.createElement(elementName);
		if (id) {
			element.id = id;
		}
		this.addClasses(element, classes);
		return element;
	},
	// Add handler to element
	addHandler: function(element, handler, type = 'click') {
		element.addEventListener(type, handler);
		return element;
	},
	// Add classes to element
	addClasses: function(element, classes) {
		if (classes) {
			if (typeof classes === 'string') {
				try {
					element.classList.add(classes);
				} catch (e) {
					console.warn('Multiple classes should be an array');
				}
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
	////////// BASE HELPERS //////////
	forceArray: function(value) {
		if (!Array.isArray(value)) {
			value = [value];
		}
		return value;
	},
	// Create inline text element and set text
	getText: function(string, classes, id, elementName = 'p') {
		let element = this.createElement(classes, id, elementName);
		element.innerText = string;
		return element;
	},
	// Create A using getText, set path
	getLink: function(text, path, classes, id) {
		let element = this.getText(text, classes, id, 'a');
		element.href = path;
		return element;
	},
	// Create list
	getList: function(listItems, classes, id, type = 'ul') {
		var element = this.createElement(classes, id, type);
		listItems.forEach((listItem) => {
			// TODO: Allow array of strings as well
			element.appendChild(listItem);
		});
		return element;
	},
	// Create list item
	getListItem: function(text, classes, id) {
		var element = this.createElement(classes, id, 'li');
		element.innerText = text;
		return element;
	},
	// Create A in list item
	getLinkListItem: function(text, path, classes, id) {
		var element = this.getListItem(null, classes, id);
		var linkElement = this.getLink(text, path);
		element.appendChild(linkElement);
		return element;
	},
	// getDiv: function(classes, id) == createElement
	///////////// RENDER /////////////
	// Render in container
	render: function(content, container) {
		// TODO: Add position option
		container.appendChild(content);
		return content;
	},
	// Render in a wrapper (block)
	// uses render
	// TODO: Wrap method that doesn't render
	renderIn(content, container, classes, id, elementName = 'div') {
		var element = this.createElement(classes, id, elementName);
		// TODO: Support content as array
		content = this.forceArray(content);
		content.forEach(function(item) {
			element.appendChild(item);
		});
		return this.render(element, container); // returns element
	},
	// Render in an inline element
	// Uses renderDiv
	renderText: function(text, container, classes, id, type = 'p') {
		// TODO: Accept either string as text for a simple P element, or a getText object
		return this.renderIn(text, container, classes, id, type);
	},


	////////////// TEST //////////////
	////////////// TEST //////////////


	// TODO: FORM stuff
};

export default UItools;