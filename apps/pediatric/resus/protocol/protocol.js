angular.module('app', ["common-directives"])
.controller('PdfViewerController', function($scope) {
    var url = '../pdfs/' + getParameterByName("f");
    var container = document.getElementById('pdf-container');
    $scope.zoom = 1;
    var originalPdfWidth;
    var pdfDocument;

    function calculateBestZoom(pdfWidth) {
        var containerWidth = container.clientWidth;
        var scale = window.devicePixelRatio || 1;
        var bestZoom = Math.floor((containerWidth / pdfWidth) * scale * 10) / 10;
        return Math.max(0.1, Math.min(bestZoom, 2)); // Clamp between 0.1 and 2
    }

    function renderPage(page) {
        var viewport = page.getViewport({scale: 1});
        if (!originalPdfWidth) {
            originalPdfWidth = viewport.width;
            $scope.zoom = calculateBestZoom(originalPdfWidth);
            $scope.$apply();
        }

        var scale = $scope.zoom;
        var scaledViewport = page.getViewport({scale: scale});

        var canvas = document.createElement('canvas');
        canvas.className = 'pdf-page';
        var context = canvas.getContext('2d');
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        var renderContext = {
            canvasContext: context,
            viewport: scaledViewport
        };

        container.appendChild(canvas);
        return page.render(renderContext).promise;
    }

    function renderAllPages() {
        container.innerHTML = ''; // Clear existing pages
        var pagePromises = [];
        for (var i = 1; i <= pdfDocument.numPages; i++) {
            pagePromises.push(pdfDocument.getPage(i).then(renderPage));
        }
        return Promise.all(pagePromises);
    }

    $scope.updateZoom = function() {
        renderAllPages();
    };

    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        pdfDocument = pdf;
        return renderAllPages();
    }).then(function() {
        console.log('All pages rendered');
    });

    window.addEventListener('resize', function() {
        if (originalPdfWidth) {
            $scope.zoom = calculateBestZoom(originalPdfWidth);
            $scope.$apply();
            renderAllPages();
        }
    });
});
