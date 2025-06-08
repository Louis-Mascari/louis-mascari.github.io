document.addEventListener("DOMContentLoaded", () => {
  // Handle page loader
  const pageLoader = document.querySelector(".page-loader");
  if (pageLoader) {
    // Hide loader after page is fully loaded
    window.addEventListener("load", () => {
      fadeOutLoader();
    });

    // Fallback to hide loader if load event doesn't fire
    setTimeout(fadeOutLoader, 2000);

    function fadeOutLoader() {
      pageLoader.classList.add("fade-out");
      setTimeout(() => {
        pageLoader.style.display = "none";
      }, 500);
    }
  }

  // Initialize theme from localStorage or system preference
  initTheme();

  // Navigation scroll effect
  const header = document.querySelector(".navbar-container");
  const backToTop = document.querySelector(".back-to-top");

  if (header || backToTop) {
    window.addEventListener("scroll", () => {
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add("navbar-scrolled");
        } else {
          header.classList.remove("navbar-scrolled");
        }
      }

      // Show/hide back to top button
      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      }
    });
  }

  // Initialize theme function
  function initTheme() {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", savedTheme || "light");
  }

  // Animate elements when they come into view
  const revealElements = document.querySelectorAll(".reveal");

  function checkReveal() {
    for (let i = 0; i < revealElements.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = revealElements[i].getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        revealElements[i].classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", checkReveal);
  // Check on initial load
  checkReveal();

  // Theme toggle functionality
  const themeToggle = document.querySelector(".theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      // Toggle theme
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";

      // Set theme attribute and save preference
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Force redraw of icons for browsers that might have caching issues
      const icons = document.querySelectorAll(
        ".icon.brands, .icon.solid, .icon.fas, .icon.fab"
      );
      icons.forEach((icon) => {
        // Save the original display value
        const originalDisplay = window.getComputedStyle(icon).display;
        // Force a redraw by temporarily hiding and showing
        icon.style.display = "none";
        void icon.offsetWidth; // Trigger reflow
        icon.style.display = originalDisplay;

        // Also apply transform to force repaint
        icon.style.transform = "translateZ(0)";
        setTimeout(() => {
          icon.style.transform = "";
        }, 10);
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate offset for fixed header
        const header = document.querySelector(".navbar-container");
        const headerHeight = header ? header.offsetHeight : 0;

        // Get element's position relative to the document
        const elementTop =
          targetElement.getBoundingClientRect().top + window.pageYOffset;

        // Scroll to position minus header height
        window.scrollTo({
          top: elementTop - headerHeight - 12, // 12px extra space for visual comfort
          behavior: "smooth",
        });
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", toggleMobileNav);

    // Close mobile menu when a link is clicked
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", toggleMobileNav);
    });

    // Function to toggle mobile nav
    function toggleMobileNav() {
      mobileNav.classList.toggle("active");
      menuToggle.classList.toggle("active");
    }

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        mobileNav.classList.contains("active") &&
        !mobileNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        toggleMobileNav();
      }
    });
  }
});
