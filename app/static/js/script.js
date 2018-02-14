(function() {

	let app = {
		init: function() {
			guacamole.router.init()
			console.log("test")
		},config: {
			data: []

		}
	}

	let guacamole = {
		render: function(list) {
			let body = window.document.body
			template = "<div><h1>{{title}}</h1><img src='{{image}}'/></div>";
			

			let renderList = "";

			list.map(function(i, data) {
				body.innerHTML += `
				<div>
					<h1>${i.title}</h1>
					<img src="${i.images.hidpi}" />
					<div>
						<div>
							<h2>Views:</h2>
							<p>${i.views_count}</p>
						</div>
						<div>
							<h2>Likes:</h2>
							<p>${i.likes_count}</p>
						</div>

						<div>
							${i.tags.map(function(d) {
								return `<a href="#tags/${d}">${d}</a>`
							})}
						</div>
					</div>
				</div>
				`
			})

			
		},

		router: {
			init: function() {
				
			},
			config: function(config) {
				console.log(typeof config);
				if(typeof config !== 'object') {
					throw new Error("Give me something to work with idiot. An object perhaps?");
				}else {

				}
			}

		}
	}

	let api = {
		fetch: function(url, method, async) {
			return new Promise(function(resolve, reject) {
					let xhttp = new XMLHttpRequest()
					xhttp.onreadystatechange = function() {
						if(xhttp.readyState === 4 && xhttp.status >= 200 && xhttp.status < 400) {
							let parsedData = JSON.parse(xhttp.responseText)
							resolve(parsedData)
						}else if(xhttp.status >= 400) {
							reject(xhttp.status)
						}
					}
					xhttp.open(method, url, async)
					xhttp.send()
			})
		}
	}

	api.fetch("https://api.dribbble.com/v1/shots/?access_token=c5312519011b8c727842737d8bdf60cedc9bf0f3b0cde84875602764160dcf55&per_page=10","GET", true)
	.then(function(response) {
		console.log(response)
		guacamole.render(response)
	})
	.catch(function(e) {
		console.log(e)
	})
	
	app.init()

})()



/*(function(){

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
*/