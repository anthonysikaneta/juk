(function () {
	'use strict';

	angular
		.module('juk.services', [])
		.factory('AccountService', AccountService);

	function AccountService ($resource) {

		function getProfile () {
			return $http.get('/api/profile')
				.success(function (data, status, headers, config) {
					console.log('yay!');
				})
				.error(function (data, status, headers, config) {
					console.log(status);
				})
				.then(function (response) {
					console.log(response);
			});
		}

		function getSession () {
			return $resource('/api/session/');
		}

		return {
			getSession: getSession,
			getProfile: getProfile
		}
	}
})();
