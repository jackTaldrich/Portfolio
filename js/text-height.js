function adjustTextHeight() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        const img = item.querySelector('img');
        const textContents = item.querySelectorAll('.text-content');

        if (img && textContents.length > 0) {
            // Wait for the image to fully load before adjusting the text height
            img.onload = function() {
                textContents.forEach(textContent => {
                    textContent.style.maxHeight = img.clientHeight + 'px';
                });
            };

            // For cached images, or if the image is already loaded
            if (img.complete) {
                textContents.forEach(textContent => {
                    textContent.style.maxHeight = img.clientHeight + 'px';
                });
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    adjustTextHeight();

    window.addEventListener('resize', adjustTextHeight);
});
