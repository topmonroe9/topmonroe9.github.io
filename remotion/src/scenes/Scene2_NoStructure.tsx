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

type Scene2NoStructureProps = {
  language: Language;
};

export const Scene2NoStructure: React.FC<Scene2NoStructureProps> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Large PDF with documents inside
  const pdfProgress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  const pdfOpacity = interpolate(pdfProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Question marks
  const questionMarks = ["?", "?", "?"];

  return (
    <SceneWrapper
      title={getText(texts.scene2Title, language)}
      phase="problem"
      phaseLabel={language === "ru" ? "Проблема" : "Problem"}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
          opacity: pdfOpacity,
        }}
      >
        {/* Large PDF container */}
        <div
          style={{
            width: 320,
            height: 420,
            backgroundColor: colors.backgroundLight,
            border: `4px solid ${colors.danger}`,
            borderRadius: 16,
            position: "relative",
            boxShadow: `0 0 50px ${colors.danger}30`,
          }}
        >
          {/* PDF header */}
          <div
            style={{
              padding: "14px 20px",
              borderBottom: `2px solid ${colors.border}`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                padding: "6px 12px",
                backgroundColor: colors.danger,
                borderRadius: 6,
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              PDF
            </div>
            <span
              style={{
                fontSize: 14,
                color: colors.textMuted,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              batch_2024.pdf
            </span>
          </div>

          {/* Stacked documents inside */}
          <div style={{ padding: 24, position: "relative", height: 320 }}>
            {Array.from({ length: 6 }).map((_, i) => {
              const docDelay = 15 + i * 4;
              const docProgress = spring({
                frame: frame - docDelay,
                fps,
                config: springConfigs.smooth,
              });

              const docOpacity = interpolate(docProgress, [0, 0.5], [0, 0.6], {
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 24 + i * 8,
                    top: 10 + i * 8,
                    width: 200,
                    height: 260,
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 6,
                    opacity: docOpacity,
                    boxShadow: "3px 3px 10px rgba(0,0,0,0.3)",
                    padding: 14,
                  }}
                >
                  {/* Document lines */}
                  {[1, 2, 3, 4].map((line) => (
                    <div
                      key={line}
                      style={{
                        height: 10,
                        backgroundColor: colors.border,
                        borderRadius: 5,
                        marginBottom: 10,
                        width: `${60 + Math.random() * 40}%`,
                        opacity: 0.5,
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Question marks and problem indicators */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {[
            { icon: "❓", label: language === "ru" ? "Нет имён" : "No names" },
            { icon: "🔢", label: language === "ru" ? "Нет номеров" : "No numbers" },
            { icon: "🔍", label: language === "ru" ? "Нет поиска" : "No search" },
          ].map((item, index) => {
            const itemDelay = 30 + index * 10;
            const itemProgress = spring({
              frame: frame - itemDelay,
              fps,
              config: springConfigs.bouncy,
            });

            const itemOpacity = interpolate(itemProgress, [0, 0.3], [0, 1], {
              extrapolateRight: "clamp",
            });
            const itemScale = interpolate(itemProgress, [0, 1], [0.8, 1]);

            return (
              <div
                key={index}
                style={{
                  opacity: itemOpacity,
                  transform: `scale(${itemScale})`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 24px",
                  backgroundColor: colors.backgroundLight,
                  border: `2px solid ${colors.warning}`,
                  borderRadius: 12,
                  minWidth: 200,
                }}
              >
                <span style={{ fontSize: 32 }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: colors.warning,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </SceneWrapper>
  );
};
