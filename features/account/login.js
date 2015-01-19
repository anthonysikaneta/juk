(function () {
	'use strict';
    
    var options = {
        'method': 'POST',
        'queryparams': ''
    };

	angular
		.module('juk.account', [])
		.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl ($scope, $http, $window, AccountService) {
		$scope.currentuser = [];
		$scope.getProfile = getProfile;
		$scope.isActive = isActive;
		$scope.master = {};
		$scope.selectedItem = undefined;
		$scope.title = 'LoginCtrl';

	    $scope.reset = function(form) {
	        if (form) {
	            form.$setPristine();
	            form.$setUntouched();
	        }
	        $scope.user = angular.copy($scope.master);
	    };

	    $scope.reset();

	    $scope.login = function (user) {
	        user.grant_type = 'password';
	        $scope.master = angular.copy(user);

	        options = angular.extend({
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	            'data': $.param(user),
	            'url': 'http://localhost/Juk/services/api/account/token'
	        }, options);
	    };

		activate();

		function activate () {
			return getProfile();
		}

		function getProfile () {
			return AccountService.getProfile()
				.then(function (data) {
					$scope.currentuser = data.data;
					return $scope.selectedItem;
				});
		}

		function isActive (item) {
			return !!($scope.selectedItem === item);
		}
	}
})();