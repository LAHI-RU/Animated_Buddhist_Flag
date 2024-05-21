document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("buddhistFlag");
    const context = canvas.getContext("2d");

    // Flag dimensions
    const width = canvas.width;
    const height = canvas.height;
    const bandWidth = width / 6;

    // Colors
    const colors = [
        "#0033cc", 
        "#ffcc00", 
        "#ff3300", 
        "#ffffff", 
        "#ff9933", 
    ];

    // Draw each color band
    function drawBand(color, index, callback) {
        setTimeout(() => {
            context.fillStyle = color;
            context.fillRect(index * bandWidth, 0, bandWidth, height);
            if (callback) callback();
        }, index * 1000); // Delay in milliseconds
    }

    // Draw the combined color band
    function drawCombinedBand(callback) {
        const combinedColors = colors.concat(colors[0]);
        const combinedBandStart = 5 * bandWidth;
        const combinedBandHeight = height / 5;

        combinedColors.forEach((color, index) => {
            setTimeout(() => {
                context.fillStyle = color;
                context.fillRect(combinedBandStart, index * combinedBandHeight, bandWidth, combinedBandHeight);
                if (index === combinedColors.length - 1 && callback) {
                    callback();
                }
            }, index * 500); 
        });
    }

    // Clear the canvas and start the drawing process
    function startDrawing() {
        context.clearRect(0, 0, width, height);

        // Draw each color band in sequence
        colors.forEach((color, index) => {
            drawBand(color, index, () => {
                
                if (index === colors.length - 1) {
                    setTimeout(() => {
                        drawCombinedBand(() => {
                           
                            setTimeout(startDrawing, 1000); 
                        });
                    }, 1000); 
                }
            });
        });
    }

    // Start the drawing process
    startDrawing();
});
