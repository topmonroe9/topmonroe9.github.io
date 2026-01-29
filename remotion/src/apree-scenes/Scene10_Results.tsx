import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { MetricCard } from "../apree-components";
import { colors, springConfigs } from "../utils/animations";
import { Language, apreeTexts, getApreeText } from "../utils/apree-localization";

type Scene10Props = {
  language: Language;
};

export const Scene10_Results: React.FC<Scene10Props> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Metrics with staggered delays
  const metrics = [
    {
      value: "90%",
      label: getApreeText(apreeTexts.scene10Metric1, language),
      color: colors.success,
      delay: 0,
    },
    {
      value: "120+",
      label: getApreeText(apreeTexts.scene10Metric2, language),
      color: colors.primary,
      delay: 20,
    },
    {
      value: "0",
      label: getApreeText(apreeTexts.scene10Metric3, language),
      color: colors.success,
      delay: 40,
    },
  ];

  return (
    <SceneWrapper
      title={getApreeText(apreeTexts.scene10Title, language)}
      phase="result"
      phaseLabel={getApreeText(apreeTexts.result, language)}
      stepNumber={1}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Metrics row */}
        <div
          style={{
            display: "flex",
            gap: 30,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {metrics.map((metric, i) => (
            <AnimatedMetric
              key={i}
              value={metric.value}
              label={metric.label}
              color={metric.color}
              delay={metric.delay}
              frame={frame}
              fps={fps}
            />
          ))}
        </div>

        {/* Success celebration */}
        <SuccessBanner frame={frame} fps={fps} delay={70} />
      </div>
    </SceneWrapper>
  );
};

// Animated metric with counting effect
const AnimatedMetric: React.FC<{
  value: string;
  label: string;
  color: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ value, label, color, delay, frame, fps }) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.bouncy,
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const y = interpolate(progress, [0, 1], [30, 0]);

  // Number counting animation
  const countDuration = 30;
  const countProgress = interpolate(
    frame - delay,
    [0, countDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Parse the target value
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const displayValue =
    numericValue === 0
      ? "0"
      : `${Math.floor(numericValue * countProgress)}${suffix}`;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${y}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: "28px 40px",
          backgroundColor: colors.backgroundLight,
          borderRadius: 20,
          border: `2px solid ${color}40`,
          boxShadow: `0 0 50px ${color}20`,
          minWidth: 220,
        }}
      >
        {/* Checkmark icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: `${color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckmarkIcon color={color} progress={countProgress} />
        </div>

        {/* Value */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: color,
            fontFamily: "Inter, system-ui, sans-serif",
            lineHeight: 1,
          }}
        >
          {displayValue}
        </div>

        {/* Label */}
        <div
          style={{
            fontSize: 14,
            color: colors.textMuted,
            fontFamily: "Inter, system-ui, sans-serif",
            textAlign: "center",
            maxWidth: 160,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

// Animated checkmark icon
const CheckmarkIcon: React.FC<{ color: string; progress: number }> = ({
  color,
  progress,
}) => {
  const dashOffset = interpolate(progress, [0, 1], [30, 0]);

  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <path
        d="M8 16 L13 21 L24 10"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="30"
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
};

// Success banner at bottom
const SuccessBanner: React.FC<{
  frame: number;
  fps: number;
  delay: number;
}> = ({ frame, fps, delay }) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const y = interpolate(progress, [0, 1], [20, 0]);

  // Stars animation
  const stars = [
    { x: -120, delay: 0 },
    { x: -60, delay: 5 },
    { x: 0, delay: 10 },
    { x: 60, delay: 5 },
    { x: 120, delay: 0 },
  ];

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Stars row */}
      <div style={{ display: "flex", gap: 8 }}>
        {stars.map((star, i) => {
          const starProgress = spring({
            frame: frame - delay - star.delay,
            fps,
            config: springConfigs.bouncy,
          });

          const starScale = interpolate(starProgress, [0, 1], [0, 1]);
          const starOpacity = interpolate(starProgress, [0, 0.5], [0, 1], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                opacity: starOpacity,
                transform: `scale(${starScale})`,
                fontSize: 24,
              }}
            >
              ⭐
            </div>
          );
        })}
      </div>

      {/* Banner */}
      <div
        style={{
          padding: "12px 32px",
          background: `linear-gradient(135deg, ${colors.success}20, ${colors.primary}20)`,
          borderRadius: 12,
          border: `1px solid ${colors.success}40`,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: colors.text,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          🎉 Digital Transformation Complete
        </span>
      </div>
    </div>
  );
};
