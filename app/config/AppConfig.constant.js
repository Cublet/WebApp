(function () {
	'use strict';
	
	var angular = window.angular,
		AppConfig;
	
	AppConfig = {
		optimize: true
	};
	
	angular
		.module('cublet.config')
		.constant('AppConfig', AppConfig);
	
}());