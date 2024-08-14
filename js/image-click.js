document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.other-grid img');

    images.forEach(image => {
        image.addEventListener('click', function() {
            alert('Image clicked!'); 
        });
    });
});
