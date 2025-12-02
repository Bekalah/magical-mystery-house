/*
  Minimal Cymatic Engine (ND-safe)
  Provenance: Created as a lightweight placeholder to satisfy cymatics demo in apps/web.
  This draws a breathing mandala on <canvas id="cymatic"> with no audio dependencies.
*/
(function () {
  let cvs,
    ctx,
    raf = 0,
    active = false;
  function dpr() {
    return Math.min(Math.max(1, window.devicePixelRatio || 1), 2);
  }
  function resize() {
    if (!cvs || !ctx) return;
    const w = cvs.clientWidth || 640;
    const h = cvs.clientHeight || 360;
    const DPR = dpr();
    cvs.width = w * DPR;
    cvs.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  function draw(t) {
    if (!active || !ctx) return;
    const w = cvs.clientWidth || 640,
      h = cvs.clientHeight || 360;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2,
      cy = h / 2;
    const time = performance.now() / 1000;
    const rings = 24;
    for (let i = 0; i < rings; i++) {
      const p = i / (rings - 1);
      const hue =
        Math.floor(200 + 100 * Math.sin(time * 0.5 + p * 6.283)) % 360;
      const alpha = 0.25 + 0.6 * p;
      const r =
        Math.min(w, h) * 0.05 +
        p * Math.min(w, h) * 0.45 * (0.9 + 0.1 * Math.sin(time * 0.8));
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${alpha.toFixed(2)})`;
      ctx.lineWidth = 1 + 2 * p;
      ctx.stroke();
    }
    raf = requestAnimationFrame(draw);
  }
  function start() {
    if (active) return;
    active = true;
    raf = requestAnimationFrame(draw);
  }
  function stop() {
    active = false;
    cancelAnimationFrame(raf);
    if (ctx && cvs) {
      ctx.clearRect(0, 0, cvs.clientWidth || 0, cvs.clientHeight || 0);
    }
  }
  function mount() {
    cvs = document.getElementById("cymatic");
    if (!cvs) return;
    ctx = cvs.getContext("2d");
    resize();
    window.addEventListener("resize", resize, { passive: true });
    // gentle activation on interaction for motion-sensitive users
    window.addEventListener(
      "pointerdown",
      () => {
        if (!active) start();
      },
      { passive: true }
    );
    // auto-start if user prefers motion
    if (
      !(
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
    ) {
      start();
    } else {
      draw(0); // draw once
    }
  }
  function unmount() {
    stop();
    window.removeEventListener("resize", resize);
    cvs = ctx = null;
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
  window.Cymatic = { start, stop, unmount };
})();
