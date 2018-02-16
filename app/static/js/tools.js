// Tools
const tools = {
	// Test if an object (with .name)(needle) is already in the stack
	// If so, return the item in the stack, else return return false
	testDuplicateNamedObjectArray: function(needle, stack) {
		let returnValue = false;
		stack.forEach((item) => {
			console.log(85, item.name);
			console.log(86, needle.name);
			if (item.name === needle.name) {
				console.log('found item', item.name);
				returnValue = item;
			}
		});
		console.log('new item', needle.name);
		return returnValue;
	}
};

export default tools;