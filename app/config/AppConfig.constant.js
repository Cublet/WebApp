(function () {
	'use strict';
	
	var angular = window.angular,
		AppConfig;
	
	AppConfig = {
		optimize: true,
		apiBaseUrl: 'http://localhost:7000/api/v1/',
		tokenName: 'CubletAuthToken',
		Facebook: {
			appId: '',
			version: 'v2.3'
		}
	};
	
	angular
		.module('cublet.config')
		.constant('AppConfig', AppConfig);
	
}());