(function () {
	'use strict';
	
	var angular = window.angular;

	function config($stateProvider, $compileProvider, $httpProvider, 
					 $urlRouterProvider, AppConfig) {

		$stateProvider
			.state('cublet', {
				abstract: true,
				templateUrl: 'app/app/app.html',
				url: '',
				controller: 'AppController'
			})
			.state('cublet.home', {
				url: '/home',
				templateUrl: 'app/app/home.html'
			});
		
		$compileProvider.debugInfoEnabled(AppConfig.optimize);
		$httpProvider.useApplyAsync(AppConfig.optimize);
		$urlRouterProvider.otherwise('/home');
		
	}
	config.$inject = ['$stateProvider', '$compileProvider', '$httpProvider', 
					  '$urlRouterProvider', 'AppConfig'];
	
	angular
		.module('cublet')
		.config(config);

}());