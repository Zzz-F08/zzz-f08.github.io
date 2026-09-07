/* ==========================================================
   张帆个人主页交互脚本
   ========================================================== */
(function () {
  "use strict";

  /* ---------- 主题：明暗切换 ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("zf-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initialTheme);

  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("zf-theme", next);
  });

  /* ---------- 顶部导航：滚动阴影 ---------- */
  const nav = document.getElementById("topNav");
  const backTop = document.getElementById("backTop");
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 8);
    backTop.classList.toggle("show", y > 520);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  /* ---------- 移动端菜单 ---------- */
  const burger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      navLinks.classList.remove("open");
    })
  );

  /* ---------- 滚动渐入（IO 可用才启用初始隐藏；否则内容默认可见） ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("anim-on");
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealIO.observe(el));
    // 安全网：5 秒后无论如何都显示全部内容，避免任何遗漏
    setTimeout(() => {
      revealEls.forEach((el) => el.classList.add("visible"));
    }, 5000);
  }

  /* ---------- 数字计数动画 ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  /* ---------- 技能条动画 ---------- */
  const barIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector(".bar");
          const fill = bar.querySelector("i");
          const w = fill.style.width;
          fill.style.width = "0";
          requestAnimationFrame(() => {
            bar.classList.add("in");
            fill.style.width = w;
          });
          barIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".lang").forEach((el) => barIO.observe(el));

  /* ---------- 导航当前板块高亮 ---------- */
  const sections = Array.from(
    document.querySelectorAll("main section[id], section.hero[id]")
  );
  const linkMap = {};
  navLinks.querySelectorAll("a").forEach((a) => {
    const id = a.getAttribute("href").slice(1);
    linkMap[id] = a;
  });
  const spyIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkMap[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.values(linkMap).forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => spyIO.observe(s));
})();
