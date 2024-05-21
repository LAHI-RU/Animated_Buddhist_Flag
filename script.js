document.addEventListener("DCMContentLoaded", function() {

    const canvas = document.getElementById("buddhistFlag");
    const context = canvas.getContext("2d");

    // Dimentions of the flag
    const width = canvas.width;
    const height = canvas.height;
    const bandWidth = width / 6;

    // Colours of the flag
    const colors = [
        "#0033cc",
        "#ffcc00",
        "#ff3300",
        "#ffffff",
        "#ff9933",
    ];
    

    // Function to draw 5 colours
    function drawBand (color, index, callback) {
        setTimeout(() => {
            context.fillStyle = color;
            context.fillRect(index * bandWidth, 0, bandWidth, height);

            if (callback) callback();
        }, index*1000);
    }

    // Draw combined Color Band
    function drawCombinedBand(callback) {
        const combinedColors = colors.concat(colors[0]);
        const combinedBandStart = 5 * bandWidth;
        const drawCombinedBandHeight = height/5;

        combinedColors.foreach((color, index) => {
            setTimeout(() => {
                context.fillStyle = color;
                context.fillRect(combinedBandStart, index*drawCombinedBandHeight, bandWidth, drawCombinedBandHeight);
                if(index === combinedColors.length - 1 && callback) {
                    callback();
                }
                }, index * 500);
            });
        } 
    
    // Start the drawing Process
    function startDrawing() {
        context.clearRect(0, 0, width, height);

        colors.foreach((color, index) => {
            drawBand(color, index, () => {

                if(index === colors.length - 1) {
                    setTimeout(() => {
                        drawCombinedBand(() => {

                            setTimeout(startDrawing, 1000);
                        })
                    }, 1000);
                }
            })
        })
    }

    startDrawing();

});
        