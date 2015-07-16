(function () {
	'use strict';
	
	var angular = window.angular;
	
	function AppController($scope, $state, AuthFactory) {
		
		$scope.isLoggedIn = AuthFactory.isLoggedIn;
		
		$scope.user = AuthFactory.getUser();
		
		$scope.logout = function logout() {
			AuthFactory.logout();
			$state.go('cublet.home');
		};
		
	}
	AppController.$inject = ['$scope', '$state', 'AuthFactory'];
	
	angular
		.module('cublet')
		.controller('AppController', AppController);
	
	
}());