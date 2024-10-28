document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const body = document.body;

  body.classList.add("loading"); // Add loading class to disable scrolling

  // Hide loading screen after 2 seconds
  setTimeout(() => {
    loadingScreen.style.opacity = "0"; // Fade out
    setTimeout(() => {
      loadingScreen.style.display = "none"; // Remove it from the DOM
      body.classList.remove("loading"); // Remove loading class to enable scrolling
      document.querySelectorAll(".home, .aboutme, .navlist a").forEach((el) => {
        el.style.opacity = "1"; // Set opacity to 1 after loading
      });
      // Optionally set scroll position to top after loading
      window.scrollTo(0, 0);
    }, 500); // Match this delay with the CSS transition duration
  }, 2000); // Adjust the time as needed
});
