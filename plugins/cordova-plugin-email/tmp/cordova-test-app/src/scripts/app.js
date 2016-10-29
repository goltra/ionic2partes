/**
 * Shows up the error dialog with the given error details
 * @param $rootScope root scope
 * @param $scope current scope
 * @param $log logger to use
 * @param blockUI reference to remove blockUI
 * @param errorTitle title to use
 * @param errorCode error code to use
 * @param errorDetails message to display
 */
showErrorDialog = function($rootScope, $scope, $log, blockUI, errorTitle, errorCode, errorDetails) {
  blockUI.start();
  navigator.notification.alert(errorCode + "\n" + errorDetails, errorDialogClosed($rootScope, $scope, $log), "Error - " + errorTitle);
  blockUI.stop();
};

/**
 * @param $rootScope root scope
 * @param $scope current scope
 * @param $log logger to use
 */
errorDialogClosed = function($rootScope, $scope, $log) {

};

handleOpenURL = function(pURL) {
  if (pURL.toLowerCase().search('ngcordovademoapp') > -1) {
    var type = pURL.substring(pURL.indexOf('//') + 2, pURL.indexOf('?')),
      params = pURL.substring(pURL.indexOf('?') + 1).split("&");
    // create JSON object
    var args = {};
    for (var i = 0, len = params.length; i < len; i++) {
      var paramData = params[i].split("=");
      args[paramData[0]] = paramData[1];
    }
    // get Angular scope from the known DOM element
    e = document.body;
    scope = angular.element(e).scope();
    // update the model with a wrap in $apply(fn) which will refresh the view for us
    scope.$apply(function() {
      // broadcast URL data
      switch (type) {
        case 'config':
          scope.$root.$broadcast('settings.handleURL', args);
          break;
      }
    });
  }
};
/**
 * @ngdoc function
 * @name isMobileDevice
 * @description returns true if running on a mobile device, otherwise false
 */
isMobileDevice = function() {
  if (window.cordova) {
    return true;
  } else {
    return false; //this is the browser
  }
}



// redirect global function to own namespace
function handleOpenURL(pURL) {
  setTimeout(function() {
    handleOpenURL(pURL);
  }, 0);
}



var app = angular.module('ngCordovaDemoApp', ['blockUI', 'ngRoute', 'ngTouch', 'mobile-angular-ui', 'LocalStorageModule']);


/**
 * @ngdoc function
 * @name onDeviceReady
 * @description Called after device is ready to use
 */
onDeviceReady = function() {
  // bootstrap app:
}

// on dev fire up event directly
if (isMobileDevice()) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  onDeviceReady();
}

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'MainController'
  }).when('/home', {
    templateUrl: 'views/homeView.html',
    controller: 'HomeController'
  }).otherwise('/home');
});

/**
 * Configure blockUI
 */
app.config(['blockUIConfig',
  function(blockUIConfig) {
    // Change the default overlay message
    blockUIConfig.message = 'Loading ...';

    // Change the default delay to 50ms before the blocking is visible
    blockUIConfig.delay = 5;
  }
]);

app.directive('backButton', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        history.back();
        scope.$apply();
      });
    }
  };
})

/**
 * Controller for the app.
 */
app.controller('MainController', ['$scope', '$rootScope', '$location', '$log', 'blockUI', 'SettingsService',
  function($scope, $rootScope, $location, $log, blockUI, settings) {
    'use strict';

    $rootScope.$on('server.timeout', function(event) {
      showErrorDialog($rootScope, $scope, $log, blockUI, "Timeout", 2001, "No answer from server");
    });

    $log.info("Loading default page.");
    // redirect to default page
    $location.path("/home");

  }
]);
