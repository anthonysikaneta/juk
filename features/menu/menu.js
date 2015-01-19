(function () {
	'use strict';

	angular
		.module('juk.menu', [])
		.controller('MenuCtrl', MenuCtrl);

	function MenuCtrl ($scope, JukExtra) {
		$scope.getMenu = getMenu;
		$scope.isActive = isActive;
		$scope.menuItems = [];
		$scope.selectedItem = undefined;
		$scope.title = 'MenuCtrl';

		activate();

		function activate () {
			return getMenu();
		}

		function getMenu () {
			$scope.menuItems = JukExtra.menuItems();
		}

		function isActive (item) {
			return !!($scope.selectedItem === item);
		}
	}
})();