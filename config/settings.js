(function () {
	'use strict';

	angular
		.module('juk.settings', [])
		.controller('SettingsCtrl', SettingsCtrl);

	SettingsCtrl.$inject = ['User', 'Auth'];

	function SettingsCtrl ($scope, User, Auth) {
		$scope.title = 'SettingsCtrl';
		$scope.errors = {};

		$scope.changePassword = function(form) {
			$scope.submitted = true;

			if(form.$valid) {
				Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
					.then( function() {
						$scope.message = 'Password successfully changed.';
					})
					.catch( function() {
						form.password.$setValidity('mongoose', false);
						$scope.errors.other = 'Incorrect password';
					});
			}
		};
	}
})();