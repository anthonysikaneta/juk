(function () {
	'use strict';

	angular
		.module('juk.musicsearch', [])
		.controller('SearchCtrl', SearchCtrl);

	function SearchCtrl ($scope, $modal, MusicService, localStorageService, SoundcloudService) {
		$scope.result = [];
		$scope.selectedItem = undefined;
		$scope.title = 'SearchCtrl';

		angular.extend($scope, MusicService);

		$scope.snippet = {};
		$scope.title = 'Song title//';
		$scope.artist = 'Artist';
		$scope.layout = 'list';

		Array.prototype.getIndexBy = function (name, value) {
			for (var i = 0; i < this.length; i++) {
				if (this[i][name] == value) {
					return i;
				}
			}
		};

		$scope.clear = clearList;
		$scope.open = open;
		$scope.search = search;

		function open(song) {
			// $scope.next = $scope.result[$scope.result.getIndexBy("id", $scope.song.id) + 1];
			if (song.uri) {
				SoundcloudService.play(song).then(function (oEmbed) {
					angular
					.element(document.getElementById('player-area'))[0]
					.innerHTML = oEmbed.html;
				});
			} else {
				$scope.song = song.snippet;
				$scope.song.id = song.id;
			}
		}

		function clearList () {
			$scope.songs = [];
		}

		function search() {
			if (!$scope.keywords || $scope.keywords === '') { return; }
			MusicService.search($scope.keywords).then(function (response) {
				$scope.result = response.data ? response.data.items : response;
			});
		}
	}
})();