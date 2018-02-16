// Tools
const tools = {
	// Test if an object (with .name)(needle) is already in the stack
	// If so, return the item in the stack, else return return false
	testDuplicateNamedObjectArray: function(needle, stack) {
		let returnValue = false;
		stack.forEach((item) => {
			if (item.name === needle.name) {
				returnValue = item;
			}
		});
		return returnValue;
	}
};

export default tools;