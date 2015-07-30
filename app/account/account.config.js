(function () {
	'use strict';
	
	var angular = window.angular;
	
	function config($stateProvider) {
		
		$stateProvider
			.state('cublet.account', {
				abstract: true,
				url: '/account',
				template: '<ui-view/>'
			})
			.state('cublet.account.edit', {
				url: '/edit',
				controller: 'EditController',
				templateUrl: '/app/account/edit.partial.html',
				data: {
					authguard: true
				}
			})
			.state('cublet.account.dashboard', {
				url: '/dashboard',
				controller: 'DashboardController',
				templateUrl: '/app/account/dashboard.partial.html',
				data: {
					authguard: true
				}
			});
		
	}
	config.$inject = ['$stateProvider'];
	
	angular
		.module('cublet.account')
		.config(config);
	
}());