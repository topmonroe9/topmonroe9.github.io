import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../utils/animations";

type ConnectionLineProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay?: number;
  duration?: number;
  color?: string;
  strokeWidth?: number;
  dashed?: boolean;
  showPulse?: boolean;
  curved?: boolean;
};

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  startX,
  startY,
  endX,
  endY,
  delay = 0,
  duration = 0.5,
  color = colors.primary,
  strokeWidth = 2,
  dashed = false,
  showPulse = false,
  curved = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(
    frame - delay,
    [0, duration * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Calculate path
  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);

  // Curved path control points
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const curveOffset = curved ? Math.min(length * 0.3, 50) : 0;

  // Perpendicular offset for curve
  const perpX = -dy / length * curveOffset;
  const perpY = dx / length * curveOffset;

  const pathD = curved
    ? `M ${startX} ${startY} Q ${midX + perpX} ${midY + perpY} ${endX} ${endY}`
    : `M ${startX} ${startY} L ${endX} ${endY}`;

  // Animated dash offset for pulse effect
  const pulseOffset = showPulse ? (frame * 2) % 40 : 0;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <defs>
        <linearGradient
          id={`gradient-${startX}-${startY}`}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Background line (full, dimmed) */}
      <path
        d={pathD}
        fill="none"
        stroke={colors.border}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? "8,8" : "none"}
        opacity={0.3}
      />

      {/* Animated line */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#gradient-${startX}-${startY})`}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? "8,8" : "none"}
        strokeDashoffset={showPulse ? pulseOffset : 0}
        pathLength={1}
        style={{
          strokeDasharray: `${progress} 1`,
        }}
      />

      {/* Glow effect */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth + 4}
        opacity={0.2 * progress}
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: `${progress} 1`,
        }}
      />
    </svg>
  );
};

// Animated connection between multiple points
type MultiConnectionProps = {
  points: Array<{ x: number; y: number }>;
  delay?: number;
  staggerDelay?: number;
  color?: string;
  curved?: boolean;
};

export const MultiConnection: React.FC<MultiConnectionProps> = ({
  points,
  delay = 0,
  staggerDelay = 10,
  color = colors.primary,
  curved = true,
}) => {
  if (points.length < 2) return null;

  return (
    <>
      {points.slice(0, -1).map((point, index) => (
        <ConnectionLine
          key={index}
          startX={point.x}
          startY={point.y}
          endX={points[index + 1].x}
          endY={points[index + 1].y}
          delay={delay + index * staggerDelay}
          color={color}
          curved={curved}
        />
      ))}
    </>
  );
};
