/* ============================================================
   Louis Mascari — portfolio interactions
   Vanilla JS, no dependencies.
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky nav shadow ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      mobileNav.hidden = !open;
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", () =>
      setOpen(toggle.getAttribute("aria-expanded") !== "true")
    );
    mobileNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setOpen(false))
    );
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---------- MangoWave preview: click to unmute ---------- */
  const mwSound = document.getElementById("mw-sound");
  const mwVideo = document.getElementById("mw-video");
  if (mwSound && mwVideo) {
    const txt = mwSound.querySelector(".scope-sound-txt");
    mwSound.addEventListener("click", () => {
      const turnOn = mwVideo.muted; // currently muted -> turn sound on
      mwVideo.muted = !turnOn;
      if (turnOn) {
        mwVideo.volume = 0.6;
        mwVideo.play().catch(() => {});
      }
      mwSound.setAttribute("aria-pressed", String(turnOn));
      mwSound.setAttribute("aria-label", turnOn ? "Mute preview audio" : "Unmute preview audio");
      if (txt) txt.textContent = turnOn ? "Mute" : "Unmute";
    });
  }
})();
