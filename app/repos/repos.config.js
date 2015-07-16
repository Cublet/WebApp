(function () {
	'use strict';
	
	var angular = window.angular;
	
	function config($stateProvider) {
		
		$stateProvider
			.state('cublet.repos', {
				abstract: true,
				url: '/repos',
				template: '<ui-view/>'
			})
			.state('cublet.repos.list', {
				url: '/all',
				controller: 'ListController',
				templateUrl: '/app/repos/list.partial.html'
			})
			.state('cublet.repos.get', {
				url: '/:id',
				controller: 'GetController',
				templateUrl: '/app/repos/get.partial.html'
			})
			.state('cublet.repos.edit', {
				url: '/:id/edit',
				controller: 'EditController',
				templateUrl: '/app/repos/edit.partial.html',
				data: {
					authguard: true
				}
			});
		
	}
	config.$inject = ['$stateProvider'];
	
	angular
		.module('cublet.repos')
		.config(config);
	
}());