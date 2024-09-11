function onElementVisible(element, callback) {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();

        observer.disconnect();
      }
    });
  });

  observer.observe(element);
}

const myElement = document.querySelector("#observe"); // change this to element
const alertBox = document.querySelector("#click-images");
onElementVisible(myElement, () => {
  alertBox.style.display = "block";
});
