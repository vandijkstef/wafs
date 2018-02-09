(function(){

	//object litteral
	let app = {
		//method
		init: function() {
			routes.init()
		}
	}

	let routes = {
		init: function() {
			let self = this
			window.addEventListener("hashchange", self.getHash)
			
		},
		getHash: function(e) {
			let splitString = e.newURL.split("#")
			let route = splitString[splitString.length - 1]
			sections.toggle(route)
		}
	}

	let sections = {
		toggle: function(route) {
			let start = document.getElementById("start")
			let bestPractices = document.getElementById("best-practice")


			if(route === "start") {
				start.classList.add("show");
				bestPractices.classList.remove("show")
			}else if(route === "best-practice") {
				bestPractices.classList.add("show")
				start.classList.remove("show")
			}

			console.log(route);
		}
	}

	app.init();

})()