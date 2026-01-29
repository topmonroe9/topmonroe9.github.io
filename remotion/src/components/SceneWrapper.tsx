import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, springConfigs } from "../utils/animations";

type SceneWrapperProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  phase?: "problem" | "solution" | "result";
  phaseLabel?: string;
  stepNumber?: number;
};

export const SceneWrapper: React.FC<SceneWrapperProps> = ({
  children,
  title,
  subtitle,
  phase = "solution",
  phaseLabel,
  stepNumber,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  const headerOpacity = interpolate(headerProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleProgress = spring({
    frame: frame - 10,
    fps,
    config: springConfigs.smooth,
  });

  const titleOpacity = interpolate(titleProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(titleProgress, [0, 1], [20, 0]);

  const phaseColors = {
    problem: colors.danger,
    solution: colors.primary,
    result: colors.success,
  };

  const phaseColor = phaseColors[phase];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: phaseColor,
          opacity: headerOpacity,
        }}
      />

      {/* Phase badge + Step number */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: headerOpacity,
        }}
      >
        {phaseLabel && (
          <div
            style={{
              padding: "8px 16px",
              backgroundColor: `${phaseColor}20`,
              border: `2px solid ${phaseColor}`,
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              color: phaseColor,
              fontFamily: "Inter, system-ui, sans-serif",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {phaseLabel}
          </div>
        )}
        {stepNumber !== undefined && (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: phaseColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
              color: "white",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {stepNumber}
          </div>
        )}
      </div>

      {/* Main content area */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 40,
          right: 40,
          bottom: 140,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>

      {/* Bottom title bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "24px 40px",
          backgroundColor: `${colors.background}F0`,
          borderTop: `1px solid ${colors.border}`,
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: colors.text,
              fontFamily: "Inter, system-ui, sans-serif",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 18,
                color: colors.textMuted,
                fontFamily: "Inter, system-ui, sans-serif",
                textAlign: "center",
                marginTop: 8,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
