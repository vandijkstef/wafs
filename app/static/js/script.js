(function() {

	let templates = {
		tags: function(d) {

		},
		detail: function(d) {

		}
	}

	let app = {
		init: function() {
			guacamole.router.init()
			guacamole.router.config([ // Array contains 2 objects and 1 item, are you sure you don't want 2 array items containing 1 object each?
				{
					route: "#/tags/:name",
					template: templates.tags
				},
				{
					route: "#/detail/:id",
					template: templates.detail
				}
			])
			api.fetch("https://api.dribbble.com/v1/shots/?access_token=c5312519011b8c727842737d8bdf60cedc9bf0f3b0cde84875602764160dcf55&per_page=100","GET", true)
			.then(function(response) {
				app.config.data = response
				guacamole.render(response)
			})
			.catch(function(e) {
				console.warn(e)
			})
		},
		config: {
			data: []
		}
	}

	let guacamole = {
		render: function(list) {
			let body = window.document.body
			let template = ``;

			list.map(function(i) {
				template += `
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
								return `<a href="#/tags/${d}">${d}</a>`
							})}
						</div>
					</div>
				</div>
				`
			})
			body.innerHTML = template;
			
		},

		router: {

			init: function() {
				window.addEventListener("hashchange", guacamole.router.checkUrl, true)
			},
			checkUrl: function(e) {
				let url = e.newURL
				let link = url.match("\#\/[^/#]+")
				guacamole.router.route(link[0])
			},
			routes: [],
			config: function(routes) {
				guacamole.router.routes = routes
			},
			route: function(url) {
				if(guacamole.router.routes.includes(url)) {

				}
			}


		}
	}

	let api = {
		fetch: function(url, method, async) { // Suggest to use method, url, async to conform with xhttp.open variable order
			return new Promise(function(resolve, reject) {
					let xhttp = new XMLHttpRequest()
					xhttp.onreadystatechange = function() {
						if(xhttp.readyState === 4 && xhttp.status >= 200 && xhttp.status < 400) {
							let parsedData = JSON.parse(xhttp.responseText)
							resolve(parsedData)
						} else if(xhttp.status >= 400) {
							reject(xhttp.status)
						}
					}
					xhttp.open(method, url, async)
					xhttp.send()
			})
		}
	}
	
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