(function () {
	'use strict';
	
	var angular = window.angular;
	
	function config($stateProvider) {
		
		$stateProvider
			.state('cublet.forums', {
				abstract: true,
				url: '/forums',
				template: '<ui-view/>'
			})
			.state('cublet.forums.list', {
				url: '/all',
				controller: 'ListController',
				templateUrl: 'app/forums/list.partial.html'
			})
			.state('cublet.forums.get', {
				url: '/:id',
				controller: 'GetController',
				templateUrl: 'app/forums/get.partial.html'
			})
			.state('cublet.forums.edit', {
				url: '/:id/edit',
				controller: 'EditController',
				templateUrl: 'app/forums/edit.partial.html',
				data: {
					authguard: true
				}
			});
		
	}
	config.$inject = ['$stateProvider'];
	
	angular
		.module('cublet.forums')
		.config(config);
	
}());