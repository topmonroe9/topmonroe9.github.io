import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { TechStackRow } from "../components/TechBadge";
import { colors, springConfigs } from "../utils/animations";
import { Language, texts, getText } from "../utils/localization";

type Scene9TechStackProps = {
  language: Language;
};

export const Scene9TechStack: React.FC<Scene9TechStackProps> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoProgress = spring({
    frame,
    fps,
    config: springConfigs.bouncy,
  });

  const logoOpacity = interpolate(logoProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0.5, 1]);

  // Glow animation
  const glowIntensity = interpolate(Math.sin(frame / 15), [-1, 1], [0.3, 0.6]);

  // Tech badges
  const technologies = ["Python", "FastAPI", "Claude API", "GCP Vision", "RapidFuzz"];

  return (
    <SceneWrapper
      title=""
      phase="result"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
            opacity: glowIntensity,
          }}
        />

        {/* Logo and title */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            zIndex: 1,
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 28,
              backgroundColor: colors.backgroundLight,
              border: `4px solid ${colors.primary}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 50px ${colors.primary}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')}`,
            }}
          >
            <svg width="90" height="90" viewBox="0 0 90 90">
              {/* Document stack */}
              <rect x="10" y="18" width="42" height="54" rx="5" fill={colors.border} opacity="0.3" />
              <rect x="16" y="12" width="42" height="54" rx="5" fill={colors.border} opacity="0.5" />
              <rect x="22" y="6" width="42" height="54" rx="5" fill={colors.primary} />

              {/* Checkmark circle */}
              <circle cx="62" cy="62" r="22" fill={colors.success} />
              <path
                d="M52 62l6 6 12-12"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Project name */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: colors.text,
              fontFamily: "Inter, system-ui, sans-serif",
              textAlign: "center",
              letterSpacing: "-1px",
            }}
          >
            {getText(texts.scene9Title, language)}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 18,
              color: colors.textMuted,
              fontFamily: "Inter, system-ui, sans-serif",
              textAlign: "center",
              maxWidth: 500,
            }}
          >
            {language === "ru"
              ? "Автоматическое сопоставление документов с реестрами"
              : "Automatic document-to-registry matching"}
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ zIndex: 1 }}>
          <TechStackRow
            technologies={technologies}
            startDelay={30}
            delayBetween={8}
          />
        </div>

        {/* Attribution */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            zIndex: 1,
          }}
        >
          {(() => {
            const attrProgress = spring({
              frame: frame - 60,
              fps,
              config: springConfigs.smooth,
            });

            return (
              <div
                style={{
                  opacity: interpolate(attrProgress, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
                  fontSize: 16,
                  color: colors.textMuted,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                ALFA Project • 2024
              </div>
            );
          })()}
        </div>
      </div>
    </SceneWrapper>
  );
};
