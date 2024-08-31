var app = angular.module("app", ["ngAnimate", "common-directives"]);

app.controller("ResusController", ['$scope', '$rootScope', '$timeout', '$http', function ($scope, $rootScope, $timeout, $http) {
    const ctrl = this;
    window.ctrl = this;
    ctrl.dataShown = 'CALCULATOR'; // possible values: CALCULATOR, WEIGHTS, LMA
    ctrl.weight;
    ctrl.age;
    ctrl.ageScale = 'YEARS';
    ctrl.sex; // possible values: MALE, FEMALE
    ctrl.drugsData = {};
    ctrl.drugDefinitonsForUI = [];
    ctrl.agesFroDropDown = [];
    ctrl.airwaysData = {};
    ctrl.dripsDefinitions = {};
    ctrl.dripsInstructions = {};
    ctrl.dripsExpanded = false;
    ctrl.airwaysForAge = {};
    ctrl.estimatedWeighByAge = {};
    ctrl.esitmatedMaleWeight = "";
    ctrl.esitmatedFemaleWeight = "";
    ctrl.tooltipIndex = "";
    ctrl.patientId = "";
    ctrl.patientName = "";

    function init() {
        $http.get('./data/resus-drugs-definitions.json').then(function (response) {
            ctrl.drugsData = response.data;
            ctrl.drugDefinitonsForUI = ctrl.createDrugDefinitonsForUI(response.data)
            ctrl.drugsData.sections.forEach(function (section) {
                section.$isExpanded = false; // Start with all sections collapsed
            });
        });
        $http.get('./data/airways.json').then(function (response) {
            ctrl.airwaysData = response.data;
            parseRawDataToEstimatedWeights();
            createDropDownData();
        });
        $http.get('./data/drips.json').then(function (response) {
            ctrl.dripsDefinitions = response.data.drugs;
        });

    };

    ctrl.createDrugDefinitonsForUI = function (data) {
        return data.sections.flatMap(category => {
            return category.drugs.map(drug => {
                return {
                    "drug_name": `${drug.name} ${drug.howToGive}`,
                    "dosage": `${drug.dose_per_kg} ${drug.dose_unit}`,
                    "medical_concentration": drug.concentration ? `${drug.concentration} ${drug.dose_unit}/ml` : "",
                    "max_dose": drug.maxDose ? `${drug.maxDose} ${drug.maxDoseUnit}` : ""
                };
            });
        });
    };

    ctrl.shouldDispalyConcentration = function (drug){
        return drug.shouldDispalyConcentration;
    }

    ctrl.dripInstructions = function (drugName) {
        return ctrl.dripsInstructions[drugName];
    }

    ctrl.dripDefinition = function (drugName) {
        return ctrl.dripsDefinitions[drugName];
    }

    ctrl.formatNumber = function (num) {
        // Use toFixed(2) to get a string with two decimal places
        let formatted = num.toFixed(2);

        // Use a regular expression to remove trailing zeros
        formatted = formatted.replace(/\.?0+$/, '');

        return formatted;
    }

    function createDropDownData() {
        const ages = ctrl.airwaysData.dataByAge.map(item => item.age);
        ages.forEach(age => {
            ctrl.agesFroDropDown.push({ label: ctrl.formatAge(age), value: age });
        });
    }

    function parseRawDataToEstimatedWeights() {
        for (var i = 0; i < ctrl.airwaysData.dataByAge.length; ++i) {
            const { age, estimatedMaleWeight, estimatedFemaleWeight } = ctrl.airwaysData.dataByAge[i];
            ctrl.estimatedWeighByAge[age] = { male: estimatedMaleWeight, female: estimatedFemaleWeight };
        }
    }

    ctrl.applyMale = function () {
        ctrl.weight = ctrl.esitmatedMaleWeight;
    };

    ctrl.applyMaleRounded = function () {
        ctrl.weight = Math.round(ctrl.esitmatedMaleWeight);
    };

    ctrl.applyFemaleRounded = function () {
        ctrl.weight = Math.round(ctrl.esitmatedFemaleWeight);
    };

    ctrl.applyFemale = function () {
        ctrl.weight = ctrl.esitmatedFemaleWeight;
    };

    ctrl.getDefi = function (multiplier) {
        return Math.min(multiplier * ctrl.weight, 200);
    };

    ctrl.toggleTooltip = function (index) {
        if (ctrl.tooltipIndex === index) {
            ctrl.tooltipIndex = null;
        } else {
            ctrl.tooltipIndex = index;
        }
    };

    ctrl.replaceSpacesWithUnderline = function (str) {
        return str.replace(/ /g, "_");
    }

    ctrl.ageAsInTable = function () {
        if (ctrl.age == 1 && ctrl.ageScale == 'YEARS') {
            return "12 month";
        }
        if (ctrl.age == 2 && ctrl.ageScale == 'YEARS') {
            return "24 month";
        }
        return ctrl.age + (ctrl.ageScale == 'YEARS' ? " year" : " month");
    }

    ctrl.shouldWarnOnWeight = function () {
        if (!!ctrl.age && !!ctrl.weight && !!ctrl.esitmatedFemaleWeight) {
            return ctrl.weight > 2.5 * ctrl.esitmatedFemaleWeight;
        }
        return false;
    }

    ctrl.changedValue = function () {
        if (!ctrl.age) {
            ctrl.esitmatedMaleWeight = "";
            ctrl.esitmatedFemaleWeight = "";
            return;
        }
        ctrl.esitmatedMaleWeight = ctrl.estimatedWeighByAge[ctrl.age].male;
        ctrl.esitmatedFemaleWeight = ctrl.estimatedWeighByAge[ctrl.age].female;

        for (var i = 0; i < ctrl.airwaysData.dataByAge.length; ++i) {
            const currData = ctrl.airwaysData.dataByAge[i];
            if (ctrl.age == currData.age) {
                ctrl.airwaysForAge = currData;
                return;
            }
        }
    };

    // Get dose_per_kg_per_min or hour
    ctrl.getDripRate = function (drip) {
        return drip.dose_per_kg_per_min ?? drip.dose_per_kg_per_hour;
    }

    // Target_volume_ml_per_hour
    ctrl.getTargetVolumePerHour = function (drip) {
        const definition = ctrl.getDripOverrideDefinitionsByWeight(drip);
        return definition.target_volume_ml_per_hour;
    }

    // Get time unit in drip
    ctrl.getTimeUnitString = function (drip) {
        return ctrl.isDripMinuteDefinition(drip) ? 'minute' : 'hour';
    }

    // Check if drip is minute or hour
    ctrl.isDripMinuteDefinition = function (drip) {
        return drip.dose_per_kg_per_min ? true : false;
    }

    ctrl.getDripOverrideDefinitionsByWeight = function (drip) {
        if (drip.definition_by_weights) {
            return findDefinitionByWeight(drip.definition_by_weights);
        }
        return drip;
    }

    function findDefinitionByWeight(definition_by_weights) {
        for (let range of definition_by_weights) {
            if (ctrl.weight >= range.min_kg && ctrl.weight < range.max_kg) {
                return range;
            }
        }
        throw new Error("Weight out of defined ranges");
    }

    ctrl.calcDilutionPerKg = function (drip) {
        return ctrl.innerCalcDilutionPerKg(drip, ctrl.weight, ctrl.getTargetVolumePerHour(drip));
    };

    ctrl.closeTooltip = function () {
        ctrl.tooltipIndex = "";
    }

    ctrl.getDoseByWeightWithMaxLimitFormatted = function (drugDefintion) {
        return ctrl.formatNumber(ctrl.getDoseByWeightWithMaxLimit(drugDefintion));
    }

    ctrl.getDoseByWeightWithMaxLimit = function (drugDefintion) {
        let doseByWeight = drugDefintion.dose_per_kg * ctrl.weight;
        if (drugDefintion.maxDose) {
            doseByWeight = Math.min(drugDefintion.maxDose, doseByWeight);
        }
        if (drugDefintion.minDose){
            doseByWeight = Math.max(drugDefintion.minDose, doseByWeight);
        }
        return doseByWeight;
    }

    ctrl.calcInfusionSpeed = function (drip) {
        const dosePerKg = calcDosePerHourPerWeight(drip, ctrl.weight);
        if (drip.dose_unit !== drip.existing_dilution_concentration_dose_unit) {
            throw new Error("Dosage unit and existing concentration does not match. need to implement units aligmnet before calculation. drug with error:" + drip.name);
        }
        const [numerator, denominator] = ctrl.splitRatio(drip.existing_dilution_concentration);
        const concentration = numerator / denominator;
        return ctrl.formatNumber(dosePerKg / concentration);  // Volume = Mass / Concentration
    }

    ctrl.toggleSection = function (index) {
        ctrl.drugsData.sections[index].$isExpanded = !ctrl.drugsData.sections[index].$isExpanded;
    };

    ctrl.toggleDrips = function () {
        ctrl.dripsExpanded = !ctrl.dripsExpanded;
        // since its the end of the div, expanding the drips make it under the fold.
        // so we scroll to it.
        if (ctrl.dripsExpanded) {
            $timeout(function() {
                scrollToElement('collapseable-area-drips');
            }, 150);
        }
    }

    ctrl.splitRatio = function (ratio) {
        return ratio.split('/').map(Number);
    };

    ctrl.getAdministrationUnit = function (drugDefintion) {
        if (drugDefintion.type == 'mass') {
            return drugDefintion.dose_unit;
        }
        else {
            return 'ml';
        }
    }

    ctrl.calcAmountToAdminister = function (drugDefintion) {
        let amount;
        if (drugDefintion.type == 'fluid' || drugDefintion.type == 'mass') {
            amount = ctrl.getDoseByWeightWithMaxLimit(drugDefintion);
        } else {
            amount = ctrl.calcVolume(drugDefintion);
        }

        return ctrl.formatNumber(amount);
    }

    ctrl.calcVolume = function (drugDefintion) {
        const doseByWeight = ctrl.getDoseByWeightWithMaxLimit(drugDefintion);
        const [numerator, denominator] = ctrl.splitRatio(drugDefintion.concentration);
        const concentration = numerator / denominator;

        return doseByWeight / concentration;
    };

    ctrl.selectSex = function (sex) {
        ctrl.sex = sex;
        if (!ctrl.airwaysForAge || !ctrl.sex) {
            return;
        }
        const key = ctrl.sex == 'MALE' ? 'estimatedMaleWeight' : 'estimatedFemaleWeight';
        ctrl.weight = ctrl.airwaysForAge[key];
    };

    ctrl.allValuesSatisfied = function () {
        return ctrl.weight && ctrl.age;
    };

    ctrl.getBlade = function () {
        return ctrl.airwaysForAge.blade;
    };
    ctrl.getEttDiameter = function () {
        return ctrl.airwaysForAge.cuffedETT;
    };
    ctrl.getLma = function () {
        return ctrl.airwaysForAge.lma;
    };

    ctrl.resetAll = function () {
        ctrl.weight = undefined;
        ctrl.age = undefined;
        ctrl.esitmatedMaleWeight = "";
        ctrl.esitmatedFemaleWeight = "";
    };

    ctrl.openPanel = function (panel) {
        ctrl.dataShown = panel;
    };

    ctrl.closePanel = function () {
        ctrl.dataShown = 'CALCULATOR';
    };

    ctrl.formatAge = function (age) {
        if (age == "0 month") {
            return "בן יומו";
        }
        if (age == "1 month") {
            return "חודש";
        }
        if (age == "2 month") {
            return "חודשיים";
        }
        if (age == "1 year") {
            return "שנה";
        }
        if (age == "2 year") {
            return "שנתיים";
        }
        return age.replace("month", "חודשים").replace("year", "שנים");
    }

    ctrl.exportToPdf = function() {
        exportDataToPdf({
            "patientName" : ctrl.patientName,
            "patientId" : ctrl.patientId
        });
    };

    ctrl.innerCalcDilutionPerKg = function(drugData, kg, target_volume_ml_per_hour) {
        const dosePerKg = ctrl.calcDosePerHourPerWeight(drugData, kg);
        const dose_to_add = (drugData.default_dilution_volume_ml / target_volume_ml_per_hour) * dosePerKg;
        const { dose: doseForDilution, units: unitsForDilution } = ctrl.prettifyUnits(dose_to_add, drugData.dose_unit);
        const { dose: doseBeforeDilution, units: unitsBeforeDilution } = ctrl.prettifyUnits(dosePerKg, drugData.dose_unit);
        return { doseBeforeDilution: ctrl.formatNumberToFixed2(doseBeforeDilution), unitsBeforeDilution, doseForDilution: ctrl.formatNumberToFixed2(doseForDilution), unitsForDilution };
    }
    
    ctrl.calcDosePerHourPerWeight = function(drugData, kg) {
        let drug_per_hour = 0;
        if (drugData.dose_per_kg_per_min) {
            drug_per_hour = drugData.dose_per_kg_per_min * 60;
        } else if (drugData.dose_per_kg_per_hour) {
            drug_per_hour = drugData.dose_per_kg_per_hour;
        } else {
            throw new Error("neither minute nor hour provided to drug " + drugData.name);
        }
        return drug_per_hour * kg;
    }
    
    ctrl.formatNumberToFixed2 = function(num) {
        return parseFloat(num.toFixed(2));
    }
    
    ctrl.prettifyUnits = function(dose, units) {
        if (dose < 1000) {
            return { dose, units }
        } else {
            if (units === 'mcg') {
                return { dose: dose / 1000, units: 'mg' }
            }
            return { dose, units }
        }
    }

    init();
}]);

app.directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            var prevValue = '';
            element.on('click', function () {
                if (!$window.getSelection().toString()) {
                    this.setSelectionRange(0, this.value.length);
                }
            });
            element.on('input', function () {
                if (this.checkValidity()) {
                    prevValue = this.value;
                } else {
                    this.value = prevValue;
                    ngModelCtrl.$setViewValue(this.value);
                    ngModelCtrl.$render();
                }
            });
        }
    };
}]);

app.directive('weights', function () {
    return {
        restrict: 'E',
        templateUrl: 'htmls/weights.html',
        link: function (scope, element, attrs) {
        }
    };
});

app.directive('lma', function () {
    return {
        restrict: 'E',
        templateUrl: 'htmls/lma.html',
        link: function (scope, element, attrs) {
        }
    };
});

app.directive('definitions', function () {
    return {
        restrict: 'E',
        templateUrl: 'htmls/drugsDefinitions.html',
        link: function (scope, element, attrs) {
        }
    };
});


app.directive('drugs', function () {
    return {
        restrict: 'E',
        templateUrl: 'htmls/drugs.html',
        link: function (scope, element, attrs) {
        }
    };
});

app.directive('drips', function () {
    return {
        restrict: 'E',
        templateUrl: 'htmls/drips.html',
        link: function (scope, element, attrs) {
        }
    };
});