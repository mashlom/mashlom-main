const { jsPDF } = window.jspdf;

async function convertUrlToBase64(logoImage, callback) {
    try {
        const response = await fetch(logoImage);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = function() {
            callback(reader);
        };
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error('Error converting image to base64:', error);
    }
}

async function exportDataToPdf(dataToExport) {
    await convertUrlToBase64("/apps/assets/emek/logo.png", function(reader) {
        const imageBase64 = reader.result;
         // Initialize jsPDF
        const doc = new jsPDF();

        doc.addImage(imageBase64, 'PNG', 10, 10, 50, 50); // Adjust positioning and size as needed

        // Add text
        doc.text("my text", 10, 70);

        // Save the PDF
        doc.save("resus.pdf");
    });

}