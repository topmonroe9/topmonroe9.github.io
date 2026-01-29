import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, springConfigs } from "../utils/animations";
import { apreeColors } from "../utils/apree-animations";

type GoogleSheetIconProps = {
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
  delay?: number;
  animateIn?: boolean;
  showError?: boolean;
};

export const GoogleSheetIcon: React.FC<GoogleSheetIconProps> = ({
  x,
  y,
  rotation = 0,
  scale = 1,
  delay = 0,
  animateIn = true,
  showError = false,
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

  const width = 60;
  const height = 75;

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
      }}
    >
      <svg width={width} height={height} viewBox="0 0 60 75">
        {/* Document body */}
        <path
          d="M5 0 L40 0 L55 15 L55 70 Q55 75 50 75 L10 75 Q5 75 5 70 L5 0 Z"
          fill={colors.backgroundLight}
          stroke={apreeColors.googleGreen}
          strokeWidth="2"
        />
        {/* Folded corner */}
        <path d="M40 0 L40 15 L55 15" fill="none" stroke={apreeColors.googleGreen} strokeWidth="2" />
        <path d="M40 0 L40 15 L55 15 Z" fill={apreeColors.googleGreen} opacity="0.3" />

        {/* Grid lines (spreadsheet look) */}
        <line x1="12" y1="25" x2="48" y2="25" stroke={apreeColors.googleGreen} strokeWidth="1.5" opacity="0.6" />
        <line x1="12" y1="35" x2="48" y2="35" stroke={apreeColors.googleGreen} strokeWidth="1.5" opacity="0.6" />
        <line x1="12" y1="45" x2="48" y2="45" stroke={apreeColors.googleGreen} strokeWidth="1.5" opacity="0.6" />
        <line x1="12" y1="55" x2="48" y2="55" stroke={apreeColors.googleGreen} strokeWidth="1.5" opacity="0.6" />

        <line x1="25" y1="20" x2="25" y2="60" stroke={apreeColors.googleGreen} strokeWidth="1.5" opacity="0.6" />
        <line x1="38" y1="20" x2="38" y2="60" stroke={apreeColors.googleGreen} strokeWidth="1.5" opacity="0.6" />

        {/* Cells with data */}
        <rect x="13" y="26" width="10" height="8" fill={apreeColors.googleGreen} opacity="0.3" />
        <rect x="26" y="36" width="10" height="8" fill={apreeColors.googleGreen} opacity="0.3" />
        <rect x="39" y="46" width="8" height="8" fill={apreeColors.googleGreen} opacity="0.3" />
      </svg>

      {/* Error badge */}
      {showError && (
        <div
          style={{
            position: "absolute",
            top: -8,
            right: -8,
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: colors.danger,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 16,
            color: "white",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          !
        </div>
      )}
    </div>
  );
};

// Small version for lists
export const SmallGoogleSheetIcon: React.FC<{ color?: string }> = ({
  color = apreeColors.googleGreen
}) => {
  return (
    <svg width="28" height="34" viewBox="0 0 28 34">
      <path
        d="M2 0 L19 0 L26 7 L26 31 Q26 34 23 34 L5 34 Q2 34 2 31 L2 0 Z"
        fill={colors.backgroundLight}
        stroke={color}
        strokeWidth="1.5"
      />
      <line x1="6" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="6" y1="18" x2="22" y2="18" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="6" y1="24" x2="22" y2="24" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="14" y1="10" x2="14" y2="26" stroke={color} strokeWidth="1" opacity="0.6" />
    </svg>
  );
};
