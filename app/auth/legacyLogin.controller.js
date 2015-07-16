(function () {
	'use strict';
	
	var angular = window.angular;
	
	function LegacyLoginController($scope, $state, AuthFactory) {
		
		$scope.loginErrors = null;
		
		$scope.legacyLogin = function legacyLogin() {
			$scope.loginErrors = null;
			
			AuthFactory
				.legacyLogin({
					useridentifier: $scope.user.useridentifier,
					userpassword: $scope.user.userpassword
				}).then(function (message) {
					$state.go('cublet.account.dashboard');
				}, function (message) {
					$scope.loginErrors = message;
				});
		};
		
		$scope.validate = function validate(inputName) {
			return {
				'has-error': $scope.loginForm[inputName].$touched && 
				$scope.loginForm[inputName].$invalid	
			};
		};
		$scope.showError = function showError() {
			if ($scope.loginForm.$submitted && $scope.loginErrors) {
				return true;	
			}
			return false;
		};
		
	}
	LegacyLoginController.$inject = ['$scope', '$state', 'AuthFactory'];
	
	angular
		.module('cublet.auth')
		.controller('LegacyLoginController', LegacyLoginController);
	
}());