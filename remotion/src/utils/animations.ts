import { interpolate, spring } from "remotion";

// Spring configurations
export const springConfigs = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  bouncy: { damping: 8 },
  heavy: { damping: 15, stiffness: 80, mass: 2 },
};

// Color palette
export const colors = {
  background: "#0f172a",
  backgroundLight: "#1e293b",
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  text: "#f8fafc",
  textMuted: "#94a3b8",
  border: "#334155",
};

// Timing helpers (in frames at 30fps)
export const TRANSITION_DURATION = 12;
export const FPS = 30;

// Video dimensions (1:1 square format)
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1080;

// Scene durations (in frames)
export const sceneDurations = {
  scene1: 5 * FPS, // 0-5s: Chaos
  scene2: 3 * FPS, // 5-8s: No structure
  scene3: 3 * FPS, // 8-11s: Registry problem
  scene4: 4 * FPS, // 11-15s: Separation
  scene5: 6 * FPS, // 15-21s: AI analysis
  scene6: 4 * FPS, // 21-25s: Column mapping
  scene7: 5 * FPS, // 25-30s: Matching
  scene8: 5 * FPS, // 30-35s: Export
  scene9: 5 * FPS, // 35-40s: Tech stack
};

// Calculate total duration accounting for transitions
export const getTotalDuration = (): number => {
  const sceneDurationsArray = Object.values(sceneDurations);
  const totalSceneDuration = sceneDurationsArray.reduce((a, b) => a + b, 0);
  const transitionCount = sceneDurationsArray.length - 1;
  return totalSceneDuration - transitionCount * TRANSITION_DURATION;
};

// Fade in animation
export const fadeIn = (
  frame: number,
  fps: number,
  durationSeconds: number = 0.5,
  delay: number = 0
): number => {
  return interpolate(frame - delay, [0, durationSeconds * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

// Fade out animation
export const fadeOut = (
  frame: number,
  totalFrames: number,
  fps: number,
  durationSeconds: number = 0.5
): number => {
  const startFrame = totalFrames - durationSeconds * fps;
  return interpolate(frame, [startFrame, totalFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

// Slide in from direction
export const slideIn = (
  frame: number,
  fps: number,
  direction: "left" | "right" | "top" | "bottom" = "left",
  distance: number = 100
): number => {
  const progress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  const offset = interpolate(progress, [0, 1], [distance, 0]);

  switch (direction) {
    case "left":
      return -offset;
    case "right":
      return offset;
    case "top":
      return -offset;
    case "bottom":
      return offset;
  }
};

// Scale animation
export const scaleIn = (
  frame: number,
  fps: number,
  delay: number = 0
): number => {
  return spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });
};

// Staggered animation helper
export const staggeredDelay = (
  index: number,
  delayPerItem: number = 5
): number => {
  return index * delayPerItem;
};

// Random position generator for chaos animations
export const getRandomPosition = (
  seed: number,
  maxX: number,
  maxY: number
): { x: number; y: number } => {
  const pseudoRandom = (s: number) => {
    const x = Math.sin(s * 12.9898 + s * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  return {
    x: pseudoRandom(seed) * maxX,
    y: pseudoRandom(seed + 1) * maxY,
  };
};

// Random rotation for chaos animations
export const getRandomRotation = (seed: number, maxRotation: number = 30): number => {
  const pseudoRandom = (s: number) => {
    const x = Math.sin(s * 12.9898 + s * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return (pseudoRandom(seed) - 0.5) * 2 * maxRotation;
};
