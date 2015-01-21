(function () {
	'use strict';

	angular
		.module('juk.music', [])
		.controller('SongsCtrl', SongsCtrl)
		.controller('SongDetailCtrl', SongDetailCtrl);

	function SongsCtrl ($scope, $modal, $location, JukExtra) {
		$scope.open = function (data) {

			var modalInstance = $modal.open({
				templateUrl: 'videoPlayer.html',
				controller: function ($modalInstance, $sce, PartyService) {

					$scope.videoId = data.youtube.id;

					PartyService.getPublicParties().then(function (parties) {
						$scope.myForm = {};
						$scope.myForm.parties = parties.data;
						PartyService.getPrivateParties().then(function (parties) {
							angular.extend($scope.myForm.parties, parties.data);
						});
					});

					$scope.addSong = function () {
						PartyService.addSong({
							song: data,
							party: $scope.myForm.party[0]
						});
					};

					$scope.create = function () {
						$modalInstance.close($scope.myForm.party[0]);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				}
			});

			modalInstance.result.then(function (party) {
				console.log(party);
			});
		};
	}

	function SongDetailCtrl ($scope, $routeParams, JukExtra) {
		/* jshint validthis: true */
		var vm = this;

		$scope.getSong = getSong;
		$scope.isActive = isActive;
		$scope.collection = [];
		$scope.selectedItem = undefined;
		$scope.title = 'SongDetailCtrl';

		activate();

		function activate () {
			return getSong();
		}

		function getSong () {
			return JukExtra.get($routeParams.id)
			.then(function (data) {
				$scope.song = data.data;
				return $scope.selectedItem;
			});
		}

		function isActive (item) {
			return !!($scope.selectedItem === item);
		}
	}
})();