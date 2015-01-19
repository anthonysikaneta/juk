(function () {
  'use strict';

  angular
    .module('juk.services', [])
    .factory('MusicService', MusicService)
    .factory('JukExtra', JukExtra);

  function MusicService ($http) {
    
    var getSongs = function () {
      return $http.get('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=canada&api_key=[APIKEYHERE]&format=json').then(function(response) {
        return response.data.topartists.artist;
      });
    };

    var searchForSong = function (query) {    
      return $http.get('http://localhost:9000/api/songs/search/' + query.replace(' ', '+')).then(function (response){
        return response.data;
      }, function(status){
        console.log(status);
      });
    };

    var searchYouTube = function (query) {
        return $http.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: '[APIKEYHERE]',
                type: 'video',
                maxResults: '20',
                part: 'id,snippet',
                fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
                q: query
            }
        }, function (status) {
            console.log(status);
        }).then(function (response) {
            return response;
        });
    }

    return {
      getAllSongs: function () {
        return getSongs();
      },
      play: function () {
          this.song = this.item.snippet;
      },
      search : function (query) {
        return searchYouTube(query);
      }
    };
  }

  function JukExtra ($http, $q) {

    var currentTrack;

    var getSongs = function () {
      return $http.get('js/songs.json').then(function(response) {
        return response;
      });
    };

    var getFriends = function () {
      return $http.get('http://api.randomuser.me/?gender=female&results=5').then(function(response) {
        return response;
      });
    };

    var getEvents = function () {
      return $http.get('js/events.json').then(function(response) {
        return response;
      });
    };

    var getMenuItems = function () {
      return  [{
        'title': 'All',
        'link': '/all'
      },{
        'title': 'Friends',
        'link': '/friends'
      },{
        'title': 'Songs',
        'link': '/songs'
      },{
        'title': 'DJs',
        'link': '/djs'
      },{
        'title': 'Settings',
        'link': '/settings'
      },{
        'title': 'Parties',
        'link': '/parties'
      }];
    };

    var getLastFM = function () {
      return $http.get('http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&format=json&tag=disco&&api_key=[APIKEYHERE]&cb=http://localhost:9393/#/tab/songs').then(function(response) {
        return response.data.topartists.artist;
      }, function (status) {
        console.log(status);
      });
    };

    var searchBeatsMusic = function () {
      return $http.get('https://partner.api.beatsmusic.com/v1/api/artists?client_id=4nu2cvujwqhxbqvnkpkt7jbs').then(function (response) {
        return response.data;
      }, function (status) {
        console.log(status);
      });
    };

    searchBeatsMusic();

    return {
      all: function() {
        return getSongs();
      },
      authorize: function () {
        return $http.get('https://partner.api.beatsmusic.com/oauth2/authorize').then(function (response) {
          console.log(response);
        }, function (status) {
          console.log(status);
        });
      },
      events: function () {
        return getEvents();
      },
      friends: function () {
        return getFriends();
      },
      get: function() {
        // Simple index lookup
        // return songs[songId];
      },
      getTopSongs: function () {
        return getLastFM();
      },
      menuItems: function() {
        return getMenuItems();
      },
      pause: function() {
        currentTrack.pause();
      },
      stop: function() {
        currentTrack.stop();
      },
      playBeat: function (song) {
        return $http.get('https://partner.api.beatsmusic.com/v1/api/tracks/'+song.id+'/audio?&access_token=[VALID_ACCESS_TOKEN]');
      },
      search : function (query) {
        return searchYouTube(query);
      }
    };
  }
})();