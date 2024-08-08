function adjustTextHeight() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        const img = item.querySelector('img');
        const textContent = item.querySelector('.text-content');

        if (img && textContent) {
            // Apply the height of the image to the text content
            textContent.style.maxHeight = img.clientHeight + 'px';
        }
    });
}

// Adjust text height when the page loads
document.addEventListener("DOMContentLoaded", function() {
    adjustTextHeight();

    // Re-adjust text height whenever the window is resized
    window.addEventListener('resize', adjustTextHeight);
});
