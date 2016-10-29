app.controller('HomeController', ['$rootScope', '$scope', '$filter', '$log', 'blockUI',
	function($rootScope, $scope, $filter, $log, blockUI) {
		'use strict';

		load();
		/**
		 * load data via inventory service
		 *
		 */
		function load() {
			blockUI.start();
			// User agent displayed in home page
			$scope.userAgent = navigator.userAgent;
			blockUI.stop();
		}

		// public methods
		$scope.load = load;
	}
]);