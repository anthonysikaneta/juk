'use strict';

angular.module('juk.services')
.factory('PartyService', function ($resource, $q, $http, $rootScope) {

    function PartyGet(config) {
        options = angular.extend({
            'method': 'GET',
            'postdata': null,
            'queryparams': '',
            'url': '/api/parties/'
        }, config || {});

        return $http.get(options).then(function (response) {
            return response;
        });
    }

    function PartyPost (config) {
        options = angular.extend({
            'method': 'POST',
            'postdata': null,
            'queryparams': '',
            'url': '/api/parties/'
        }, config || {});

        return $http(options).then(function (argument) {
            return response;
        });
    }

    return {
        addSong: function (song) {
            return PartyPost({
                'method': 'PUT',
                'url': '/api/parties/songs/'+song.party._id+'/'+song.song._id
            });
        },
        createParty: function (party) {
            return PartyPost({
                'data': party
            });
        },
        deleteParty: function (party) {
            return PartyPost({
                'method': 'POST',
                'url': '/api/parties/delete/',
                'data': party
            });
        },
        getParty: function (party) {
            return Party('/api/parties/'+party.id);
        },
        getPrivateParties: function () {
            return Party('/api/parties/private');
        },
        getPublicParties: function () {
          return Party('/api/parties/public');
      }
    };
});