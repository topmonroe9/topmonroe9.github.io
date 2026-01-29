import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, springConfigs, getRandomRotation } from "../utils/animations";

type DocumentIconProps = {
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
  delay?: number;
  variant?: "pdf" | "doc" | "unknown";
  showQuestionMark?: boolean;
  animateIn?: boolean;
  color?: string;
};

export const DocumentIcon: React.FC<DocumentIconProps> = ({
  x,
  y,
  rotation = 0,
  scale = 1,
  delay = 0,
  variant = "pdf",
  showQuestionMark = false,
  animateIn = true,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = animateIn
    ? spring({
        frame: frame - delay,
        fps,
        config: springConfigs.smooth,
      })
    : 1;

  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  const currentScale = interpolate(progress, [0, 1], [0.5, scale]);

  const iconColor = color || (variant === "pdf" ? colors.danger : variant === "doc" ? colors.primary : colors.textMuted);

  const width = 60;
  const height = 80;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `rotate(${rotation}deg) scale(${currentScale})`,
        opacity,
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Document body */}
      <svg width={width} height={height} viewBox="0 0 60 80">
        {/* Page background */}
        <path
          d="M5 0 L45 0 L55 10 L55 75 Q55 80 50 80 L10 80 Q5 80 5 75 L5 0 Z"
          fill={colors.backgroundLight}
          stroke={iconColor}
          strokeWidth="2"
        />
        {/* Folded corner */}
        <path
          d="M45 0 L45 10 L55 10"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
        />
        <path
          d="M45 0 L45 10 L55 10 Z"
          fill={iconColor}
          opacity="0.3"
        />
        {/* Lines representing text */}
        <rect x="12" y="20" width="31" height="4" fill={colors.border} rx="2" />
        <rect x="12" y="30" width="25" height="4" fill={colors.border} rx="2" />
        <rect x="12" y="40" width="28" height="4" fill={colors.border} rx="2" />
        <rect x="12" y="50" width="20" height="4" fill={colors.border} rx="2" />

        {/* File type badge */}
        <rect
          x="10"
          y="60"
          width="25"
          height="12"
          fill={iconColor}
          rx="2"
        />
        <text
          x="22.5"
          y="69"
          fontSize="8"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          fontFamily="Inter, system-ui, sans-serif"
        >
          {variant === "pdf" ? "PDF" : variant === "doc" ? "DOC" : "???"}
        </text>
      </svg>

      {/* Question mark overlay */}
      {showQuestionMark && (
        <div
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: colors.warning,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 18,
            color: colors.background,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          ?
        </div>
      )}
    </div>
  );
};

// Small document icon for lists
export const SmallDocumentIcon: React.FC<{ color?: string }> = ({ color = colors.primary }) => {
  return (
    <svg width="24" height="30" viewBox="0 0 24 30">
      <path
        d="M2 0 L18 0 L22 4 L22 28 Q22 30 20 30 L4 30 Q2 30 2 28 L2 0 Z"
        fill={colors.backgroundLight}
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M18 0 L18 4 L22 4" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};
