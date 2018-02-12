# WAFS
The course repo for 'Web App From Scratch'  
Contents:
* Code style
* Assignments
* Process

## Code Style
Should you use ESLint, the config file is included.  
Used code style is as following:
* Browser (console)
* ES6 (strict)
* TAB Indentation (Size: 4)
* Single quoted strings
* Semicolon everywhere

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


## Notes & Best practices
### Classes vs. Objects
Classes are usefull when you need to create multiple versions of the same object, or you don't want to allow anything else (in the app scope) to call functions or data within that class without being created (within a reachable scope).

Objects are usefull when you want to have a single object to store the data and/or functions. The cannot be recreated. They can be called from other classes and/or objects within the app scope.  

It is usefull to store an array of classes (or classbased-objects) into an object.

### Single page app with pretty urls
Single page apps with pretty urls need to use the [history api](https://css-tricks.com/using-the-html5-history-api/).  
The project will need to run on a server, and that should be [configured](https://gist.github.com/rambabusaravanan/578df6d2486a32c3e7dc50a4201adca4) to serve the main file from any url.  
By using the "popstate" event, you can catch any history traversion from the browser (using either keyboard or the dedicated buttons). The history.pushstate doesn't fire the popstate event.


## Process
### Wednesday 7-2-2018
Setup the basic structure for the app using ES6 features. Added some basic styles.


## Planning/Todo
- [ ] Data ophalen met AJAX (woensdag)
- [ ] Routie.js of andere router library implementeren (woensdag)
- [ ] DomChanger.js of andere template engine implementeren (woensdag)
- [ ] Data manipuleren met map, filter & reduce (vrijdag) 
- [ ] PWA / Webworker (extra)
- [ ] Create and integrate repo where I can keep basic CSS and JS so I'll build a small library within the minor. Possibly migrate [Vandy.JS](http://js.vandijkstef.nl/vandy.js)
- [ ] Onderzoek
- [ ] Code Review uitvoeren via GitHub (vrijdag)