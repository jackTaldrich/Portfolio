document.addEventListener("DOMContentLoaded", function () {
  function showHighlightGrid() {
    const highlightGrid = document.querySelector(".highlight-grid");
    highlightGrid.style.display = "grid";

    const x = document.querySelector(".highlight-grid .x");
    if (x) {
      x.addEventListener("click", function () {
        xClick();
      });
    }
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function adjustTextHeight() {
    const highlightedImage = document.querySelector(".highlighted-image");
    const highlightedText = document.querySelector(".highlighted-text");

    if (highlightedImage && highlightedText) {
      highlightedImage.addEventListener("load", function () {
        const imageHeight = highlightedImage.offsetHeight;
        highlightedText.style.maxHeight = imageHeight + "px";
        highlightedText.style.overflowY = "auto";
      });

      if (highlightedImage.complete) {
        highlightedImage.dispatchEvent(new Event("load"));
      }
    }
  }

  adjustTextHeight();

  const imageAlt = getQueryParam("image");

  if (imageAlt) {
    applyStylesBasedOnImage(imageAlt);
    showHighlightGrid();
  }

  const images = document.querySelectorAll(".other-grid img");

  images.forEach((image) => {
    image.addEventListener("click", function () {
      const imageAlt = encodeURIComponent(this.alt);
      const newUrl = "?image=" + imageAlt;
      history.pushState(null, "", newUrl);
      applyStylesBasedOnImage(imageAlt);
      showHighlightGrid();

      adjustTextHeight();
    });
  });

  window.addEventListener("resize", adjustTextHeight);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      xClick();
    }
  });
});

function applyStylesBasedOnImage(imageAlt) {
  const darkOverlay = document.querySelector("#dark-overlay");
  const highlightGrid = document.querySelector(".highlight-grid");
  const highlightedImage = document.querySelector(".highlighted-image");
  const highlightedText = document.querySelector(".highlighted-text");
  const textContentMap = getTextContentMap();

  if (
    !darkOverlay ||
    !highlightGrid ||
    !highlightedImage ||
    !highlightedText ||
    !textContentMap
  ) {
    return;
  }

  const imgElement = document.querySelector(
    '.other-grid img[alt="' + imageAlt + '"]'
  );
  if (!imgElement) {
    return;
  }

  document.body.style.overflow = "hidden";
  darkOverlay.style.display = "block";
  highlightGrid.style.display = "grid";

  highlightedImage.src = imgElement.src;
  highlightedImage.alt = imageAlt;

  const textContent = textContentMap[imageAlt] || "NaN";

  highlightedText.innerHTML = textContent;
}

function xClick() {
  const currentUrl = window.location.href;
  const baseUrl = currentUrl.split("?")[0];
  const darkOverlay = document.querySelector("#dark-overlay");
  const highlightGrid = document.querySelector(".highlight-grid");

  history.replaceState(null, "", baseUrl);

  darkOverlay.style.display = "none";
  highlightGrid.style.display = "none";
  document.body.style.overflow = "auto";
}

function getTextContentMap() {
  return {
    computer:
      "For Christmas in middle school, I got an Alienware computer. It worked well for a few years but I soon needed better equipment to run different programs. In my Sophomore year of high school, I took on the challenge of ordering parts and building a computer. I had a lot of trouble installing everything, but after around two weeks of trial and error, I had a fully functional PC equipped with powerful--but upgradeable--parts.",
    morse_code_parser:
      "During my childhood, I was interested in cryptography. I learned Morse code and some other notable ciphers like Caesar, Pigpen, etc. I thought it would be fun to communicate in Morse code with my friends, so I designed and programmed a circuit using an Arduino that could do it. The device is simple: it uses a button connected to an analog input on the Arduino to detect a press. It then processes these inputs with timing logic to distinguish between dots and dashes, mapping them to letters using a dictionary and printing the corresponding characters.",
    scatterplot:
      'Is there a correlation between a college\'s acceptance rate and how long they keep emailing you before stopping? I get hundreds of college emails weekly, so I made a Python program to sort them by college vs not, then plot their acceptance rate and day received. The program has an algorithm to determine if the email is from a college and then uses another algorithm to get the college name to match up with the names I have in my dataset. It then saves the college\'s name, acceptance rate, and time I received the email in a separate CSV file. After that, I used a different Python program to plot all the points on a scatterplot. The results are pretty interesting now, but I will have to wait until next summer to see if there is any correlation. <a href="https://github.com/jackTaldrich/College-V-Time-Plotter/" target="_blank">You can find the repository here.</a>',
    better_emp:
      "After a year since I made it, I wanted to build a better EMP gun. My friend came over and gave me an old Nerf gun to use. Instead of using a puny bug zapper to generate the pulses, I used a dedicated high-voltage generator that could provide much stronger pulses. The device uses a coil with more windings, a better battery, and a more stable spark gap that does not misalign over time.",
    green_fire:
      "Another passion of mine is chemistry. I saw a video of someone making 'green fire' online and felt I had to try it. The reaction uses methanol and boric acid to form trimethyl borate and water: 3CH3OH + B(OH)3 -> B(OCH3)3 + 3H2O. The result is a stable (but flammable) liquid that, when lit, makes a very dim green fire.",
    homemade_pcb:
      "My CNC machine not only mills fine-detail products on a variety of materials but also fabricates printed circuit boards (PCBs). A project I worked on called the Rabbler used a custom-designed circuit board. I was able to successfully mill this board with tolerances of less than 0.05mm. I scavenged a UV Curing device and wired it with my bench power supply to harden a finishing layer on top of the copper, which makes it easier to solder and gives the board its green color.",
    laser_heatsink:
      "My laser diode is very inefficient. Around half of the total energy supplied to the laser is emitted as heat. Because of this, after only 20 seconds, the laser starts to burn up and is dangerously hot. To slow the laser's increase in temperature, I designed a custom heatsink to fit it. I milled the heatsink on my CNC machine out of aluminum because of its heat transfer, thermal capacity, cost per volume, and machineability. The heatsink also has M5 screw mounts where I can screw it into a holder.",
    npi: "I have been taught Spanish since 2nd grade, and my Spanish career extended to my Junior year in high school when I took AP Spanish. I am confident in my reading and writing ability and can speak and hear basic sentences. During the summer before my Senior year, I visited Greece and discovered the beauty of the Greek language. Over the summer, I started learning Greek, as I feel it is a great way to write and document my life. Είμαι σε βασικό επίπεδο, but it is a productive way that I like to spend my time.",
    guitar:
      'I started playing guitar at the end of my Junior year and consistently practiced for at least an hour daily. Guitar became one of my favorite hobbies, as I am always finding new music and learning how to play it. You can find a link <a href="https://www.youtube.com/watch?v=_WjZezyfVrc" target="_blank">here</a> to me playing.',
    rabbler:
      'On a show, I saw a device that could obscure voices recorded by a bug by using random static on all frequencies louder than the voice. I looked up the device online only to find that they cost hundreds of dollars. Since the concept was simple enough, I built it for much cheaper. With some help, I wrote code in C that uses the logic <a href="https://en.wikipedia.org/wiki/Linear-feedback_shift_register" target="_blank">here</a> to make pseudorandom noise. I designed a circuit board and then installed the components on it. It worked, but I still need to create a case for it and use a stronger speaker.',
    game: 'For my final project in my game design class, I combined my knowledge of electronics and programming to create a game that shocks the player whenever they take damage. On the final day of school, my friend and I presented our game to not just the class but the school. We set up a booth where people could try the game and see if they could beat it; unfortunately <a href="https://youtube.com/shorts/0w70WdpyoYQ?feature=share" target="_blank">no one did.</a>',
    thermite:
      "The reaction that fascinated me the most was thermite. I saw videos of people lighting a strip of magnesium, then tossing it into a powder, and a mini volcano erupts. I got some friends to do the reaction with, and we wore welding masks to protect ourselves from the mighty light. I also built a blast shield to protect us from any molten iron that shot out. ",
  };
}
