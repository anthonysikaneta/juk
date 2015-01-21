(function () {
	'use strict';

	var defaults = {
		key: 'APIKEYHERE',
		type: 'video',
		maxResults: '20',
		part: 'id,snippet',
		fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
		q: 'query'
	};

	angular
		.module('juk.services')
		.factory('GoogleService', GoogleService);

	function GoogleService ($http) {
		function Search (options) {
			return $http.get('https://www.googleapis.com/youtube/v3/search', {
				params: (options || defaults)
			}, function (status) {
				console.log(status);
			}).then(function (response) {
				return response;
			});
		}

		return {
			search: Search
		};
	}
})();