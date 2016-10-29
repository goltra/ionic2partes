var cordova;

describe('Services', function() {

  // load the controller's module
  beforeEach(module('ngCordovaDemoApp'));

  describe("SettingsService", function() {

    var service,
      httpBackend,
      settings;

    // Initialize the controller and a mock scope
    beforeEach(inject(function(SettingsService, $httpBackend) {
      service = SettingsService;
      httpBackend = $httpBackend;
    }));


    it('Init module failed', function() {
      expect(true).toBe(true);
    });

  });
});