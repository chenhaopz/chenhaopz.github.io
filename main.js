//Interactive effects for info blocks
//Reference for this part: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

// Function to add interactive effects to info blocks
function addBlockInteractivity() {
    const infoBlocks = document.querySelectorAll('.info-block');
    
    infoBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addBlockInteractivity();
});