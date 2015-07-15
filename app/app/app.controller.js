(function () {
	'use strict';
	
	var angular = window.angular;
	
	function AppController(AuthFactory) {
		
	}
	AppController.$inject = ['AuthFactory'];
	
	angular
		.module('cublet')
		.controller('AppController', AppController);
	
	
}());