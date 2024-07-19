function getHospital() {
    // Get the current URL from the browser
    const currentUrl = window.location.href;

    try {
        // Create a new URL object
        const urlObj = new URL(currentUrl);

        // Get the pathname and split it into segments
        const pathSegments = urlObj.pathname.split('/').filter(segment => segment.length > 0);

        // Return the first segment if it exists, otherwise return null
        return pathSegments.length > 0 ? pathSegments[0] : null;
    } catch (error) {
        console.error('Error processing the URL:', error);
        return null;
    }
}

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
                const hospital = getHospital();
                if (!hospital || hospital == "apps") {
                    return "";
                }
                return "בבית החולים " + hospital;
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
            leftLogoUrl: '@'
        },
        link: function(scope, element, attrs) {

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