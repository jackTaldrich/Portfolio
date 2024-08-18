document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia("(max-width: 576px)").matches) {
        return;
    }

    const sections = document.querySelectorAll('.grid-heading');
    const scrollbar = document.getElementById('custom-scrollbar');

    sections.forEach(section => {
        const indicator = document.createElement('div');
        indicator.classList.add('scroll-indicator');
        scrollbar.appendChild(indicator);
    });

    function updateIndicators() {
        const scrollHeight = document.body.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollbarHeight = scrollbar.offsetHeight;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const offset = (rect.top + window.scrollY) / scrollHeight * scrollbarHeight;

            scrollbar.children[index].style.top = `${offset}px`;
        });
    }

    window.addEventListener('scroll', updateIndicators);
    window.addEventListener('resize', updateIndicators);
    updateIndicators(); // Initial call to position indicators
});
