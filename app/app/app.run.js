(function () {
	'use strict';
	
	var angular = window.angular;
	
	function run($state, $timeout, AuthFactory) {
		AuthFactory.router();
		
		$timeout(function () {
			if (AuthFactory.isLoggedIn()) {
				$state.go('cublet.account.dashboard');
			} else {
				$state.go('cublet.home');	
			}
		});
	}
	run.$inject = ['$state', '$timeout', 'AuthFactory'];
	
	angular
		.module('cublet')
		.run(run);
	
}());