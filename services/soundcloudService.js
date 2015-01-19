(function (SC) {
	'use strict';

	SC = SC || {};

	SC.initialize({
		client_id: 'APIKEYHERE'
	});

	angular
		.module('juk.services')
		.factory('SoundcloudService', SoundcloudService);

	function SoundcloudService ($http, $q) {

		function addSongs (songs) {
			SC.connect(function() {
				SC.get('/me/playlists', { limit: 1 }, function(playlist) {
					SC.put(playlist.uri, { playlist: { tracks: tracks } });
				});
			});
		}

		function createPlaylist (title, songs) {
			SC.connect(function() {
				songs.map(function(id) { return { id: id } });
				SC.post('/playlists', {
					playlist: { title: title, tracks: tracks }
				});
			});
		}

		function playSong (track_url) {
			var deferred = $q.defer();
			SC.oEmbed(track_url, { auto_play: true }, function(oEmbed) {
				deferred.resolve(oEmbed);
			});

			return deferred.promise;
		}

		function searchByGenre (genre) {
			// find all tracks with the genre 'punk' that have a tempo greater than 100 bpm.
			SC.get('/tracks', { genres: genre, bpm: { from: 100 } }, function(tracks) {
			  console.log(tracks);
			});
		}

		function searchSoundcloud (query) {
			var deferred = $q.defer();
			// find all sounds of buskers licensed under 'creative commons share alike'
			SC.get('/tracks', { q: query }, function(tracks) {
			  deferred.resolve(tracks);
			});
			
			return deferred.promise;
		}

		return {
			play: function (song) {
				return playSong(song.uri);
			},
			search: function (query) {
				return searchSoundcloud(query);
			}
		}
	}
})(SC);