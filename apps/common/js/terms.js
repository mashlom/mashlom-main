var app = angular.module("terms", []);

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

            // load the template html as a relative location (since its a common
            // package and I don't know from where is will be called, templateUrl won't work.
            // The following is a work around for this.)
            var currentScript = angular.element(document.querySelector('script[src*="terms.js"]')).attr('src');
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