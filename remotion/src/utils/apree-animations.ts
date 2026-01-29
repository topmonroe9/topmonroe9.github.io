import { interpolate, spring } from "remotion";

// Re-export common utilities from main animations
export {
  springConfigs,
  colors,
  fadeIn,
  fadeOut,
  slideIn,
  scaleIn,
  staggeredDelay,
  getRandomPosition,
  getRandomRotation,
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
} from "./animations";

// Apree-specific timing (30fps)
export const APREE_FPS = 30;
export const APREE_TRANSITION_DURATION = 12;

// Scene durations for Apree video (in frames)
export const apreeSceneDurations = {
  scene1: 4 * APREE_FPS,   // 0-4s: Chaos of spreadsheets
  scene2: 4 * APREE_FPS,   // 4-8s: Spaghetti scripts
  scene3: 4 * APREE_FPS,   // 8-12s: Data leaks & losses
  scene4: 5 * APREE_FPS,   // 12-17s: Sales Panel
  scene5: 4 * APREE_FPS,   // 17-21s: Google Workspace
  scene6: 5 * APREE_FPS,   // 21-26s: SSO Authentication
  scene7: 5 * APREE_FPS,   // 26-31s: Analytics (MetaBase)
  scene8: 5 * APREE_FPS,   // 31-36s: Content System (DAM)
  scene9: 4 * APREE_FPS,   // 36-40s: Integration
  scene10: 4 * APREE_FPS,  // 40-44s: Results
  scene11: 5 * APREE_FPS,  // 44-49s: Tech Stack
};

// Calculate total duration accounting for transitions
export const getApreeTotalDuration = (): number => {
  const sceneDurationsArray = Object.values(apreeSceneDurations);
  const totalSceneDuration = sceneDurationsArray.reduce((a, b) => a + b, 0);
  const transitionCount = sceneDurationsArray.length - 1;
  return totalSceneDuration - transitionCount * APREE_TRANSITION_DURATION;
};

// Apree-specific colors (extending base palette)
export const apreeColors = {
  googleGreen: "#34A853",
  googleBlue: "#4285F4",
  googleYellow: "#FBBC05",
  googleRed: "#EA4335",
  aws: "#FF9900",
  metabase: "#509EE3",
  workspace: "#4285F4",
};

// Animation for connection lines between elements
export const animateConnectionLine = (
  frame: number,
  fps: number,
  delay: number = 0,
  duration: number = 0.5
): number => {
  return interpolate(
    frame - delay,
    [0, duration * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
};

// Pulse animation for highlights
export const pulseAnimation = (
  frame: number,
  fps: number,
  speed: number = 1.5
): number => {
  const cycle = (frame / fps) * speed * Math.PI * 2;
  return 0.85 + Math.sin(cycle) * 0.15;
};
