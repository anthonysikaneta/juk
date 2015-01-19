(function () {
    'use strict';

    var options = {
        'method': 'POST',
        'queryparams': ''
    };

    angular
        .module('juk.parties', [])
        .controller('PartiesCtrl', PartiesCtrl);

    function PartiesCtrl ($scope, $modal, $location, $routeParams, PartyService) {
        $scope.getPublicParties = getPublicParties;
        $scope.isActive = isActive;
        $scope.parties = [];
        $scope.selectedItem = undefined;
        $scope.title = 'PartiesCtrl';

        $scope.parties = [];

        PartyService.getPublicParties().then(function (parties) {
            $scope.parties = parties.data;
            PartyService.getPrivateParties().then(function (parties) {
                angular.extend($scope.parties, parties.data);
            });
        });

        $scope.delete = function (id) {
            PartyService.deleteParty(id).then(function (response) {
                console.log('deleted' + response);
            });
        };

        $scope.goToDetails = function (party) {
            $scope.party = {};
            PartyService.getParty({ id: $routeParams.id }, function (party) {
                $scope.party = party;
            });
            $location.path('/parties/' + party._id);
        };

        activate();

        function activate () {
            return getPublicParties();
        }

        function getPublicParties () {
            return service.getPublicParties()
                .then(function (data) {
                    $scope.parties = data.data;
                    return $scope.selectedItem;
                });
        }

        function isActive (item) {
            return !!($scope.selectedItem === item);
        }
    }
})();