// Animated background particles
function createParticles() {
  const bg = document.querySelector(".animated-bg");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    bg.appendChild(particle);
  }
}

// Typing animation
function typeWriter() {
  const texts = [
    "Building amazing digital experiences...",
    "Lifting some heavy weights...",
    "Chilling with friends...",
    "Always learning new ways to make life easier...",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let currentText = "";
  let isDeleting = false;

  function type() {
    const fullText = texts[textIndex];

    if (isDeleting) {
      currentText = fullText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentText = fullText.substring(0, charIndex + 1);
      charIndex++;
    }

    document.getElementById("typed-text").textContent = currentText;

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === fullText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// Smooth scrolling for navigation links
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  typeWriter();
  smoothScroll();
  handleScrollAnimations();

  window.addEventListener("scroll", handleScrollAnimations);
});
