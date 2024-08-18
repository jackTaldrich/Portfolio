function adjustTextHeight() {
    if (window.matchMedia("(max-width: 576px)").matches) {
        return;
    }

    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        const img = item.querySelector('img');
        const textContents = item.querySelectorAll('.text-content');

        if (img && textContents.length > 0) {
            img.onload = function() {
                textContents.forEach(textContent => {
                    textContent.style.maxHeight = img.clientHeight + 'px';
                });
            };

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

    window.addEventListener('resize', function() {
        adjustTextHeight();
    });
});
