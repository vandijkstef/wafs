# WAFS
The course repo for 'Web App From Scratch'  
Contents:
* Code style
* Assignments
* Notes & Best practices
* Process
* TODO

Please note; The app will not function unless run through a server, with additional apache config (see "Single page app with pretty urls" in the notes).
The live version is available here: <http://wafs.minor.vandijkstef.nl/>

## Code Style
Should you use ESLint, the config file is included.  
Used code style is as following:
* Browser (console)
* ES6 (strict)
* TAB Indentation (Size: 4)
* Single quoted strings
* Semicolon everywhere

---

## Assignments

### Advantages and disadvantages of JavaScript libraries/frameworks
#### Advantages
* Ease of use
* Saving of development time
* Able to create advanced features easily
* Cross browser consistency
#### Disadvantages
* Bigger page size / Extra HTTP request
* Unused code is usually imported as well
* You don't know what the code is really doing
* More dependencies means more effort in updating, higher risk of incompatibility
#### Used sources


### Advantages and disadvantages of client-side single page web apps
#### Advantages
* Client stays on one page, which helps reducing perceived loading times
#### Disadvantages
* Harder to reach specific information, since there is no specified URL
* The first request will be relatively large.
#### Used sources

---

## Notes & Best practices
### Classes vs. Objects
Classes are usefull when you need to create multiple versions of the same object, or you don't want to allow anything else (in the app scope) to call functions or data within that class without being created (within a reachable scope).

Objects are usefull when you want to have a single object to store the data and/or functions. The cannot be recreated. They can be called from other classes and/or objects within the app scope.  

It is usefull to store an array of classes (or classbased-objects) into an object.

### Single page app with pretty urls
Single page apps with pretty urls need to use the [history api](https://css-tricks.com/using-the-html5-history-api/).  
The project will need to run on a server, and that should be [configured](https://gist.github.com/rambabusaravanan/578df6d2486a32c3e7dc50a4201adca4) to serve the main file from any url.  
By using the "popstate" event, you can catch any history traversion from the browser (using either keyboard or the dedicated buttons). The history.pushstate doesn't fire the popstate event.

---

## Web app docs
The web app will show (meta)data on the CMDA-Minor organisation. Main aim for now is to provide an overview of commits made on the repo's, but could be expanded to show additional metadata

### Components
Several variables are used througout the app, and should exclusively be used in as described below. They are not described any further in the docs.
* appData: The instantiated appData object in the app scope
	* AppData should be passed into functions. Currently some classes keep the link to appData stored, but I'm not sure if I like this pattern.
* route: An (url)address path, as parsed by the router


#### App (App.web.js)
Main app file. This will load/initialize all the required modules, in order:
* AppData
* Router
	* Routes
* UI
Afterwards, it will ask the router to do what it does

#### API | GitAPI (API.js | GitAPI.js) [Class]
Creates a new API. Is extented by GitAPI, currently only to force API server url.

##### Constructor (server)
server: server address [string]

##### callCallback (appData, url, callback) | callPromise (appData, url)
Both functions provide the same functionality, and one should be deprecated in the future.
url: API url, will strip the server address if present 

#### AppData (AppData.js) [Class]
Creates an empty appData object
##### Constructor ();

#### appDataHelper (appDataHelper.js) [Object]
##### store (appData)
Stores the appData, strips irrelevant data without changing the actual appData
##### fetch ()
Creates a new appData object and tries to fill this with the stored data

#### debug (debug.js) [Object]
Used to place permanent logs in the system. Outside of this file, any console.log is regarded as debug and should be deleted.
##### log (data, data2)
Is aware of settings.debug value
data | data2: Log up to two variables [mixed]
##### warn (data)
Place a permanent warning in the app

#### Repo (Repo.js) [Class]
##### Constructor (appData, data, persistant)
data: appData object that will be inserted.
persistant: Will push all the data on the appData, no matter what, used by appDataHelper.fetch()
##### getAllForks (refresh, callback)
refresh: Force fetching of data, even if it's already cached

[MORE IN DEV] Helper functions to fetch data on those repo's

#### Route (Route.js) [Class]
##### Constructor (route, handler, template)
handler: Back-end logic for the route [function]  
template: Template data to pass into UI [In progress] [function]

#### router (router.js) [Object]
Stores and handles routing. Passes the appData and route to the UI. Currently, variables from urls are supported on the second position, and they should defined before any solid urls that could match. Upon expanding the app, this is a great point to improve upon.

##### init ()
Actually doesn't do anything right now. Possibly a good place to call the defined routes instead of receiving them from the appData.
##### catchLinks (appData)
Adds a click handler for every link element in the page. Will prevent browsers from following internal links.
##### go (appData)
Tries to get the correct route from the list of available routes. Currently, also fetches variables from the url.
##### noRoute ()
404-handler
##### add (route, handler, template, menu)
Adds a new Route in the router.
handler: see Route
template: see Route
menu: Menu label, if present add item to main navigation [string] (optional)
##### parseLocation (path)
path: url path to be parsed into route array [string]
##### compareRoute (route, path) 
TODO: change naming for convention
Compares 2 routes, is aware of variables in the url

#### settings (settings.js) [object]
Stores app settings. Client settings should be stored in localStorage

#### tools (tools.js) [object]
##### testDuplicateNamedObjectArray (needle, stack, key)
Tests if an object with property exsist in the stack. Returns the object in the stack if found. (TODO: Can I do this with .find()?)
needle: The new/searched object [object]
stack: The array of (similar)objects to search in [array[object]]
key: Property key in object to search for. Defaults to 'name' [string]

#### UI (UI.js) [object]
*UI if fancy, so we go fancy on our naming conventions.*
TODO: Try to find a general way to update stuff - possibly after rework of UITools
Handles the UI and stores data about it.
_: Data storage, stores non-appData data and the main DOM elements 
##### init ()
Fetches the main elements and renders the navigation
##### render (appData, route)
Renders the page using the template in the route.
##### addNav (name, path)
Adds a menu item object in the data store
name: See "router.add() menu"
##### renderNav ()
Renders the navigation based on the data
##### setApiCalls (calls)
Updates the front end API call counter
calls: The number you wish to display [int | string]
##### clearMain ()
Helper function to destroy all content in main
##### createSection (route)
Create a section for a specific route (TODO: Is this aware of var urls?)

#### UItools
Creates (TODO: and/or updates) the DOM. Functional style templating.  
General variables:
* classes: A string or array of classes to add to the newly created object
* id: A string to set the id of a newly created object
* element: A DOM element
* elementName: Use this to override the default element. Note that additional helper functions are prefered.
##### 


### Flow
---

## Process
### Wednesday 7-2-2018
Setup the basic structure for the app using ES6 features. Added some basic styles.

### Monday 12-2-2018
Redone the basic structure for the new API app. Created API Class, fetched some data, created basic router, everything based on pretty urls/history api. Expanded router to accept variables from urls. Note: Solid urls should be defined before var urls. This could be solved by assigning a score to specifity of the url compared to the mathed route and use the most specific route. Out of scope (for now, maybe).

### Wednesday 14-2-2018
Expanded the app into multiple api calls (backend), implemented a promise version of the API call. Worked a long time on having the right data on the appdata. Had to do API auth to increase limit to 5000/hr instead of 60/hr. Reworked the complete app into modules.

### Friday 16-2-2018
Spend a lot of time on figuring out how I want to do templating. Layed some basics and hopefully found a pattern that is suiting for my requirements. Reviewed Zekkie. Also fixed some bugs regarding persistantce/caching and modularity of the system.

### Saturday 17-2-2018
Did some work on docs and reworked my UI toolkit to be more flexible.

### Monday 19-2-2018
Refactored the code, seperated the routes and all their logic from the app. 


### ...
Lets try some different templating methods using a basic list for the repos including the count of all commits

## Planning/Todo
I like lists
- [ ] Model uittekenen
- [ ] Update title(description?) dynamically
- [ ] Expand research on single page apps
- [ ] PWA / Webworker (extra)

- [ ] Expand router (see notes 12-2)
- [ ] Create folder structure that supports biased/unbiased files