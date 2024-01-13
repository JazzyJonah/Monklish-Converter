function generateImage() {
    document.getElementById("image-container").innerHTML = '<canvas id="result-image"></canvas>'
    var inputText = document.getElementById("input-text").value.toLowerCase();
    var canvas = document.getElementById("result-image");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous image

    var letterWidth = 50; // Adjust the width of each letter image
    var totalWidth = letterWidth * inputText.length;
    canvas.width = totalWidth;
    canvas.height = letterWidth;

    var imagesLoaded = 0;

    for (var i = 0; i < inputText.length; i++) {
        var letter = inputText.charAt(i);
        var img = new Image();

        if (letter === " ") {
            // Replace space with "space.png"
            img.src = "letters/space.png";
        } else if (letter === "?") {
            // Use "question.png" for question mark
            img.src = "letters/question.png";
        } else {
            // Use respective letter image
            img.src = "letters/" + letter + ".png";
        }

        (function(index) {
            img.onload = function() {
                context.drawImage(this, index * letterWidth, 0, letterWidth, letterWidth);
                imagesLoaded++;

                if (imagesLoaded === inputText.length) {
                    var dataURL = canvas.toDataURL();
                    var imgContainer = document.getElementById("image-container");
                    imgContainer.innerHTML = '<img id="result-image" src="' + dataURL + '" alt="Generated Image">';
                }
            };
        })(i);
    }
}

// Check user's system setting for dark mode
var prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkMode) {
    document.body.classList.add('dark-mode');
}
