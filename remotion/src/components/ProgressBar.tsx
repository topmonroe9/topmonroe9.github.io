import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, springConfigs } from "../utils/animations";

type ProgressBarProps = {
  progress: number; // 0-100
  delay?: number;
  width?: number;
  height?: number;
  showLabel?: boolean;
  label?: string;
  color?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  delay = 0,
  width = 400,
  height = 20,
  showLabel = true,
  label,
  color = colors.success,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerProgress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const containerOpacity = interpolate(containerProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const barProgress = spring({
    frame: frame - delay - 10,
    fps,
    config: { ...springConfigs.smooth, damping: 100 },
  });

  const currentProgress = interpolate(barProgress, [0, 1], [0, progress]);

  return (
    <div
      style={{
        opacity: containerOpacity,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
      }}
    >
      {showLabel && (
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: colors.text,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {label || `${Math.round(currentProgress)}%`}
        </div>
      )}
      <div
        style={{
          width,
          height,
          backgroundColor: colors.backgroundLight,
          borderRadius: height / 2,
          overflow: "hidden",
          border: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            width: `${currentProgress}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: height / 2,
            boxShadow: `0 0 10px ${color}80`,
          }}
        />
      </div>
    </div>
  );
};

// Counter component
type AnimatedCounterProps = {
  from?: number;
  to: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  fontSize?: number;
  color?: string;
};

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  delay = 0,
  suffix = "",
  prefix = "",
  fontSize = 48,
  color = colors.success,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { ...springConfigs.smooth, damping: 100 },
  });

  const opacity = interpolate(progress, [0, 0.2], [0, 1], {
    extrapolateRight: "clamp",
  });

  const currentValue = interpolate(progress, [0, 1], [from, to]);

  return (
    <div
      style={{
        opacity,
        fontSize,
        fontWeight: 700,
        color,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {prefix}
      {Math.round(currentValue)}
      {suffix}
    </div>
  );
};
