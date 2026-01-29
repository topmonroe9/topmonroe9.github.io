import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { colors, springConfigs } from "../utils/animations";
import { Language, texts, getText } from "../utils/localization";

type Scene4SeparationProps = {
  language: Language;
};

export const Scene4Separation: React.FC<Scene4SeparationProps> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainProgress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  const mainOpacity = interpolate(mainProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Separated documents
  const separatedDocs = [
    { endX: 200, endY: -120 },
    { endX: 240, endY: 0 },
    { endX: 200, endY: 120 },
  ];

  // Scanner line animation
  const scanY = interpolate((frame % 60), [0, 60], [0, 280]);

  return (
    <SceneWrapper
      title={getText(texts.scene4Title, language)}
      phase="solution"
      phaseLabel={language === "ru" ? "Решение" : "Solution"}
      stepNumber={1}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
          opacity: mainOpacity,
        }}
      >
        {/* Large PDF source */}
        <div
          style={{
            width: 260,
            height: 340,
            backgroundColor: colors.backgroundLight,
            border: `3px solid ${colors.primary}`,
            borderRadius: 14,
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 0 40px ${colors.primary}30`,
          }}
        >
          {/* PDF header */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: `2px solid ${colors.border}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                padding: "5px 10px",
                backgroundColor: colors.danger,
                borderRadius: 5,
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              PDF
            </div>
            <span
              style={{
                fontSize: 12,
                color: colors.textMuted,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              multi_doc.pdf
            </span>
          </div>

          {/* Stacked documents inside */}
          <div style={{ padding: 20, position: "relative" }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 20 + i * 6,
                  top: 10 + i * 6,
                  width: 160,
                  height: 220,
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  opacity: 0.5 - i * 0.08,
                }}
              />
            ))}
          </div>

          {/* Scanner line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 50 + scanY,
              width: "100%",
              height: 4,
              backgroundColor: colors.primary,
              boxShadow: `0 0 20px ${colors.primary}`,
              opacity: 0.8,
            }}
          />
        </div>

        {/* Arrow with AI icon */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="35" fill={colors.primary} opacity="0.2" />
            <circle cx="40" cy="40" r="25" fill={colors.primary} opacity="0.4" />
            <circle cx="40" cy="40" r="15" fill={colors.primary} />
            <text
              x="40"
              y="46"
              fontSize="14"
              fill="white"
              textAnchor="middle"
              fontWeight="bold"
              fontFamily="Inter, system-ui, sans-serif"
            >
              AI
            </text>
          </svg>
          <svg width="60" height="30" viewBox="0 0 60 30">
            <path d="M0 15 L40 15 L40 5 L60 15 L40 25 L40 15" fill={colors.primary} />
          </svg>
        </div>

        {/* Separated documents */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {separatedDocs.map((doc, i) => {
            const docDelay = 30 + i * 12;
            const docProgress = spring({
              frame: frame - docDelay,
              fps,
              config: springConfigs.bouncy,
            });

            const scale = interpolate(docProgress, [0, 1], [0.5, 1]);
            const opacity = interpolate(docProgress, [0, 0.3], [0, 1], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                  width: 160,
                  height: 120,
                  backgroundColor: colors.backgroundLight,
                  border: `3px solid ${colors.success}`,
                  borderRadius: 12,
                  padding: 14,
                  position: "relative",
                  boxShadow: `0 0 20px ${colors.success}30`,
                }}
              >
                {/* Document lines */}
                {[1, 2, 3].map((line) => (
                  <div
                    key={line}
                    style={{
                      height: 8,
                      backgroundColor: colors.border,
                      borderRadius: 4,
                      marginBottom: 8,
                      width: `${50 + line * 15}%`,
                    }}
                  />
                ))}

                {/* Check mark */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28">
                    <circle cx="14" cy="14" r="13" fill={colors.success} />
                    <path
                      d="M8 14l4 4 8-8"
                      stroke="white"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneWrapper>
  );
};
