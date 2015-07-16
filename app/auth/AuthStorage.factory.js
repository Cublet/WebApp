(function () {
	'use strict';

	var angular = window.angular;

	function AuthStorageFactory($window, AppConfig) {
		
		/**
		* Retrieves the stored Authentication Token.
		*/
		function getAuthToken() {
			return $window.localStorage.getItem(AppConfig.tokenName);
		}

		/**
		* Stores the Authentication Token. 
		* @param {string} authToken - Authentication Token to store
		*/
		function setAuthToken(authToken) {
			if (typeof authToken !== "string") {
				throw new Error("authToken must be a string");
			}

			var authTokenContents = authToken.split('.');
			if (authTokenContents.length !== 3) {
				throw new Error("Not a valid JWT auth token");
			}
			
			$window.localStorage.setItem(AppConfig.tokenName, authToken);
		}
		
		/**
		* Removes the Authentication Token.
		*/
		function removeAuthToken() {
			if (getAuthToken()) {
				$window.localStorage.removeItem(AppConfig.tokenName);
			}
		}
		
		return {
			getAuthToken: getAuthToken,
			setAuthToken: setAuthToken,
			removeAuthToken: removeAuthToken
		};
	}
	AuthStorageFactory.$inject = ['$window', 'AppConfig'];

	angular
		.module('cublet.auth')
		.factory('AuthStorageFactory', AuthStorageFactory);

}());