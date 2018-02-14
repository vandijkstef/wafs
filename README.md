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
TODO: ...

---

## Process
### Wednesday 7-2-2018
Setup the basic structure for the app using ES6 features. Added some basic styles.

### Monday 12-2-2018
Redone the basic structure for the new API app. Created API Class, fetched some data, created basic router, everything based on pretty urls/history api. Expanded router to accept variables from urls. Note: Solid urls should be defined before var urls. This could be solved by assigning a score to specifity of the url compared to the mathed route and use the most specific route. Out of scope (for now, maybe).

### Wednesday..
Lets try some different templating methods using a basic list for the repos including the count of all commits

## Planning/Todo
I like lists
- [ ] DomChanger.js of andere template engine implementeren (woensdag)
- [ ] Data manipuleren met map, filter & reduce (vrijdag) 
- [ ] PWA / Webworker (extra)
- [ ] Create and integrate repo where I can keep basic CSS and JS so I'll build a small library within the minor. Possibly migrate [Vandy.JS](http://js.vandijkstef.nl/vandy.js)
- [ ] Onderzoek
- [ ] Code Review uitvoeren via GitHub (vrijdag)
- [ ] Expand router (see notes 12-2)