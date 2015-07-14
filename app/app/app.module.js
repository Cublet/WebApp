(function () {
	'use strict';

	var angular = window.angular;

	angular
		.module('cublet', ['ui.router', 'cublet.account', 'cublet.auth', 
						   'cublet.forums', 'cublet.repos', 'cublet.config', 
						   'cublet.users']);

}());