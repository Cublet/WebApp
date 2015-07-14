(function () {
	'use strict';
	
	var angular = window.angular;
	
	function config($stateProvider) {
		
		$stateProvider
			.state('cublet.users', {
				abstract: true,
				url: '/users',
				template: '<ui-view/>'
			})
			.state('cublet.users.list', {
				url: '/all',
				controller: 'ListController',
				templateUrl: 'app/users/list.partial.html'
			})
			.state('cublet.users.get', {
				url: '/:id',
				controller: 'GetController',
				templateUrl: 'app/users/get.partial.html'
			})
			.state('cublet.users.edit', {
				url: '/:id/edit',
				controller: 'EditController',
				templateUrl: 'app/users/edit.partial.html'
			});
		
	}
	config.$inject = ['$stateProvider'];
	
	angular
		.module('cublet.users')
		.config(config);
	
}());