document.addEventListener('DOMContentLoaded', function() {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const imageAlt = getQueryParam('image');
    console.log('Image alt from URL:', imageAlt);

    if (imageAlt) {
        applyStylesBasedOnImage(imageAlt);
    }

    const images = document.querySelectorAll('.other-grid img');

    images.forEach(image => {
        image.addEventListener('click', function() {
            const imageAlt = encodeURIComponent(this.alt);
            const newUrl = '?image=' + imageAlt;
            history.pushState(null, '', newUrl);
            applyStylesBasedOnImage(imageAlt);
        });
    });

    const x = document.querySelector('.x');

    x.addEventListener('click', function() {
        xClick();  
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        xClick();
    }
});

function applyStylesBasedOnImage(imageAlt) {
    const darkOverlay = document.querySelector('#dark-overlay');
    const highlightGrid = document.querySelector('.highlight-grid');
    const highlightedImage = document.querySelector('.highlighted-image');
    const highlightedText = document.querySelector('.highlighted-text');

    if (!darkOverlay || !highlightGrid || !highlightedImage || !highlightedText) {
        return;
    }

    const imgElement = document.querySelector('img[alt="' + imageAlt + '"]');
    if (!imgElement) {
        return;
    }

    disableLowZIndexSelection();

    document.body.style.overflow = 'hidden';
    darkOverlay.style.display = 'block';
    highlightGrid.style.display = 'grid';

    highlightedImage.src = imgElement.src;
    highlightedImage.alt = imageAlt;

    let textContent;
    switch (imageAlt) {
        case 'computer':
            textContent = 'For Christmas in middle school, I got an Alienware computer. It worked well for a few years but soon needed better equipment to run different programs.\
            In my Sophomore year of high school, I took on the challenge of ordering parts and building a computer. I had a lot of trouble installing everything, but after around two weeks of trial and error,\
            I had a fully functional PC equipped with powerful--but upgradeable--parts.';
            break;
        case 'morse_code_parser':
            textContent = 'During my childhood, I was interested in cryptography. I learned Morse code and some other notable ciphers like Caesar, Pigpen, etc.\
            I thought it would be fun to communicate in Morse code with my friends, so I designed and programmed a circuit using an Arduino that could do it. The device is simple: it uses a button connected to an analog input on the Arduino to detect a press. It then processes these inputs with timing logic to distinguish between dots and dashes, mapping them to letters using a dictionary and printing the corresponding characters.';
            break;
        case 'better_emp':
            textContent = 'After a year since I made it, I needed to build a better EMP gun. My friend came over and gave me an old Nerf gun to use.\
            Instead of using a puny bug zapper to generate the pulses, I used a dedicated high-voltage generator that could provide much stronger pulses.\
            The device uses a coil with more windings, a better battery, and a more stable spark gap that does not misalign over time.';
            break;
        case 'green_fire':
            textContent = 'Another passion of mine is chemistry. I saw a video of someone making \'green fire\' online and felt I had to try it.\
            The reaction uses methanol and boric acid to form trimethyl borate and water: 3CH3OH + B(OH)3 -> B(OCH3)3 + 3H2O. The result is a stable (but flammable) liquid that, when lit, makes a very dim green fire. ';
            break;
        case 'homemade_pcb':
            textContent = 'My CNC machine not only mills fine-detail products on a variety of materials but also fabricates printed circuit boards (PCBs). A project I worked on called the "Rabbler" used a custom-designed circuit board.\
            I was able to successfully mill this board with tolerances with a tolerance of less than 0.05mm. I scavenged a UV Curing device and wired it with my bench power supply to harden a finishing layer on top of the copper,\
            which makes it easier to solder and gives the board its green color.';
            break;
        case 'laser_heatsink':
            textContent = 'My laser diode is very inefficient. Around half of the total energy supplied to the laser is emitted as heat. Because of this, after only 20 seconds, the laser starts to burn up and is dangerously hot.\
            To slow the laser\'s increase in temperature, I designed a custom heatsink to fit it. I milled the heatsink on my CNC machine out of aluminum because of its heat transfer, thermal capacity, cost per volume, and machineability.\
            The heatsink also has M5 screw mounts where I can screw it into a holder.';
            break;
        case 'npi':
            textContent = 'I have been taught Spanish since 2nd grade, and my Spanish career extended to my Junior year in high school when I took AP Spanish. I am confident in my reading and writing ability and can speak and hear basic sentences.\
            During the summer before my Senior year, I visited Greece and discovered the beauty of the Greek language. Over the summer, I started learning Greek, as I feel it is a great way to write and document my life.\
            Είμαι σε βασικό επίπεδο, but it is a productive way that I like to spend my time.';
            break;
        case 'guitar':
            textContent = 'Not filled out yet';
            // textContent = 'Here is a link to me playing: <a href="https://www.youtube.com/watch?v=3JZ_D9QJ9Zc" target="_blank">playing</a> things';
            break;
        default:
            textContent = 'NaN';
            break;
    }
    highlightedText.innerHTML = textContent;
}

function disableLowZIndexSelection() {
    const allElements = document.querySelectorAll('*');

    allElements.forEach(element => {
        const zIndex = window.getComputedStyle(element).zIndex;

        if (zIndex !== 'auto' && !isNaN(zIndex) && parseInt(zIndex) < 5) {
            element.style.pointerEvents = 'none';
        }
    });
}

function xClick() {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('?')[0];
    const darkOverlay = document.querySelector('#dark-overlay');
    const highlightGrid = document.querySelector('.highlight-grid');

    history.replaceState(null, '', baseUrl);

    darkOverlay.style.display = 'none';
    highlightGrid.style.display = 'none'; 
    document.body.style.overflow = 'auto';     
}
