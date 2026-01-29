import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, springConfigs } from "../utils/animations";

type MetricCardProps = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
  color?: string;
};

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  icon,
  delay = 0,
  color = colors.success,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.bouncy,
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const y = interpolate(progress, [0, 1], [20, 0]);

  // Checkmark animation
  const checkProgress = spring({
    frame: frame - delay - 15,
    fps,
    config: springConfigs.snappy,
  });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${y}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "20px 32px",
        backgroundColor: colors.backgroundLight,
        borderRadius: 16,
        border: `2px solid ${color}40`,
        boxShadow: `0 0 40px ${color}20`,
        minWidth: 280,
      }}
    >
      {/* Checkmark icon */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: `${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          style={{
            transform: `scale(${checkProgress})`,
          }}
        >
          <path
            d="M6 14 L11 19 L22 8"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text content */}
      <div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: colors.text,
            fontFamily: "Inter, system-ui, sans-serif",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 16,
            color: colors.textMuted,
            fontFamily: "Inter, system-ui, sans-serif",
            marginTop: 4,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};
