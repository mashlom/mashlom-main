function setHospitalConfig() {
    window.hospital = getParameterByName("hospital") || getFirstResourcePart();
    window.allHospitalConfigs = {
        "apps": {
            "logo": "",
            "hebrewName": ""
        },
        "kaplan": {
            "logo": "/apps/assets/kaplan/logo.png",
            "hebrewName": "קפלן"
        }
    };
    window.hospitalConfig = window.allHospitalConfigs[window.hospital ? window.hospital : "apps"];
}

setHospitalConfig();

var app = angular.module("common-directives", []);

app.directive('terms', ['$templateRequest', '$compile', function($templateRequest, $compile) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            const termsSignedKey = 'mashlom.termsSigned';
            const termsVersion = Date.parse('2024-07-14');
            scope.termsSigned = localStorage.getItem(termsSignedKey) >= termsVersion;        

            scope.acceptTerms = function() {
                localStorage.setItem(termsSignedKey, Date.now());
                scope.termsSigned = true;
            };

            scope.perHospitalPhrasing = function() {
                if (!window.hospitalConfig.hebrewName) {
                    return "";
                }
                return "בבית החולים " + window.hospitalConfig.hebrewName;
            }

            // load the template html as a relative location (since its a common
            // package and I don't know from where is will be called, templateUrl won't work.
            // The following is a work around for this.)
            var currentScript = angular.element(document.querySelector('script[src*="common-components.js"]')).attr('src');
            var scriptPath = currentScript .substring(0, currentScript.lastIndexOf('/') + 1);
            var templateUrl = scriptPath + '../htmls/terms.html';
    
            // Fetch and compile the template
            $templateRequest(templateUrl).then(function(template) {
              var linkFn = $compile(template);
              var content = linkFn(scope);
              element.append(content);
            });
        }
    };
}]);

app.directive('headerDirective', ['$templateRequest', '$compile', function($templateRequest, $compile) {
    return {
        restrict: 'E',
        scope: {
            credit: '@'
        },
        link: function(scope, element, attrs) {
            scope.leftLogoUrl = window.hospitalConfig.logo;
            if (scope.credit) {
                scope.creditStr = "הוכן בסיוע בי\"ח " + scope.credit;
            }
            // load the template html as a relative location (since its a common
            // package and I don't know from where is will be called, templateUrl won't work.
            // The following is a work around for this.)
            var currentScript = angular.element(document.querySelector('script[src*="common-components.js"]')).attr('src');
            var scriptPath = currentScript .substring(0, currentScript.lastIndexOf('/') + 1);
            var templateUrl = scriptPath + '../htmls/header.html';
    
            // Fetch and compile the template
            $templateRequest(templateUrl).then(function(template) {
              var linkFn = $compile(template);
              var content = linkFn(scope);
              element.append(content);
            });
        }
    };
}]);