var isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
if (isMobile) {
    window.location.href = "/Portfolio/html/mobile.html";
}