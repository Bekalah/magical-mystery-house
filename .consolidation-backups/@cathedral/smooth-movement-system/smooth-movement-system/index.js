/**
 * Smooth Movement System
 * Fluid animation and motion controls for Cathedral experiences
 */

export const easingFunctions = {
  LINEAR: (t) => t,
  EASE_IN: (t) => t * t,
  EASE_OUT: (t) => t * (2 - t),
  EASE_IN_OUT: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  SMOOTH: (t) => t * t * (3 - 2 * t),
};

export const createMovement = (
  start,
  end,
  duration = 1000,
  easing = "SMOOTH"
) => {
  return {
    type: "smooth-movement",
    start,
    end,
    duration,
    easing: easingFunctions[easing] || easingFunctions.SMOOTH,
    timestamp: Date.now(),
  };
};

export const interpolate = (value1, value2, t) => {
  return value1 + (value2 - value1) * t;
};

export default {
  easingFunctions,
  createMovement,
  interpolate,
};
