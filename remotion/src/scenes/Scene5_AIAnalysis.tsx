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

type Scene5AIAnalysisProps = {
  language: Language;
};

export const Scene5AIAnalysis: React.FC<Scene5AIAnalysisProps> = ({ language }) => {
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

  // Scanning beam
  const scanY = interpolate((frame % 80), [0, 80], [0, 320]);

  // Extracted fields
  const fields = [
    { key: "documentName", value: language === "ru" ? "Договор поставки" : "Supply Agreement", icon: "📄" },
    { key: "documentType", value: language === "ru" ? "Договор" : "Contract", icon: "📋" },
    { key: "amountWithoutVAT", value: "1 250 000 ₽", icon: "💰" },
    { key: "taxAmount", value: "250 000 ₽", icon: "🧾" },
  ];

  return (
    <SceneWrapper
      title={getText(texts.scene5Title, language)}
      subtitle={getText(texts.scene5Subtitle, language)}
      phase="solution"
      phaseLabel={language === "ru" ? "Решение" : "Solution"}
      stepNumber={2}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
          opacity: mainOpacity,
        }}
      >
        {/* Document being analyzed */}
        <div
          style={{
            width: 280,
            height: 380,
            backgroundColor: colors.backgroundLight,
            border: `3px solid ${colors.primary}`,
            borderRadius: 14,
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 0 40px ${colors.primary}30`,
          }}
        >
          {/* Document content */}
          <div style={{ padding: 20 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: colors.text,
                marginBottom: 10,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {language === "ru" ? "ДОГОВОР ПОСТАВКИ" : "SUPPLY AGREEMENT"}
            </div>
            <div
              style={{
                fontSize: 12,
                color: colors.textMuted,
                marginBottom: 16,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              № 123/2024 от 15.01.2024
            </div>

            {/* Document lines */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 10,
                  backgroundColor: colors.border,
                  borderRadius: 5,
                  marginBottom: 10,
                  width: `${50 + Math.random() * 50}%`,
                  opacity: 0.5,
                }}
              />
            ))}

            {/* Highlighted amount box */}
            <div
              style={{
                marginTop: 24,
                padding: 14,
                backgroundColor: `${colors.warning}20`,
                borderRadius: 8,
                border: `2px solid ${colors.warning}50`,
              }}
            >
              <div style={{ fontSize: 12, color: colors.textMuted, fontFamily: "Inter, system-ui, sans-serif" }}>
                {language === "ru" ? "Сумма без НДС:" : "Amount w/o VAT:"}
              </div>
              <div style={{ fontSize: 20, fontWeight: "bold", color: colors.text, fontFamily: "Inter, system-ui, sans-serif" }}>
                1 250 000 ₽
              </div>
            </div>
          </div>

          {/* Scanning line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 30 + scanY,
              width: "100%",
              height: 4,
              background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
              boxShadow: `0 0 20px ${colors.primary}`,
            }}
          />

          {/* AI Scanner badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                backgroundColor: colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${colors.primary}`,
              }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 14,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                AI
              </span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <svg width="60" height="40" viewBox="0 0 60 40">
          <path d="M0 20 L40 20 L40 10 L60 20 L40 30 L40 20" fill={colors.success} />
        </svg>

        {/* Extracted fields */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {fields.map((field, index) => {
            const fieldDelay = 30 + index * 12;
            const fieldProgress = spring({
              frame: frame - fieldDelay,
              fps,
              config: springConfigs.bouncy,
            });

            const fieldOpacity = interpolate(fieldProgress, [0, 0.3], [0, 1], {
              extrapolateRight: "clamp",
            });
            const fieldScale = interpolate(fieldProgress, [0, 1], [0.8, 1]);
            const fieldX = interpolate(fieldProgress, [0, 1], [40, 0]);

            const fieldLabel = getText(
              texts.scene5Fields[field.key as keyof typeof texts.scene5Fields],
              language
            );

            return (
              <div
                key={field.key}
                style={{
                  opacity: fieldOpacity,
                  transform: `translateX(${fieldX}px) scale(${fieldScale})`,
                  backgroundColor: colors.backgroundLight,
                  border: `2px solid ${colors.success}`,
                  borderRadius: 12,
                  padding: "14px 20px",
                  minWidth: 280,
                  boxShadow: `0 0 20px ${colors.success}20`,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: colors.textMuted,
                    marginBottom: 4,
                    fontFamily: "Inter, system-ui, sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 18 }}>{field.icon}</span>
                  {fieldLabel}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: colors.text,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {field.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneWrapper>
  );
};
