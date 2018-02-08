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


## Process
### Wednesday 7-2-2018
Setup the basic structure for the app using ES6 features. Added some basic styles.


## Planning/Todo
- [ ] Create and integrate repo where I can keep basic CSS and JS so I'll build a small library within the minor. Possibly migrate [Vandy.JS](http://js.vandijkstef.nl/vandy.js)

