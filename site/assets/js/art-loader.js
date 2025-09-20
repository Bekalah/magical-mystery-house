// art-loader.js
/**
 * Fetches a hero art manifest and mounts the hero image into the page with a graceful fallback.
 *
 * Attempts to GET /assets/art/manifest.json (no-store). If a manifest with `hero.src` is found,
 * creates an Image (eager loading, async decoding), sets its `src` and `alt`, clears and appends
 * it to the element with id "hero-art", and hides the element with id "opus". On fetch failure,
 * non-OK responses, or a missing `hero.src`, the function logs a warning and leaves the UI unchanged.
 */
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
