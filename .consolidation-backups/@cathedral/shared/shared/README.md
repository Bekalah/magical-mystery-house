
# Cathedral Shared Engines

This package contains shared museum-quality UI, visual, and alchemical engine components for all Cathedral apps, including the haute couture baseline style.

## Haute Couture Engine (Miss Sohee-Inspired)

### Features
- Dimensional layers, veils, and parallax for true depth
- Pearl and petal embellishments, threadwork, and couture lighting
- Life-size, human-scale proportions and perspective
- ND-friendly, performance-optimized settings
- Easily extensible for arcanae, angels, taras, and more

### Usage
1. **Import the CSS and JS in your app:**
	```html
	<link rel="stylesheet" href="/packages/shared/assets/css/couture.css" />
	<script type="module" src="/packages/shared/couture-engine.js"></script>
	```
2. **Add the couture container to your HTML:**
	```html
	<div class="cathedral-couture"></div>
	```
3. **Initialize the engine:**
	```js
	window.addEventListener('DOMContentLoaded', () => {
	  if (window.CathedralCoutureEngine) {
		 const couture = new window.CathedralCoutureEngine();
		 couture.init();
	  }
	});
	```

### Customization
- Use the engine's methods to add petal cascades, pearl constellations, and couture overlays for specific archetypes or scenes.
- Connect to your arcanae, angels, or taras for dynamic, living effects.

### Example
See `apps/web/index.html` for a working integration example.

---
This engine is the baseline for all cathedral apps. Each app can add its own arcanae/character overlays, but the couture style ensures a unified, elegant, and immersive experience.

## Alchemy Engine

1. Import `alchemy-engine.js` in your app's main HTML or JS/TS entry point:
	```html
	<script src="../../packages/shared/alchemy-engine.js"></script>
	```
2. Add a container in your HTML where the engine will render:
	```html
	<div class="alchemy-container"></div>
	```
3. Initialize the engine in your app:
	```js
	const engine = new window.AlchemyEngine();
	engine.init();
	```
4. Ensure the angels data is available at the correct path or update the fetch path in the engine.

## Extend
- Add more shared museum-quality UI, CSS, and data here for all apps.
- Update and align with your modular codex and research vision.
