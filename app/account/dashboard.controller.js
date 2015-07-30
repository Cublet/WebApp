(function () {
	'use strict';
	
	var angular = window.angular;
	
	function DashboardController($scope, AccountFactory) {
		
		AccountFactory
			.getUserInfo()
			.then(function (data) {
				console.log(data);
			}, function (data) {
			
			});
		
	}
	DashboardController.$inject = ['$scope', 'AccountFactory'];
	
	angular
		.module('cublet.account')
		.controller('DashboardController', DashboardController);
	
}());