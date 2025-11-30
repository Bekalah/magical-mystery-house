/**
 * Portal System
 * Navigation and transition system for Cathedral experiences
 */

export const portalTypes = {
  SACRED: "sacred",
  COSMIC: "cosmic",
  FRACTAL: "fractal",
  MYSTICAL: "mystical",
  DIMENSIONAL: "dimensional",
};

export const createPortal = (destination, type = "SACRED") => {
  return {
    type: "portal",
    portalType: type,
    destination,
    active: true,
    timestamp: Date.now(),
  };
};

export const transitionEffects = {
  FADE: { duration: 800, easing: "ease-in-out" },
  SPIRAL: { duration: 1200, easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)" },
  VORTEX: { duration: 1000, easing: "ease-out" },
};

export default {
  portalTypes,
  createPortal,
  transitionEffects,
};
