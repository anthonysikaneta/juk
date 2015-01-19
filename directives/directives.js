
angular.module('juk.directives', [])

.filter('capitalize', function () {
  'use strict';

  return function(input) {
    if (input !== 'null') {
      input = input.toLowerCase();
    }
    return input.substring(0,1).toUpperCase() + input.substring(1);
  };
})

.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
})

.directive('ensureUnique', ['$http', function ($http) {
    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function () {
                $http({
                    method: 'POST',
                    url: '/api/check/' + attrs.ensureUnique,
                    data: { 'field': attrs.ensureUnique }
                }).success(function (data, status, headers, cfg) {
                    c.$setValidity('unique', data.isUnique);
                }).error(function (data, status, headers, cfg) {
                    c.$setValidity('unique', false);
                });
            });
        }
    }
}])

.directive('overwriteEmail', function () {
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;

    return {
        require: 'ngModel',
        restrict: '',
        link: function (scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and Angular has added the email validator
            if (ctrl && ctrl.$validators.email) {

                // this will overwrite the default Angular email validator
                ctrl.$validators.email = function (modelValue) {
                    return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                };
            }
        }
    };
})

.directive('multipleSelect', function(PartyService){
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<select ng-model="form" class="selectpicker" ng-options="party.title for party in parties"></select>',
        // templateUrl: '',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope) {
            PartyService.getParties().then(function (parties) {
                $scope.parties = parties.data;
            });
        }
    };
})

.directive('youtube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="position:relative;top:0px;left:0px;"><iframe style="overflow:hidden;" width="100%" height="auto" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        scope.$watch('code', function (youtubeId) {
           if (youtubeId) {
               scope.url = $sce.trustAsResourceUrl('//www.youtube.com/embed/' + youtubeId  + '?autoplay=1');
           }
        });
    }
  };
})

.directive('bootstrap-alert', function(){
    // Runs during compile
    return {
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        replace: true,
        template: '<div class="alert alert-success">' +
                    '<a href="#" class="close" data-dismiss="alert">&times;</a>' +
                    '<strong>Success!</strong> Your message has been sent successfully.' +
                '</div>',
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            //bind alert message based on parameters
        }
    };
})

.directive('audioPlayer', function($rootScope) {
    return {
        restrict: 'E',
        scope: {},
        controller: function($scope, $element) {
            $scope.audio = new Audio();
            $scope.currentNum = 0;

            // tell others to give me my prev/next track (with audio.set message)
            $scope.next = function(){ $rootScope.$broadcast('audio.next'); };
            $scope.prev = function(){ $rootScope.$broadcast('audio.prev'); };

            // tell audio element to play/pause, you can also use $scope.audio.play() or $scope.audio.pause();
            $scope.playpause = function(){ var a = $scope.audio.paused ? $scope.audio.play() : $scope.audio.pause(); };

            // listen for audio-element events, and broadcast stuff
            $scope.audio.addEventListener('play', function(){ $rootScope.$broadcast('audio.play', this); });
            $scope.audio.addEventListener('pause', function(){ $rootScope.$broadcast('audio.pause', this); });
            $scope.audio.addEventListener('timeupdate', function(){ $rootScope.$broadcast('audio.time', this); });
            $scope.audio.addEventListener('ended', function(){ $rootScope.$broadcast('audio.ended', this); $scope.next(); });

            // set track & play it
            $rootScope.$on('audio.set', function(r, file, info, currentNum, totalNum){
                var playing = !$scope.audio.paused;
                $scope.audio.src = file;
                var a = playing ? $scope.audio.play() : $scope.audio.pause();
                $scope.info = info;
                $scope.currentNum = currentNum;
                $scope.totalNum = totalNum;
            });

            // update display of things - makes time-scrub work
            setInterval(function(){ $scope.$apply(); }, 500);
        },

        templateUrl: 'Scripts/client/templates/audioplayer.html'
    };
});

//search title
//get first id and store in local storage
//key = list, value = comma delimited ids
// .directive('ngAutocomplete', function($parse) {
//     return {

//         scope: {
//             details: '=',
//             ngAutocomplete: '=',
//             options: '='
//         },

//         link: function(scope, element, attrs, model) {
//             // See if we have an autosave value
//             // (this will only happen if the page is accidentally refreshed)
//             if (sessionStorage.getItem("autosave")) {
//                 // Restore the contents of the text element
//                 element.value = sessionStorage.getItem("autosave");
//             }

//             // Listen for changes in the text element
//             element.addEventListener("change", function() {
//                 // And save the results into the session storage object
//                 sessionStorage.setItem("autosave", element.value);
//                 $scope.$apply(function () {
//                 console.log(element.val());
//             });
//         }
//     };
// });