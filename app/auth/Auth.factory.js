(function () {
	'use strict';

	var angular = window.angular,
		_ = window._;

	function AuthFactory($http, $q, $window, $rootScope, 
						  $facebook, AppConfig, AuthStorageFactory) {
		
		var _fbToken,
			_cubletUser;
		
		/**
		* Unsets the logged in user in the current session
		* @private
		*/
		function _unsetUser() {
			AuthStorageFactory.removeAuthToken();
			_fbToken = null;
			_cubletUser = null;
		}
		
		/**
		* Sets the logged in user for the current session
		* @private
		* @param {string} authToken - Authentication Token
		*/
		function _setUser(authToken) {
			if (typeof authToken !== "string") {
				throw new Error("Auth Token must be a string.");
			}
			
			var authTokenContents = authToken.split('.');
			if (authTokenContents.length !== 3) {
				throw new Error("Invalid JSON Web Token.");	
			}
			
			_cubletUser = JSON.parse($window.atob(authTokenContents[1]));	
		}
		
		/**
		* Determines whether a user is logged in or not
		* @returns {boolean} TRUE if a user is logged in, FALSE if not
		*/
		function isLoggedIn() {
			var storedToken = AuthStorageFactory.getAuthToken();
			
			if (_.isPlainObject(_cubletUser)) {
				if ((new Date()).getTime() < _cubletUser.exp * 1000) {
					return true;
				}
				_unsetUser();
			}
			if (storedToken) {
				_setUser(storedToken);
				return true;
			}
			return false;
		}
		
		/**
		* Prevents unauthorized people from going to certain pages
		* Prevents authorized people from going to certain pages
		*/
		function router() {
			$rootScope.$on('$stateChangeStart', function (event, toState) {
				if (toState && toState.data) {
					if (!toState.data.hasOwnProperty('authguard') && 
						isLoggedIn()) {
						event.preventDefault();	
						$state.go('cublet.account.dashboard');
					}
					if (toState.data.authguard === true && !isLoggedIn()) {
						event.preventDefault();
						$state.go('cublet.home');
					}
				}
			});
		}
		
		/**
		* Retrieves the user information provided that an auth token is stored
		* @returns {Object} Promise
		*/
		function getUser() {
			return _.clone(_cubletUser);
		}
		
		/**
		* Adds a user into Cublet
		* @param {Object} signupDetails - name, username, password, email
		* @returns {Object} Promise
		*/
		function signup(signupDetails) {
			function promiseExecutor(resolve, reject) {
				$http
					.post(AppConfig.apiBaseUrl + 'auth/signup', 
								  signupDetails)
					.then(function (response) {
						resolve(response.data);
					}, function (response) {
						reject(response.data);
					});
			}
			
			return $q(promiseExecutor);
		}

		/**
		* Logging in using a username/email and a password
		* @param {Object} loginDetails - useridentifier, userpassword
		* @returns {Object} Promise
		*/
		function legacyLogin(loginDetails) {
			function promiseExecutor(resolve, reject) {
				$http
					.post(AppConfig.apiBaseUrl + 'auth/login/legacy', 
						   loginDetails)
					.then(function (response) {
						_setUser(response.data.data.authToken);
						resolve(response.data.message);
					}, function (response) {
						reject(response.data.message);
					});
			}
			return $q(promiseExecutor);
		}
		
		/**
		* Logs a user in using the Facebook Login
		* @return {Object} Promise
		*/
		function facebookLogin() {
			function promiseExecutor(resolve, reject) {
				$facebook
					.login()
					.then(function (response) {
						if (response.status === "connected") {
							_fbToken = response.authResponse.accessToken;
						
							return $http.post(AppConfig.apiBaseUrl + 
											  'auth/login/facebook', {
								usertoken: _fbToken
							});
						}
						
						throw new Error("You must authorize Cublet to " + 
									   "connect to your Facebook account.");
					})
					.then(function (response) {
						_setUser(response.data.authToken);
						resolve(response.message);
					})
					.catch(function (error) {
						reject(error.message);
					});
			}
			
			return $q(promiseExecutor);
		}
		
		/**
		* Signs a user up for the first time in Cublet if they are using 
		*	Facebook Login for the first time.
		* @param {string} username - Username to sign the Facebook user up
		* @returns {Object} Promise
		*/
		function facebookSignup(username) {
			function promiseExecutor(resolve, reject) {
				if (!username) {
					return reject("No username provided.");	
				}
				if (!_fbToken) {
					return reject("User must be logged in to Facebook.");	
				}
				
				$http
					.post(AppConfig.apiBaseUrl + 'auth/login/facebook', {
						usertoken: _fbToken,
						username: username
					})
					.then(function (response) {
						_setUser(response.data.data.authToken);
						resolve(response.data.message);
					}, function (response) {
						reject(response.data.message);
					});
			}
			
			return $q(promiseExecutor);
		}
		
		/**
		* Logs a logged in user out
		*/
		function logout() {
			_unsetUser();
		}

		return {
			isLoggedIn: isLoggedIn,
			router: router,
			getUser: getUser,
			signup: signup,
			legacyLogin: legacyLogin,
			facebookLogin: facebookLogin,
			facebookSignup: facebookSignup,
			logout: logout
		};

	}
	AuthFactory.$inject = ['$http', '$q', '$window', '$rootScope', 
						   '$facebook', 'AppConfig', 'AuthStorageFactory'];

	angular
		.module('cublet.auth')
		.factory('AuthFactory', AuthFactory);

}());