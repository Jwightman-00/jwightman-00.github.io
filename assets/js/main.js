/* ===================================================================
   J.P. Wightman — interactivity
   Theme toggle · mobile nav · scroll reveal · reading progress ·
   back-to-top · typed role · physics particle field
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

  /* ---------- Typed role ---------- */
  var typed = document.querySelector("[data-typed]");
  if (typed && !reduceMotion) {
    var words = JSON.parse(typed.getAttribute("data-typed"));
    var wi = 0, ci = 0, deleting = false;
    var out = typed.querySelector(".typed-text");
    function tick() {
      var word = words[wi];
      ci += deleting ? -1 : 1;
      out.textContent = word.slice(0, ci);
      var delay = deleting ? 45 : 80;
      if (!deleting && ci === word.length) { delay = 1700; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 300; }
      setTimeout(tick, delay);
    }
    tick();
  } else if (typed) {
    var firstWord = JSON.parse(typed.getAttribute("data-typed"))[0];
    typed.querySelector(".typed-text").textContent = firstWord;
    var c = typed.querySelector(".cursor"); if (c) c.style.display = "none";
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

  /* ---------- Particle constellation (physics-themed) ---------- */
  var canvas = document.getElementById("particles");
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, particles = [], raf = null, running = false;
    var mouse = { x: -999, y: -999 };

    function color() {
      return getComputedStyle(root).getPropertyValue("--particle").trim() || "37, 99, 235";
    }
    var rgb = color();

    function resize() {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(Math.floor(W / 11), 70);
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.7
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        var dxm = p.x - mouse.x, dym = p.y - mouse.y;
        var dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < 110 && dm > 0.01) {
          p.x += (dxm / dm) * (110 - dm) * 0.012;
          p.y += (dym / dm) * (110 - dm) * 0.012;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + rgb + ", 0.75)";
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(" + rgb + ", " + (0.16 * (1 - d / 120)) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    function start() { if (!running) { running = true; rgb = color(); draw(); } }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }

    canvas.addEventListener("pointermove", function (e) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener("pointerleave", function () { mouse.x = -999; mouse.y = -999; });
    window.addEventListener("resize", resize);
    if (toggle) toggle.addEventListener("click", function () { setTimeout(function () { rgb = color(); }, 50); });

    var vis = new IntersectionObserver(function (entries) {
      entries[0].isIntersecting ? start() : stop();
    }, { threshold: 0 });
    vis.observe(canvas);
    resize();
  }
})();
