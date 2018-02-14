'use strict';

document.addEventListener('DOMContentLoaded', function() {

	let promiseDemo = function(vari) {
		let promise = new Promise(function(resolve, reject){
			const API = new XMLHttpRequest();
			API.open('GET', 'https://api.github.com/repos/niyorn/wafs/contributors');
			API.setRequestHeader('Content-Type', 'application/json');
			API.onload = function() {
				console.log('got api');
				if (API.status === 200) {
					console.log('is 200');
					resolve('got here: ' + vari);
				} else {
					reject('oops');
				}
			};
			// let test;
			// // console.log(document.querySelector('body'));
			// // document.body.addEventListener('click', function(){
			// test = {
			// 	naam: 'alex',
			// 	test: vari
			// };
			// // });
			// resolve(test);
		});
		return promise;
	};

	promiseDemo('testing')
		.then(function(data){
			console.log(data);
			return data ;
		})
		.then(function(data){
			console.log(data);
		})
		.catch();

});