//localStorage and sessionStorage
(function () {
	'use strict';

	/**
	* Description
	* Local storage helper service
	*/
	angular
		.module('app')
		.factory('localStorageService', LocalStorageService);

	function LocalStorageService () {

		var isSupported = function() {
			try {
				return 'localStorage' in window && window['localStorage'] !== null && typeof(Storage) !== "undefined";
			} catch (e) {
				return false;
			}
		};

		var getItem = function (key, element) {
			// Retrieve
			if (element) {
				document.getElementById(element).innerHTML = localStorage.getItem(key);
			} else {
				return localStorage.getItem(key);
			}
		};

		var setItem = function (key, value) {
			// Store
			localStorage.setItem(key, value) || localStorage[key] = value;
		};

		var removeItem = function (key) {
			localStorage.removeItem(key) || delete localStorage[key];
		};

		var retrieveObject = function (object) {
			return JSON.parse(localStorage[object]);
		};

		var storeObject = function (object) {
			localStorage[object] = JSON.stringify(object);
		};

		var clearAll = function () {
			localStorage.clear();
		};

		var getKey = function (index) {
			return localStorage.key(index);
		};

		var getLength = function (argument) {
			return localStorage.length;
		};

		// event object contains
		// key – the property name of the value stored
		// newValue – the newly set value (duh!)
		// oldValue – the previous value before being overwritten by .newValue
		// url – the full url path of the origin of the storage event
		// storageArea – the storage object, either localStorage or sessionStorage
		var bindEvents = function () {
			//To listen for events the following code is used:
			function storageEvent(event) {
				event = event || window.event; // give IE8 some love
				console.log('Yo people! Something just got stored!');
			}

			if (window.attachEvent) { // ::sigh:: IE8 support
				window.attachEvent('onstorage', storageEvent);
			} else {
				window.addEventListener('storage', storageEvent, false);
			}
		};

		var bindEventsToInputs = function (inputId, outputId) {
			//example
			var dataInput = document.getElementById(inputId),
				output = document.getElementById(outputId);

			addEvent(window, 'storage', function (event) {
				if (event.key == 'storage-event-test') {
					output.innerHTML = event.newValue;
				}
			});

			addEvent(dataInput, 'keyup', function () {
				localStorage.setItem('storage-event-test', this.value);
			});
		};

		var logStorageData = function () {
			for(name in localStorage)
				console.log(localStorage[name]);
		};

		if (isSupported) {
			bindEvents();
			return {
				retrieve: getItem,
				store: setItem,
				reset: clearAll
			};
		} else {
			return false;
		};
	}
})();