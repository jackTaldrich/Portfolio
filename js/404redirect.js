document.addEventListener("DOMContentLoaded", function() {
    if (document.title.includes("404") || document.body.innerText.includes("404")) {
        let originalUrl = window.location.pathname;
        let newUrl = "/Portfolio" + originalUrl;

        // Attempt to redirect to the modified URL
        fetch(newUrl)
            .then(response => {
                if (response.ok) {
                    window.location.href = newUrl;
                } else {
                    console.error(`The modified URL also returned an error: ${response.status}`);
                }
            })
            .catch(error => {
                console.error("Error while trying to fetch the modified URL:", error);
            });
    }
});
