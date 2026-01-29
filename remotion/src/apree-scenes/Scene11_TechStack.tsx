import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { TechBadge, TechStackRow } from "../components/TechBadge";
import { colors, springConfigs } from "../utils/animations";
import { Language, apreeTexts, getApreeText } from "../utils/apree-localization";

type Scene11Props = {
  language: Language;
};

export const Scene11_TechStack: React.FC<Scene11Props> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoProgress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  const logoOpacity = interpolate(logoProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);

  // Tech stack rows with different delays
  const row1 = ["AWS", "Next.js", "NestJS", "TypeScript"];
  const row2 = ["PostgreSQL", "Redis", "Docker", "Traefik"];
  const row3 = ["Lambda", "S3", "CloudFront", "MetaBase"];

  return (
    <SceneWrapper
      title={getApreeText(apreeTexts.scene11Title, language)}
      subtitle={getApreeText(apreeTexts.scene11Subtitle, language)}
      phase="result"
      phaseLabel={getApreeText(apreeTexts.result, language)}
      stepNumber={2}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        {/* Logo and title */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <PlatformLogo />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: colors.text,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Enterprise IT Platform
            </span>
          </div>
        </div>

        {/* Tech stack badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginTop: 20,
          }}
        >
          <TechStackRow technologies={row1} startDelay={20} delayBetween={6} />
          <TechStackRow technologies={row2} startDelay={50} delayBetween={6} />
          <TechStackRow technologies={row3} startDelay={80} delayBetween={6} />
        </div>

        {/* Cost badge */}
        <CostBadge frame={frame} fps={fps} delay={110} />
      </div>
    </SceneWrapper>
  );
};

// Platform logo component
const PlatformLogo: React.FC = () => {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: colors.backgroundLight,
        border: `2px solid ${colors.primary}`,
        boxShadow: `0 0 40px ${colors.primary}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="60" height="60" viewBox="0 0 60 60">
        {/* Network/Platform icon */}
        <circle
          cx="30"
          cy="30"
          r="24"
          fill="none"
          stroke={colors.primary}
          strokeWidth="2"
          opacity="0.3"
        />
        <circle
          cx="30"
          cy="30"
          r="16"
          fill="none"
          stroke={colors.primary}
          strokeWidth="2"
          opacity="0.5"
        />

        {/* Center node */}
        <circle cx="30" cy="30" r="6" fill={colors.primary} />

        {/* Outer nodes */}
        <circle cx="30" cy="10" r="4" fill={colors.success} />
        <circle cx="47" cy="20" r="4" fill={colors.warning} />
        <circle cx="47" cy="40" r="4" fill={colors.secondary} />
        <circle cx="30" cy="50" r="4" fill={colors.success} />
        <circle cx="13" cy="40" r="4" fill={colors.primary} />
        <circle cx="13" cy="20" r="4" fill={colors.warning} />

        {/* Connection lines */}
        <path
          d="M30 10 L30 24 M47 20 L36 26 M47 40 L36 34 M30 50 L30 36 M13 40 L24 34 M13 20 L24 26"
          stroke={colors.primary}
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};

// Cost badge component
const CostBadge: React.FC<{
  frame: number;
  fps: number;
  delay: number;
}> = ({ frame, fps, delay }) => {
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

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${y}px)`,
        display: "flex",
        gap: 24,
        marginTop: 16,
      }}
    >
      {/* Microservices count */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 20px",
          backgroundColor: colors.backgroundLight,
          borderRadius: 10,
          border: `1px solid ${colors.success}40`,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <rect x="2" y="2" width="6" height="6" rx="1" fill={colors.success} />
          <rect x="12" y="2" width="6" height="6" rx="1" fill={colors.success} opacity="0.7" />
          <rect x="2" y="12" width="6" height="6" rx="1" fill={colors.success} opacity="0.5" />
          <rect x="12" y="12" width="6" height="6" rx="1" fill={colors.success} opacity="0.3" />
        </svg>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: colors.text,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          15+ microservices
        </span>
      </div>

      {/* Monthly cost */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 20px",
          backgroundColor: colors.backgroundLight,
          borderRadius: 10,
          border: `1px solid ${colors.success}40`,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" fill={colors.success} opacity="0.2" />
          <text
            x="10"
            y="14"
            textAnchor="middle"
            fontSize="10"
            fill={colors.success}
            fontWeight="bold"
          >
            $
          </text>
        </svg>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: colors.text,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          $350/month
        </span>
      </div>
    </div>
  );
};
