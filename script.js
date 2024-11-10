document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const body = document.body;

  // Disable scrolling while loading
  body.classList.add("loading");

  // Hide loading screen after 2 seconds
  setTimeout(() => {
    loadingScreen.style.opacity = "0"; // Fade out

    // Fully hide the loading screen after fade-out transition
    setTimeout(() => {
      loadingScreen.style.display = "none";
      body.classList.remove("loading"); // Re-enable scrolling
      body.style.overflow = "auto"; // Ensure scroll is enabled

      // Scroll to top after loading screen disappears
      window.scrollTo(0, 0);
    }, 500); // Matches CSS transition duration
  }, 2000);

  // Implementing fade-in and fade-out on scroll
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: "0px 0px -50px 0px", // Trigger fade-out when the section is 50px away from leaving the viewport
    threshold: 1.0, // Ensure the section is fully in or out of the viewport
  };

  // Manually trigger the fade-out effect for testing
  setTimeout(() => {
    const fadeSection = document.querySelector("#aboutme"); // Or any section you want to test
    fadeSection.classList.remove("fadeIn");
    fadeSection.classList.add("fadeOut");
  }, 5000); // After 5 seconds, fade out

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const target = entry.target;

      if (entry.isIntersecting) {
        console.log(`Fading in: ${target.id}`); // Log the fade-in action
        target.classList.add("fadeIn");
        target.classList.remove("fadeOut");
      } else {
        console.log(`Fading out: ${target.id}`); // Log the fade-out action
        target.classList.remove("fadeIn");
        target.classList.add("fadeOut");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, options);

  // Select specific sections for fade effect (for better performance)
  const fadeSections = document.querySelectorAll(".fade-section");
  fadeSections.forEach((section) => {
    observer.observe(section);
  });
});
