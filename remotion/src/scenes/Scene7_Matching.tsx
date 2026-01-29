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

type Scene7MatchingProps = {
  language: Language;
};

export const Scene7Matching: React.FC<Scene7MatchingProps> = ({ language }) => {
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

  // Registry rows
  const rows = language === "ru" ? [
    { num: "001", name: "Договор №123", amount: "150 000 ₽" },
    { num: "002", name: "Акт работ", amount: "75 500 ₽" },
    { num: "003", name: "Счёт-фактура", amount: "230 000 ₽" },
    { num: "004", name: "Накладная", amount: "48 900 ₽" },
  ] : [
    { num: "001", name: "Contract #123", amount: "150 000 ₽" },
    { num: "002", name: "Work Act", amount: "75 500 ₽" },
    { num: "003", name: "Invoice #456", amount: "230 000 ₽" },
    { num: "004", name: "Waybill", amount: "48 900 ₽" },
  ];

  // Progress calculation
  const matchedCount = Math.min(Math.floor((frame - 20) / 20), 4);
  const progressValue = interpolate(frame, [20, 100], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneWrapper
      title={getText(texts.scene7Title, language)}
      phase="solution"
      phaseLabel={language === "ru" ? "Решение" : "Solution"}
      stepNumber={4}
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
        {/* Flying documents */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {rows.map((_, i) => {
            const flyDelay = 15 + i * 20;
            const flyProgress = spring({
              frame: frame - flyDelay,
              fps,
              config: springConfigs.smooth,
            });

            const x = interpolate(flyProgress, [0, 1], [0, 150]);
            const opacity = interpolate(flyProgress, [0, 0.2, 0.8, 1], [1, 1, 0.5, 0], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  transform: `translateX(${x}px)`,
                  opacity,
                  width: 120,
                  height: 80,
                  backgroundColor: colors.backgroundLight,
                  border: `2px solid ${colors.primary}`,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <svg width="40" height="50" viewBox="0 0 40 50">
                  <path d="M4 0 L28 0 L36 8 L36 46 Q36 50 32 50 L8 50 Q4 50 4 46 L4 0 Z" fill={colors.background} stroke={colors.primary} strokeWidth="2" />
                </svg>
                {/* Trail effect */}
                <div
                  style={{
                    position: "absolute",
                    left: -30,
                    width: 30,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${colors.primary})`,
                    borderRadius: 2,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Registry table */}
        <div
          style={{
            backgroundColor: colors.backgroundLight,
            borderRadius: 14,
            overflow: "hidden",
            border: `2px solid ${colors.border}`,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              backgroundColor: colors.background,
              borderBottom: `2px solid ${colors.border}`,
            }}
          >
            {[language === "ru" ? "№" : "#", language === "ru" ? "Наименование" : "Name", language === "ru" ? "Сумма" : "Amount", language === "ru" ? "Файл" : "File"].map((col, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? 50 : i === 3 ? 70 : 130,
                  padding: "14px 16px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: colors.text,
                  fontFamily: "Inter, system-ui, sans-serif",
                  borderRight: i < 3 ? `1px solid ${colors.border}` : "none",
                }}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, rowIndex) => {
            const isMatched = rowIndex < matchedCount;
            const rowDelay = 10 + rowIndex * 5;
            const rowProgress = spring({
              frame: frame - rowDelay,
              fps,
              config: springConfigs.smooth,
            });

            return (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  opacity: interpolate(rowProgress, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
                  borderBottom: rowIndex < rows.length - 1 ? `1px solid ${colors.border}` : "none",
                  backgroundColor: isMatched ? `${colors.success}15` : "transparent",
                }}
              >
                <div style={{ width: 50, padding: "12px 16px", fontSize: 14, color: colors.textMuted, fontFamily: "Inter, system-ui, sans-serif", borderRight: `1px solid ${colors.border}` }}>
                  {row.num}
                </div>
                <div style={{ width: 130, padding: "12px 16px", fontSize: 14, color: colors.textMuted, fontFamily: "Inter, system-ui, sans-serif", borderRight: `1px solid ${colors.border}` }}>
                  {row.name}
                </div>
                <div style={{ width: 130, padding: "12px 16px", fontSize: 14, color: colors.textMuted, fontFamily: "Inter, system-ui, sans-serif", borderRight: `1px solid ${colors.border}` }}>
                  {row.amount}
                </div>
                <div style={{ width: 70, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {isMatched ? (
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="13" fill={colors.success} />
                      <path d="M8 14l4 4 8-8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        border: `2px dashed ${colors.border}`,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.success,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {matchedCount} / 4 {language === "ru" ? "совпадений" : "matches"}
        </div>
        <div
          style={{
            width: 300,
            height: 12,
            backgroundColor: colors.backgroundLight,
            borderRadius: 6,
            overflow: "hidden",
            border: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{
              width: `${progressValue}%`,
              height: "100%",
              backgroundColor: colors.success,
              borderRadius: 6,
              boxShadow: `0 0 10px ${colors.success}80`,
            }}
          />
        </div>
      </div>
    </SceneWrapper>
  );
};
