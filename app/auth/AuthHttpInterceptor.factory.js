(function () {
	'use strict';
	
	var angular = window.angular;
	
	function AuthHttpInterceptorFactory(AppConfig, AuthStorageFactory) {
		
		/**
		* Request Interceptor
		*/
		function request(config) {
			var token = AuthStorageFactory.getAuthToken();
			if (token && config.url.indexOf(AppConfig.apiBaseUrl) === 0) {
				config.headers.Authorization = 'Bearer ' + token;	
			}
			
			return config;
		}
		
		/**
		* Response Interceptor
		*/
		function response(res) {
			var token = res.data && res.data && res.data.data && 
				res.data.data.authToken;
			if (res.config.url.indexOf(AppConfig.apiBaseUrl) === 0 && token) {
				AuthStorageFactory.setAuthToken(token);
			}
			
			return res;
		}
		
		return {
			request: request,
			response: response
		};
		
	}
	AuthHttpInterceptorFactory.$inject = ['AppConfig', 'AuthStorageFactory'];
	
	angular
		.module('cublet.auth')
		.factory('AuthHttpInterceptorFactory', AuthHttpInterceptorFactory);
	
	
}());