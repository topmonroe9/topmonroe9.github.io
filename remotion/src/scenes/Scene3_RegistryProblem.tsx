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

type Scene3RegistryProblemProps = {
  language: Language;
};

export const Scene3RegistryProblem: React.FC<Scene3RegistryProblemProps> = ({ language }) => {
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

  // Registry columns
  const columns = language === "ru"
    ? ["№", "Наименование", "Сумма", "Файл"]
    : ["#", "Name", "Amount", "File"];

  // Sample data rows
  const rows = [
    ["001", language === "ru" ? "Договор №123" : "Contract #123", "150 000 ₽", ""],
    ["002", language === "ru" ? "Акт работ" : "Work Act", "75 500 ₽", ""],
    ["003", language === "ru" ? "Счёт-фактура" : "Invoice", "230 000 ₽", ""],
  ];

  return (
    <SceneWrapper
      title={getText(texts.scene3Title, language)}
      phase="problem"
      phaseLabel={language === "ru" ? "Проблема" : "Problem"}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          opacity: mainOpacity,
        }}
      >
        {/* Documents on the left */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {[0, 1, 2].map((i) => {
            const docDelay = 10 + i * 8;
            const docProgress = spring({
              frame: frame - docDelay,
              fps,
              config: springConfigs.smooth,
            });

            const floatOffset = Math.sin((frame + i * 25) / 20) * 6;

            return (
              <div
                key={i}
                style={{
                  opacity: interpolate(docProgress, [0, 0.5], [0, 1], { extrapolateRight: "clamp" }),
                  transform: `translateY(${floatOffset}px)`,
                  width: 140,
                  height: 100,
                  backgroundColor: colors.backgroundLight,
                  border: `2px solid ${colors.danger}`,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <svg width="50" height="60" viewBox="0 0 50 60">
                  <path d="M5 0 L35 0 L45 10 L45 55 Q45 60 40 60 L10 60 Q5 60 5 55 L5 0 Z" fill={colors.background} stroke={colors.danger} strokeWidth="2" />
                  <path d="M35 0 L35 10 L45 10" fill="none" stroke={colors.danger} strokeWidth="2" />
                </svg>
                <span
                  style={{
                    position: "absolute",
                    bottom: 8,
                    fontSize: 11,
                    color: colors.textMuted,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  doc_{i + 1}.pdf
                </span>
              </div>
            );
          })}
        </div>

        {/* Broken arrows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
            alignItems: "center",
          }}
        >
          {[0, 1, 2].map((i) => {
            const arrowDelay = 25 + i * 8;
            const arrowProgress = spring({
              frame: frame - arrowDelay,
              fps,
              config: springConfigs.smooth,
            });

            const arrowWidth = interpolate(arrowProgress, [0, 1], [0, 80]);

            return (
              <div key={i} style={{ position: "relative" }}>
                <svg width="100" height="30" viewBox="0 0 100 30">
                  <defs>
                    <linearGradient id={`brokenGrad${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={colors.danger} stopOpacity="0.8" />
                      <stop offset="100%" stopColor={colors.danger} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="0"
                    y1="15"
                    x2={arrowWidth}
                    y2="15"
                    stroke={`url(#brokenGrad${i})`}
                    strokeWidth="3"
                    strokeDasharray="8 4"
                  />
                  {arrowWidth > 60 && (
                    <g transform={`translate(${arrowWidth}, 15)`}>
                      <circle r="10" fill={colors.danger} opacity="0.3" />
                      <line x1="-5" y1="-5" x2="5" y2="5" stroke={colors.danger} strokeWidth="2" />
                      <line x1="5" y1="-5" x2="-5" y2="5" stroke={colors.danger} strokeWidth="2" />
                    </g>
                  )}
                </svg>
              </div>
            );
          })}
        </div>

        {/* Registry table */}
        <div
          style={{
            backgroundColor: colors.backgroundLight,
            borderRadius: 12,
            overflow: "hidden",
            border: `2px solid ${colors.border}`,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              backgroundColor: colors.background,
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            {columns.map((col, colIndex) => (
              <div
                key={colIndex}
                style={{
                  width: colIndex === 0 ? 50 : colIndex === 3 ? 80 : 120,
                  padding: "12px 14px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.text,
                  fontFamily: "Inter, system-ui, sans-serif",
                  borderRight: colIndex < columns.length - 1 ? `1px solid ${colors.border}` : "none",
                }}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, rowIndex) => {
            const rowDelay = 15 + rowIndex * 6;
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
                }}
              >
                {row.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    style={{
                      width: cellIndex === 0 ? 50 : cellIndex === 3 ? 80 : 120,
                      padding: "10px 14px",
                      fontSize: 13,
                      color: colors.textMuted,
                      fontFamily: "Inter, system-ui, sans-serif",
                      borderRight: cellIndex < row.length - 1 ? `1px solid ${colors.border}` : "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {cellIndex === 3 ? (
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 6,
                          border: `2px dashed ${colors.danger}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ color: colors.danger, fontSize: 16 }}>?</span>
                      </div>
                    ) : (
                      cell
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </SceneWrapper>
  );
};
