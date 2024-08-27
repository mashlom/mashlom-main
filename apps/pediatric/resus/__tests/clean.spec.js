require('angular');
require('angular-mocks');
require('../js/resus'); // Require your AngularJS module
angular.module('ngAnimate', []); // Mocking ngAnimate
angular.module('common-directives', []); // Mocking common-directives

describe('ResusController', () => {
    let $controller;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject((_$controller_) => {
        $controller = _$controller_;
    }));

    it('should find administer function', () => {
        const $scope = {};
        const controller = $controller('ResusController', { $scope });
        controller.weight = 5;
        
        const result = controller.calcAmountToAdminister({
            "name": "Adrenaline 1:10,000",
            "howToGive": "מתן בפוש רק בהחייאה IV",
            "dose_per_kg": 0.01,
            "dose_unit": "mg",
            "concentration": "1/10",
            "maxDose": "1",
            "maxDoseUnit": "mg",
            "prepare_instructions": "To get Adrenaline 1mg/10ml (1:10,000) take 1 ml of Adrenaline 1mg/1ml and dilute it  with 9 ml of NACL 0.9%"
         });
        expect(result).toBe('0.5');
    });
});