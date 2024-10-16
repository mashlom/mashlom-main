var app = angular.module("app");

app.controller("ProtocolsController", ['$scope', '$rootScope', '$timeout', '$http', function ($scope, $rootScope, $timeout, $http) {
    const protocolsCtrl = this;
    window.protocolsCtrl = this;
    protocolsCtrl.emergencyProtocols = [];
    protocolsCtrl.currentProtocol;
    protocolsCtrl.view = 'PROTOCOLS_INDEX'; // values: PROTOCOLS_INDEX, PROTOCOL
    function init() {
        $http.get('./data/deprecated-emergency-protocols.json').then(function (response) {
            protocolsCtrl.emergencyProtocols = response.data.emergencyProtocols;
            console.log(JSON.stringify(ctrl.emergencyProtocols));
        });

    };

    protocolsCtrl.openProtocol = function(protocol) {
        protocolsCtrl.view = "PROTOCOL";
        protocolsCtrl.currentProtocol = protocol;
        console.log(protocolsCtrl.currentProtocol);
    };

    protocolsCtrl.blurButton = function(event) {
        event.target.blur();
    };

    init();
}]);

app.directive('emergencyProtocols', function () {
    return {
        restrict: 'E',
        controller: 'ProtocolsController',
        controllerAs: 'protocolsCtrl',
        templateUrl: 'htmls/emergency-protocols.html'
    };
});

app.directive('protocol', function () {
    return {
        restrict: 'E',
        templateUrl: 'htmls/protocol-directive.html',
        link: function (scope, element, attrs) {
        }
    };
});