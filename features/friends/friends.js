(function () {
	'use strict';

	angular
		.module('juk.friends', [])
		.controller('FriendsCtrl', FriendsCtrl);

	function FriendsCtrl ($scope, JukExtra) {
		$scope.getData = getData;
		$scope.isActive = isActive;
		$scope.friends = [];
		$scope.selectedItem = undefined;
		$scope.title = 'FriendsCtrl';

		activate();

		$scope.onRefresh = function () {
			getFriends();
		};

		function activate () {
			return getFriends();
		}

		function getFriends() {
			return JukExtra.friends()
				.then(function (friends) {
					$scope.friends = friends.data.results;
					//Trigger fresh complete
					$scope.$broadcast('scroll.refreshComplete');
				});
		}

		function isActive (item) {
			return !!($scope.selectedItem === item);
		}
	}
})();