(function () {
	'use strict';
	
	var angular = window.angular;
	
	angular
		.module('cublet.auth', ['ui.router', 'ngFacebook', 'cublet.config']);
	
}());