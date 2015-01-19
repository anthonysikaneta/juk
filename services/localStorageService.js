angular.module('juk')

.factory('localStorageService', function(){

	var isSupported = function() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null && typeof(Storage) !== "undefined";
		} catch (e) {
			return false;
		}
	};

	var store = function(key, value) {
		// Store
		localStorage.setItem(key, value);
	};

	var retrieve = function (key, element) {
		// Retrieve
		if (element) {
			document.getElementById(element).innerHTML = localStorage.getItem(key);
		} else {
			return localStorage.getItem(key);
		}
	};

	if (isSupported) {
		return {
			retrieve: retrieve,
			store: store
		};
	} else {
		return false;
	}
});