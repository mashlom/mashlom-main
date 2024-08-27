require('angular');
require('angular-mocks');
require('../js/resus'); // Require your AngularJS module
angular.module('ngAnimate', []); // Mocking ngAnimate
angular.module('common-directives', []); // Mocking common-directives
const fs = require('fs');

describe('ResusController', () => {
    let $controller;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject((_$controller_) => {
        $controller = _$controller_;
    }));

    const drugMap = loadAndProcessJSON('./apps/pediatric/resus/__tests/resus-drugs-definitions-duplicate-testing.json');

    function getDrugData(name, howToGive, dose_per_kg) {
        // Create the key from the input parameters
        const key = `${name}|${howToGive}|${dose_per_kg}`;
        return drugMap.get(key) || null;  // Return null if the key doesn't exist
    }

    it('should find administer function', () => {
        const $scope = {};
        const controller = $controller('ResusController', { $scope });
        controller.weight = 5;
        
        let result = controller.calcAmountToAdminister(getDrugData("Adrenaline 1:10,000", "מתן בפוש רק בהחייאה IV", 0.01));
        expect(result).toBe('0.5');
        
        result = controller.calcAmountToAdminister(getDrugData("Atropine 1:10,000", "IV", 0.02));
        expect(result).toBe('1');
    });

    function loadAndProcessJSON(filePath) {
        // Read the JSON file
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
    
        // Create a hash map
        const hashMap = new Map();
    
        // Populate the hash map
        jsonData.sections.forEach(section => {
            section.drugs.forEach(drug => {
                // Create the key from name, howToGive, and dose_per_kg
                const key = `${drug.name}|${drug.howToGive}|${drug.dose_per_kg}`;
                hashMap.set(key, drug);
            });
        });
    
        return hashMap;
    }
});