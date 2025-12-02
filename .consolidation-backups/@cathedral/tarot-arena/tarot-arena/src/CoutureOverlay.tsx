// @ts-ignore
declare global {
  interface Window {
    CathedralCoutureEngine?: any;
  }
}
import React, { useEffect } from 'react';

export function CoutureOverlay() {
  useEffect(() => {
    // Dynamically load couture CSS and JS
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/packages/shared/assets/css/couture.css';
    document.head.appendChild(css);

    const script = document.createElement('script');
    script.type = 'module';
    script.src = '/packages/shared/couture-engine.js';
    script.onload = () => {
      if (window.CathedralCoutureEngine) {
        const couture = new window.CathedralCoutureEngine();
        couture.init();
      }
    };
    document.body.appendChild(script);
    // Add couture container
    const container = document.createElement('div');
    container.className = 'cathedral-couture';
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
      document.head.removeChild(css);
      document.body.removeChild(script);
    };
  }, []);
  return null;
}
