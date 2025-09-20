// art-loader.js
// ND-safe loader that enforces WEBP-only hero art with graceful fallback.
export async function mountArt() {
  let res;
  try {
    res = await fetch('/assets/art/manifest.json', { cache: 'no-store' });
  } catch (error) {
    console.warn('Art manifest request failed; keeping first-paint canvas visible.', error);
    return;
  }
  if (!res.ok) {
    console.warn('Art manifest unavailable; keeping first-paint canvas visible.');
    return;
  }
  const manifest = await res.json();
  if (!manifest?.hero?.src) {
    console.warn('Art manifest missing hero src; nothing to mount.');
    return;
  }

  const img = new Image();
  img.loading = 'eager';
  img.decoding = 'async';
  img.src = manifest.hero.src;
  img.alt = manifest.hero.alt || '';

  const host = document.getElementById('hero-art');
  if (host) {
    host.textContent = '';
    host.append(img);
  }

  const stage = document.getElementById('opus');
  if (stage) {
    stage.hidden = true;
  }
}
