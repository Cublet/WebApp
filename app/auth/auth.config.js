(function () {
	'use strict';
	
	var angular = window.angular;
	
	function config($stateProvider) {
		
		$stateProvider
			.state('cublet.auth', {
				abstract: true,
				url: '/auth',
				template: '<ui-view/>'
			})
			.state('cublet.auth.legacyLogin', {
				url: '/auth/login',
				controller: 'LegacyLoginController',
				templateUrl: '/app/auth/legacyLogin.partial.html'
			})
			.state('cublet.auth.facebookLogin', {
				url: '/auth/facebook',
				controller: 'FacebookLoginController',
				templateUrl: '/app/auth/facebookLogin.partial.html'
			})
			.state('cublet.auth.signup', {
				url: '/auth/signup',
				controller: 'SignupController',
				templateUrl: '/app/auth/signup.partial.html'
			});
		
	}
	config.$inject = ['$stateProvider'];
	
	angular
		.module('cublet.auth')
		.config(config);
	
}());