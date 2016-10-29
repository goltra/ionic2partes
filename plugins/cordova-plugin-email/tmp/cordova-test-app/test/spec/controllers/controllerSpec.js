var cordova,
  PouchDB;

describe('controller', function() {

  // load the controller's module
  beforeEach(module('ngCordovaDemoApp'));

  describe("HomeController", function() {

    var fakeFactory, deferred, q,
      controller,
      bookService,
      inventoryService,
      scope,
      httpBackend,
      settings;

    // define the mock book service
    beforeEach(function() {
      inject(function($q, $rootScope) {
        q = $q;
        deferred = $q.defer();
        scope = $rootScope;
      });
    });

    // Initialize the controller and a mock scope
    beforeEach(inject(function($rootScope, $controller, $q, $httpBackend) {
      scope = $rootScope.$new();
      q = $q;
      httpBackend = $httpBackend;
      controller = $controller("HomeController", {
        $scope: scope
      });
    }));

    it('Init module failed', function() {
      expect(true).toBe(true);
    });

  });
});