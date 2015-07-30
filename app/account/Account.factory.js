(function () {
	'use strict';
	
	var angular = window.angular;
	
	function AccountFactory($http, $q, AppConfig) {
		
		/**
		* Grabs logged-in user's information
		*/
		function getUserInfo() {
			function promiseExecutor(resolve, reject) {
				$http
					.get(AppConfig.apiBaseUrl + 'users/me')
					.then(function (response) {
						resolve(response.data.data);
					}, function (response) {
						reject(response.data);
					});
			}
			
			return $q(promiseExecutor);
		}
		
		return {
			getUserInfo: getUserInfo	
		};
		
	}
	AccountFactory.$inject = ['$http', '$q', 'AppConfig'];
	
	angular
		.module('cublet.account')
		.factory('AccountFactory', AccountFactory);
	
}());