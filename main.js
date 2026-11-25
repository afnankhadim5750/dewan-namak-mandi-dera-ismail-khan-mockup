/* Dewan Namak Mandi — mobile menu, scroll-spy, lightbox, FAQ, reveal, back-to-top */
(function () {
  "use strict";

  /* ---- mobile menu: instant toggle, no transition ---- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  function closeMenu() {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- scroll-spy: highlight current nav section ---- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".acc-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.nextElementSibling;
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });
  });

  /* ---- lightbox ---- */
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbCap = document.getElementById("lightbox-cap");
  function openLightbox(tile) {
    lbImg.src = tile.getAttribute("data-full");
    lbImg.alt = tile.getAttribute("data-alt") || "";
    lbCap.textContent = tile.querySelector("span").textContent;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox-close").focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
  }
  document.querySelectorAll(".gallery-tile").forEach(function (tile) {
    tile.addEventListener("click", function () { openLightbox(tile); });
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  /* ---- reveal on scroll ---- */
  var revealEls = document.querySelectorAll(
    ".chapter, .why-card, .gtk-card, .gallery-tile, .acc-item, .chapter-index li"
  );
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      ro.observe(el);
    });
  }

  /* ---- back to top ---- */
  var toTop = document.getElementById("to-top");
  window.addEventListener("scroll", function () {
    toTop.classList.toggle("show", window.scrollY > 700);
  }, { passive: true });
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
