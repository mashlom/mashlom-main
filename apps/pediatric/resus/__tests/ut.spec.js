const angular = require('angular');
require('angular-mocks/angular-mocks'); // Explicitly require the angular-mocks module

describe('ResusController', () => {
  let $controller, $rootScope, $httpBackend, $scope, ctrl;

  beforeEach(() => {
    // Load the module that contains the controller
    angular.mock.module('app');

    // Inject the necessary services and instantiate the controller
    angular.mock.inject((_$controller_, _$rootScope_, _$httpBackend_) => {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;

      $scope = $rootScope.$new();
      ctrl = $controller('ResusController', { $scope });
    });
  });

  afterEach(() => {
    // Ensure all HTTP requests have been handled
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should initialize the controller with default values', () => {
    expect(ctrl.dataShown).toBe('CALCULATOR');
    expect(ctrl.ageScale).toBe('YEARS');
    expect(ctrl.drugsData).toEqual({});
  });

  it('should load airways data and process weights on init', () => {
    const mockAirwaysData = { /* mock data here */ };
    $httpBackend.expectGET('./data/airways.json').respond(mockAirwaysData);

    ctrl.init();
    $httpBackend.flush();

    expect(ctrl.airwaysData).toEqual(mockAirwaysData);
    // Additional assertions
  });
});
