require('angular');
require('angular-mocks');
require('../js/resus');
require('../js/calculation');
angular.module('ngAnimate', []); // Mocking ngAnimate
angular.module('common-directives', []); // Mocking common-directives
const fs = require('fs');
const path = require('path');
const testCasesDrugs = require('./test-cases-drugs')
const testCasesDrugsMaxDose = require('./test-cases-drugs-max-dose')
const testCasesDrips = require('./test-cases-drips')
const testCasesDripsSpeed = require('./test-cases-drips-speed')

describe('ResusController', () => {
    let $controller;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject((_$controller_) => {
        $controller = _$controller_;
    }));

    const drugMap = loadAndProcessDrugsJSON('./apps/pediatric/resus/__tests/resus-drugs-definitions-duplicate-testing.json');
    const dripsMap = loadAndProcessDripsJSON('./apps/pediatric/resus/__tests/drips-definition-duplicate.json');

    function getDrugData(name, howToGive, dose_per_kg) {
        // Create the key from the input parameters
        const key = `${name}|${howToGive}|${dose_per_kg}`;
        return drugMap.get(key) || null;
    }

    function getDripData(name) {
        return dripsMap.get(name) || null;
    }

    it.each(testCasesDripsSpeed)(
        "Drip Speed Test Case %o",
        async ({ childWeight, drugName, expectedResult }) => {
            const $scope = {};
            const controller = $controller('ResusController', { $scope });
            controller.weight = childWeight;
            const drip = getDripData(drugName.trim());

            const infusionSpeed = controller.calcInfusionSpeed(drip);
            expect(infusionSpeed.toString() + 'ml/hr').toBe(expectedResult.speed);
        }
    );

    it.each(testCasesDrips)(
        "Drip Test Case %o",
        async ({ childWeight, drugName, expectedResult }) => {
            const $scope = {};
            const controller = $controller('ResusController', { $scope });
            controller.weight = childWeight;
            const drip = getDripData(drugName.trim());

            const doseForDilution = controller.calcDilutionPerKg(drip).doseForDilution;
            const volumePerHour = controller.getTargetVolumePerHour(drip);
            expect(doseForDilution).toBe(expectedResult.doseForDilution);
            expect(drip.default_dilution_volume_ml).toBe(expectedResult.default_dilution_volume_ml);
            expect(volumePerHour.toString() + 'ml/hr').toBe(expectedResult.volumePerHour);
        }
    );

    it.each(testCasesDrugs)(
        "Drugs Test Case %o",
        async ({ childWeight, drugName, drugType, dosage, expectedResult }) => {
            const $scope = {};
            const controller = $controller('ResusController', { $scope });
            controller.weight = childWeight;
            const testedDrug = getDrugData(drugName.trim(), drugType.trim(), dosage);
            if (!testedDrug) {
                console.log('cant find data for ' + drugName + ' ' + drugType + ' ' + dosage)
            }
            let result = controller.calcAmountToAdminister(testedDrug);
            let expectedAmount = expectedResult.volume ?? expectedResult.totalDose;
            expect(result).toBe(expectedAmount.toString());
        }
    );

    it.each(testCasesDrugsMaxDose)(
        "Passed Max Dose Test Case %o",
        async ({ childWeight, drugName, drugType, dosage, expectedResult }) => {
            const $scope = {};
            const controller = $controller('ResusController', { $scope });
            controller.weight = childWeight;
            const testedDrug = getDrugData(drugName.trim(), drugType.trim(), dosage);
            if (!testedDrug) {
                console.log('cant find data for ' + drugName + ' ' + drugType + ' ' + dosage)
            }
            let result = controller.calcAmountToAdminister(testedDrug);
            let expectedAmount = expectedResult.volume ?? expectedResult.totalDose;
            expect(result).toBe(expectedAmount.toString());
        }
    );

    it('defibrilator not passing threshold', () => {
        const $scope = {};
        const controller = $controller('ResusController', { $scope });
        controller.weight = 49;
        const defiResultMultiBy2KJ = controller.getDefi(2);
        expect(defiResultMultiBy2KJ).toBe(98);
        const defiResultMultiBy4KJ = controller.getDefi(4);
        expect(defiResultMultiBy4KJ).toBe(196);
    });

    it('defibrilator parital pass', () => {
        const $scope = {};
        const controller = $controller('ResusController', { $scope });
        controller.weight = 51;
        const defiResultMultiBy2KJ = controller.getDefi(2);
        expect(defiResultMultiBy2KJ).toBe(102);
        const defiResultMultiBy4KJ = controller.getDefi(4);
        expect(defiResultMultiBy4KJ).toBe(200);
    });

    it('defibrilator both pass', () => {
        const $scope = {};
        const controller = $controller('ResusController', { $scope });
        controller.weight = 101;
        const defiResultMultiBy2KJ = controller.getDefi(2);
        expect(defiResultMultiBy2KJ).toBe(200);
        const defiResultMultiBy4KJ = controller.getDefi(4);
        expect(defiResultMultiBy4KJ).toBe(200);
    });

    test('drips definition hard compare - jsons should be identical', () => {
        const filePath1 = path.join(__dirname, 'drips-definition-duplicate.json');
        const filePath2 = path.join(__dirname, '..', 'data', 'drips.json');

        const json1 = JSON.parse(fs.readFileSync(filePath1, 'utf8'));
        const json2 = JSON.parse(fs.readFileSync(filePath2, 'utf8'));

        expect(json1).toEqual(json2);
    });

    test('airways hard compare - jsons should be identical', () => {
        const filePath1 = path.join(__dirname, 'airways-duplicate.json');
        const filePath2 = path.join(__dirname, '..', 'data', 'airways.json');

        const json1 = JSON.parse(fs.readFileSync(filePath1, 'utf8'));
        const json2 = JSON.parse(fs.readFileSync(filePath2, 'utf8'));

        expect(json1).toEqual(json2);
    });


    test('drug definition hard compare - jsons should be identical', () => {
        const filePath1 = path.join(__dirname, 'resus-drugs-definitions-duplicate-testing.json');
        const filePath2 = path.join(__dirname, '..', 'data', 'resus-drugs-definitions.json');

        const json1 = JSON.parse(fs.readFileSync(filePath1, 'utf8'));
        const json2 = JSON.parse(fs.readFileSync(filePath2, 'utf8'));

        expect(json1).toEqual(json2);
    });

    function loadAndProcessDrugsJSON(filePath) {
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

    function loadAndProcessDripsJSON(filePath) {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        const hashMap = new Map();

        jsonData.drugs.forEach(drip => {
            const key = `${drip.name}`;
            hashMap.set(key, drip);
        });

        return hashMap;
    }
});