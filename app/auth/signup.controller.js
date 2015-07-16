(function () {
	'use strict';
	
	var angular = window.angular;
	
	function SignupController($scope, AuthFactory) {
		$scope.signupErrors = {};
		
		$scope.legacySignup = function legacySignup() {
			$scope.signupErrors = {};
			
			AuthFactory
				.signup({
					name: $scope.user.name,
					username: $scope.user.username,
					email: $scope.user.email,
					password: $scope.user.password
				})
				.then(function (successResponse) {
					$scope.signupForm.$setPristine();
					$scope.signupForm.$setUntouched();
					$scope.user = {};
				}, function (errorResponse) {
					$scope.signupErrors = errorResponse.data;
				});
		};
		
		$scope.facebookSignup = function facebookSignup() {
			
		};
		
		$scope.showWarning = function showWarning() {
			return ($scope.signupForm.$submitted && 
					$scope.signupForm.$invalid) || 
				Object.keys($scope.signupErrors).length > 0;
		};
		$scope.showSuccess = function showSuccess() {
			return ($scope.signupForm.$submitted &&	
					$scope.signupForm.$valid) && 
				Object.keys($scope.signupErrors).length === 0;
		};
		
		$scope.validate = function validate(inputName) {
			return {
				'has-error': $scope.signupForm[inputName].$touched && 
				$scope.signupForm[inputName].$invalid
			};
		};
		
	}
	SignupController.$inject = ['$scope', 'AuthFactory'];
	
	angular
		.module('cublet.auth')
		.controller('SignupController', SignupController);
	
}());