const UItools = {
	////////////// BASE //////////////
	createElement: function(classes, id, elementName = 'div') {
		// Create a new DOM element and attach the classes/id's
		console.log(classes, id, elementName);
	},
	addHandler: function(element, handler) {
		// Add handler to element
		console.log(element, handler);
	},
	addClasses: function(element, classes) {
		// Add classes to element
		console.log(element, classes);
	},
	////////// BASE HELPERS //////////
	getText: function(string, classes, id, elementName = 'p') {
		// Create P and set text
		console.log(string, classes, id, elementName);
	},
	getLink: function(text, path, classes, id) {
		// Create A using getText, set path
		console.log(text, path, classes, id);
	},
	getList: function(items, classes, id, type = 'ul') {
		// Create list
		console.log(items, classes, id, type);
	},
	// getDiv: function(classes, id) == createElement
	///////////// RENDER /////////////
	// Render in container
	render: function(content, container) {
		// TODO: Add position option
		console.log(content, container);
	},
	// Render in a wrapper (block)
	// uses render
	renderIn(content, container, classes, id, elementName = 'div') {		
		// Content will always be parsed into an array
		// Pukes out the content in a wrapper
		// Classes, id and elementName define that wrapper
		console.log(content, container, classes, id, elementName);
	},
	// Render in an inline element
	// Uses renderDiv
	renderText: function(text, container) {
		// Accept either string as text for a simple P element, or a getText object
		console.log(text, container);
	},


	////////////// TEST //////////////
	////////////// TEST //////////////


	// TODO: FORM stuff
};

export default UItools;