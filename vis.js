// Interactive circle art functionality
//Reference for this part: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
document.addEventListener('DOMContentLoaded', function() {
    // Get the circle art SVG element
    const circleArt = document.getElementById('circle-art');
    
    // Add click event listener
    if (circleArt) {
        circleArt.addEventListener('click', function() {
            // Get all circle elements
            const circles = document.querySelectorAll('.art-circle');
            
            // Update each circle with random position and color
            //Reference: https://www.w3schools.com/jsref/jsref_foreach.asp
            circles.forEach(circle => {
                // Get circle radius
                const r = parseInt(circle.getAttribute('r'));
                
                // Random position (keep circle within SVG Area)
                circle.setAttribute('cx', r + Math.random() * (400 - 2*r));
                circle.setAttribute('cy', r + Math.random() * (300 - 2*r));
                
                // Random color
                //Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString 
                circle.setAttribute('fill', '#' + Math.floor(Math.random()*16777215).toString(16));
            });
        });
    }
});