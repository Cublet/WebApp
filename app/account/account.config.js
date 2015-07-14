(function () {
	'use strict';
	
	var angular = window.angular;
	
	function config($stateProvider) {
		
		$stateProvider
			.state('cublet.account', {
				abstract: true,
				url: '/account'
			})
			.state('cublet.account.edit', {
				url: '/edit',
				controller: 'EditController',
				templateUrl: '/app/account/edit.partial.html'
			})
			.state('cublet.account.dashboard', {
				url: '/dashboard',
				controller: 'DashboardController',
				templateUrl: '/app/account/dashboard.partial.html'
			});
		
	}
	config.$inject = ['$stateProvider'];
	
	angular
		.module('cublet.account')
		.config(config);
	
}());