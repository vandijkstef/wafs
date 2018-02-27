// Tools
const tools = {
	// Test if an object (with .name)(needle) is already in the stack
	// If so, return the item in the stack, else return return false
	testDuplicateNamedObjectArray: function(needle, stack, key = 'name') {
		let returnValue = false;
		stack.forEach((item) => {
			if (item[key] === needle[key]) {
				returnValue = item;
			}
		});
		return returnValue;
	},
	catchForm: function(e) {
		e.preventDefault();
		const form = new FormData(e.target);
		const formData = {};
		form.forEach((value, key) => {
			formData[key] = value;
		});
		// return formData;
	}
};

export default tools;