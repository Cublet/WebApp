(function () {
	'use strict';
	
	var angular = window.angular;
	
	function config($stateProvider, $httpProvider, $facebookProvider, 
					AppConfig) {
		
		$stateProvider
			.state('cublet.auth', {
				abstract: true,
				url: '/auth',
				template: '<ui-view/>'
			})
			.state('cublet.auth.legacyLogin', {
				url: '/email',
				controller: 'LegacyLoginController',
				templateUrl: '/app/auth/legacyLogin.partial.html'
			})
			.state('cublet.auth.facebookLogin', {
				url: '/facebook',
				controller: 'FacebookLoginController'
			})
			.state('cublet.auth.signup', {
				url: '/signup',
				controller: 'SignupController',
				templateUrl: '/app/auth/signup.partial.html'
			});
		
		$httpProvider.interceptors.push('AuthHttpInterceptorFactory');
		
		$httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
		
		$facebookProvider.setAppId(AppConfig.Facebook.appId);
		$facebookProvider.setVersion(AppConfig.Facebook.version);
		$facebookProvider.setPermissions("email");
		
	}
	config.$inject = ['$stateProvider', '$httpProvider', '$facebookProvider',
					 'AppConfig'];
	
	angular
		.module('cublet.auth')
		.config(config);
	
}());