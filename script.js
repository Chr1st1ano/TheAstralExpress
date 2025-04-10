document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  // Background music setup
  const backgroundMusic = new Audio("sounds/timeline.mp3");
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5;

  // Load saved settings from localStorage
  const isMusicMuted = localStorage.getItem("musicMuted") === "true";
  const isSfxMuted = localStorage.getItem("sfxMuted") === "true";
  backgroundMusic.muted = isMusicMuted;

  // Create a pill-shaped container for both toggle buttons
  const toggleContainer = document.createElement("div");
  toggleContainer.style.position = "fixed";
  toggleContainer.style.top = "10px";
  toggleContainer.style.right = "10px";
  toggleContainer.style.zIndex = "9999";
  toggleContainer.style.background = "white";
  toggleContainer.style.borderRadius = "50px"; // makes it pill-shaped
  toggleContainer.style.display = "flex";
  toggleContainer.style.alignItems = "center";
  toggleContainer.style.padding = "4px 8px"; // adjust as needed for spacing
  document.body.appendChild(toggleContainer);

  // Create toggle buttons (using images) for music and SFX
  const musicToggle = document.createElement("button");
  musicToggle.style.background = "transparent";
  musicToggle.style.border = "none";
  musicToggle.style.cursor = "pointer";

  const sfxToggle = document.createElement("button");
  sfxToggle.style.background = "transparent";
  sfxToggle.style.border = "none";
  sfxToggle.style.cursor = "pointer";

  // Create a divider element for between the buttons
  const divider = document.createElement("div");
  divider.style.width = "1px";
  divider.style.height = "24px";
  divider.style.background = "#ccc";
  divider.style.margin = "0 8px";

  // Create image elements for the icons
  const musicIcon = document.createElement("img");
  musicIcon.src = isMusicMuted ? "images/music-muted.png" : "images/music-on.png";
  musicIcon.style.width = "24px"; // adjust to desired size
  musicIcon.style.height = "24px";

  const sfxIcon = document.createElement("img");
  sfxIcon.src = isSfxMuted ? "images/sfx-muted.png" : "images/sfx-on.png";
  sfxIcon.style.width = "24px"; // adjust to desired size
  sfxIcon.style.height = "24px";

  // Append the icons to their respective buttons
  musicToggle.appendChild(musicIcon);
  sfxToggle.appendChild(sfxIcon);

  // Append the buttons and divider to the pill container
  toggleContainer.appendChild(musicToggle);
  toggleContainer.appendChild(divider);
  toggleContainer.appendChild(sfxToggle);

  // Music toggle functionality
  musicToggle.addEventListener("click", () => {
    backgroundMusic.muted = !backgroundMusic.muted;
    localStorage.setItem("musicMuted", backgroundMusic.muted);
    musicIcon.src = backgroundMusic.muted ? "images/music-muted.png" : "images/music-on.png";
  });

  // SFX toggle functionality
  sfxToggle.addEventListener("click", () => {
    const currentlyMuted = localStorage.getItem("sfxMuted") === "true";
    localStorage.setItem("sfxMuted", !currentlyMuted);
    sfxIcon.src = !currentlyMuted ? "images/sfx-muted.png" : "images/sfx-on.png";
  });

  // Try to play background music
  backgroundMusic.play().catch(() => {
    console.warn("Autoplay blocked. Will play on user interaction.");
  });

  // Function to load page content with fade & blur transition
  async function loadPage(page) {
    content.style.transition = "opacity 0.3s ease, filter 0.3s ease";
    content.style.opacity = "0";
    content.style.filter = "blur(8px)";
    setTimeout(async () => {
      try {
        const res = await fetch(`pages/${page}.html`);
        const text = await res.text();
        content.innerHTML = text;
      } catch (err) {
        content.innerHTML = "<p>Page not found.</p>";
      }
      content.style.opacity = "1";
      content.style.filter = "blur(0px)";
    }, 300);
  }
  
  // Sound effects functions
  function playClickSound() {
    if (localStorage.getItem("sfxMuted") === "true") return;
    const newClickSound = new Audio("sounds/click.mp3");
    newClickSound.play();
  }

  function playHoverSound() {
    if (localStorage.getItem("sfxMuted") === "true") return;
    const newHoverSound = new Audio("sounds/hover.mp3");
    newHoverSound.play();
  }

  // Navigation events
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      playClickSound();
      loadPage(page);
    });
    link.addEventListener("mouseover", () => {
      playHoverSound();
    });
  });

  // Load homepage by default
  loadPage("home");
});
