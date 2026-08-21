/* ===================================================================
   J.P. Wightman — interactivity
   Theme toggle · mobile nav · scroll reveal · reading progress ·
   back-to-top · animated stat count-up
=================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- Mobile nav ---------- */
  var menuBtn = document.querySelector(".menu-toggle");
  var nav = document.querySelector("nav.primary");
  var backdrop = document.querySelector(".nav-backdrop");
  function closeNav() {
    if (!nav) return;
    nav.classList.remove("open");
    if (backdrop) backdrop.classList.remove("show");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      if (backdrop) backdrop.classList.toggle("show", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    if (backdrop) backdrop.addEventListener("click", closeNav);
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeNav); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
  }

  /* ---------- Reading progress ---------- */
  var bar = document.querySelector(".progress-bar");
  var toTop = document.querySelector(".to-top");
  function onScroll() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    if (toTop) toTop.classList.toggle("show", st > 400);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.style.transitionDelay = (en.target.dataset.delay || "0") + "ms";
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ---------- Animated count-up ---------- */
  var nums = document.querySelectorAll(".num[data-count]");
  if (nums.length && "IntersectionObserver" in window && !reduceMotion) {
    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || "";
        var dur = 1100, start = performance.now();
        function step(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (Math.round(eased * target)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        nio.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { nio.observe(n); });
  }
})();
