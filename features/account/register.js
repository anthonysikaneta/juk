(function () {
	'use strict';

	var options = {
		'method': 'POST',
		'queryparams': '',
	};

	angular
		.module('juk.account', [])
		.controller('RegisterCtrl', RegisterCtrl);

	function RegisterCtrl ($scope, $http, $window, $location) {
		$scope.collection = [];
		$scope.selectedItem = undefined;
		$scope.title = 'RegisterCtrl';

		$scope.register = function (user) {
			options = angular.extend({
				'data': user,
				'url': 'http://localhost/Juk/services/api/users/register'
			}, options);

			return $http(options).error(function () {
			}).then(function (response) {
				$window.location.href = "/Juk/client";
				return response;
			});
		};

		$scope.user = {};
		$scope.errors = {};

		$scope.register = function(form) {
			$scope.submitted = true;

			if(form.$valid) {
            // Auth.createUser({
            //   name: $scope.user.name,
            //   email: $scope.user.email,
            //   password: $scope.user.password
            // })
            // .then( function() {
            //   // Account created, redirect to home
            //   $location.path('/');
            // })
            // .catch( function(err) {
            //   err = err.data;
            //   $scope.errors = {};

            //   // Update validity of form fields that match the mongoose errors
            //   angular.forEach(err.errors, function(error, field) {
            //     form[field].$setValidity('mongoose', false);
            //     $scope.errors[field] = error.message;
            //   });
            // });
			}
		};
	}
})();