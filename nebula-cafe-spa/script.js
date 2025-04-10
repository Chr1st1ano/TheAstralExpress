document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  async function loadPage(page) {
    try {
      const res = await fetch(`pages/${page}.html`);
      const text = await res.text();
      content.innerHTML = text;
    } catch (err) {
      content.innerHTML = "<p>Page not found.</p>";
    }
  }

  // Function to handle click sound
  function playClickSound() {
    const newClickSound = new Audio("sounds/click.mp3"); // Create a new audio instance for click
    newClickSound.play(); // Play it immediately
  }

  // Function to handle hover sound
  function playHoverSound() {
    const newHoverSound = new Audio("sounds/hover.mp3"); // Create a new audio instance for hover
    newHoverSound.play(); // Play it immediately
  }

  // Click events for navigation
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");

      // Play the click sound on each click
      playClickSound();
      loadPage(page);
    });

    // Hover sound plays immediately for each hover without blocking other sounds
    link.addEventListener("mouseover", () => {
      playHoverSound(); // Play the hover sound immediately without blocking other hover sounds
    });
  });

  // Load default page
  loadPage("home");
});
