(function () {
	'use strict';
	
	var angular = window.angular;

	function config($stateProvider, $compileProvider, $httpProvider, 
					 AppConfig) {

		$stateProvider.state('cublet', {
			abstract: true,
			templateUrl: 'app/app/app.html',
			url: '',
			controller: 'AppController'
		});
		
		$compileProvider.debugInfoEnabled(AppConfig.optimize);
		
		$httpProvider.useApplyAsync(AppConfig.optimize);
		
	}
	config.$inject = ['$stateProvider', '$compileProvider', '$httpProvider', 
					  'AppConfig'];
	
	angular
		.module('cublet')
		.config(config);

}());