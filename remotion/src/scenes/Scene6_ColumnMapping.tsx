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

type Scene6ColumnMappingProps = {
  language: Language;
};

export const Scene6ColumnMapping: React.FC<Scene6ColumnMappingProps> = ({ language }) => {
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

  // Mapping pairs
  const mappings = language === "ru" ? [
    { left: "Наименование", right: "Название документа" },
    { left: "Сумма", right: "Сумма без НДС" },
    { left: "Дата", right: "Дата документа" },
    { left: "Файл", right: "Ссылка на файл" },
  ] : [
    { left: "Name", right: "Document name" },
    { left: "Amount", right: "Amount w/o VAT" },
    { left: "Date", right: "Document date" },
    { left: "File", right: "File link" },
  ];

  return (
    <SceneWrapper
      title={getText(texts.scene6Title, language)}
      phase="solution"
      phaseLabel={language === "ru" ? "Решение" : "Solution"}
      stepNumber={3}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          opacity: mainOpacity,
        }}
      >
        {/* Headers */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 700,
          }}
        >
          <div
            style={{
              padding: "12px 24px",
              backgroundColor: colors.backgroundLight,
              border: `2px solid ${colors.primary}`,
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 600,
              color: colors.text,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            📊 {language === "ru" ? "Реестр СЭД" : "EDMS Registry"}
          </div>
          <div
            style={{
              padding: "12px 24px",
              backgroundColor: colors.backgroundLight,
              border: `2px solid ${colors.success}`,
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 600,
              color: colors.text,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            📄 {language === "ru" ? "Извлечённые поля" : "Extracted Fields"}
          </div>
        </div>

        {/* Mapping rows */}
        {mappings.map((mapping, index) => {
          const rowDelay = 15 + index * 12;
          const rowProgress = spring({
            frame: frame - rowDelay,
            fps,
            config: springConfigs.smooth,
          });

          const rowOpacity = interpolate(rowProgress, [0, 0.3], [0, 1], {
            extrapolateRight: "clamp",
          });

          const lineProgress = spring({
            frame: frame - rowDelay - 15,
            fps,
            config: springConfigs.smooth,
          });

          const lineWidth = interpolate(lineProgress, [0, 1], [0, 100]);

          return (
            <div
              key={index}
              style={{
                opacity: rowOpacity,
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              {/* Left box (Registry column) */}
              <div
                style={{
                  padding: "14px 24px",
                  backgroundColor: colors.backgroundLight,
                  border: `2px solid ${colors.primary}`,
                  borderRadius: 10,
                  fontSize: 16,
                  color: colors.text,
                  fontFamily: "Inter, system-ui, sans-serif",
                  minWidth: 200,
                  textAlign: "center",
                }}
              >
                {mapping.left}
              </div>

              {/* Connecting line */}
              <div
                style={{
                  width: 120,
                  height: 4,
                  backgroundColor: colors.border,
                  position: "relative",
                  borderRadius: 2,
                }}
              >
                <div
                  style={{
                    width: `${lineWidth}%`,
                    height: "100%",
                    backgroundColor: colors.success,
                    borderRadius: 2,
                    boxShadow: lineWidth > 80 ? `0 0 10px ${colors.success}` : "none",
                  }}
                />
                {lineWidth > 80 && (
                  <div
                    style={{
                      position: "absolute",
                      right: -8,
                      top: -6,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: colors.success,
                    }}
                  />
                )}
              </div>

              {/* Right box (Document field) */}
              <div
                style={{
                  padding: "14px 24px",
                  backgroundColor: lineWidth > 80 ? `${colors.success}20` : colors.backgroundLight,
                  border: `2px solid ${lineWidth > 80 ? colors.success : colors.border}`,
                  borderRadius: 10,
                  fontSize: 16,
                  color: colors.text,
                  fontFamily: "Inter, system-ui, sans-serif",
                  minWidth: 200,
                  textAlign: "center",
                }}
              >
                {mapping.right}
              </div>
            </div>
          );
        })}
      </div>
    </SceneWrapper>
  );
};
