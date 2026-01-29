import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, springConfigs } from "../utils/animations";
import { Language, texts, getText } from "../utils/localization";

type RegistryTableProps = {
  language: Language;
  delay?: number;
  rows?: number;
  showEmpty?: boolean;
  matchedRows?: number[];
  highlightColumn?: number;
};

export const RegistryTable: React.FC<RegistryTableProps> = ({
  language,
  delay = 0,
  rows = 5,
  showEmpty = false,
  matchedRows = [],
  highlightColumn,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tableProgress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const opacity = interpolate(tableProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const columns = [
    { key: "number", width: 50, label: getText(texts.registryColumns.number, language) },
    { key: "documentName", width: 200, label: getText(texts.registryColumns.documentName, language) },
    { key: "amount", width: 120, label: getText(texts.registryColumns.amount, language) },
    { key: "date", width: 100, label: getText(texts.registryColumns.date, language) },
    { key: "file", width: 80, label: getText(texts.registryColumns.file, language) },
  ];

  const sampleData = [
    { number: "001", documentName: "Договор поставки №123", amount: "150 000", date: "15.01.24", file: "" },
    { number: "002", documentName: "Акт выполненных работ", amount: "75 500", date: "18.01.24", file: "" },
    { number: "003", documentName: "Счёт-фактура №456", amount: "230 000", date: "20.01.24", file: "" },
    { number: "004", documentName: "Товарная накладная", amount: "48 900", date: "22.01.24", file: "" },
    { number: "005", documentName: "Акт сверки", amount: "—", date: "25.01.24", file: "" },
  ];

  return (
    <div
      style={{
        opacity,
        backgroundColor: colors.backgroundLight,
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${colors.border}`,
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
            key={col.key}
            style={{
              width: col.width,
              padding: "12px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: colors.text,
              fontFamily: "Inter, system-ui, sans-serif",
              borderRight: colIndex < columns.length - 1 ? `1px solid ${colors.border}` : "none",
              backgroundColor: highlightColumn === colIndex ? `${colors.primary}30` : "transparent",
            }}
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const rowDelay = delay + 10 + rowIndex * 5;
        const rowProgress = spring({
          frame: frame - rowDelay,
          fps,
          config: springConfigs.smooth,
        });

        const rowOpacity = interpolate(rowProgress, [0, 0.5], [0, 1], {
          extrapolateRight: "clamp",
        });

        const isMatched = matchedRows.includes(rowIndex);
        const data = sampleData[rowIndex] || sampleData[0];

        return (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              opacity: rowOpacity,
              borderBottom: rowIndex < rows - 1 ? `1px solid ${colors.border}` : "none",
              backgroundColor: isMatched ? `${colors.success}15` : "transparent",
            }}
          >
            {columns.map((col, colIndex) => {
              const value = showEmpty && col.key === "file" ? "" : (data as any)[col.key] || "—";

              return (
                <div
                  key={col.key}
                  style={{
                    width: col.width,
                    padding: "10px 16px",
                    fontSize: 13,
                    color: colors.textMuted,
                    fontFamily: "Inter, system-ui, sans-serif",
                    borderRight: colIndex < columns.length - 1 ? `1px solid ${colors.border}` : "none",
                    backgroundColor: highlightColumn === colIndex ? `${colors.primary}15` : "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {showEmpty && col.key === "file" ? (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        border: `2px dashed ${colors.border}`,
                      }}
                    />
                  ) : isMatched && col.key === "file" ? (
                    <CheckIcon />
                  ) : (
                    value
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const CheckIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="9" fill={colors.success} />
    <path
      d="M6 10l3 3 5-6"
      stroke="white"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Simple table row for mapping visualization
type MappingRowProps = {
  leftLabel: string;
  rightLabel: string;
  delay?: number;
  connected?: boolean;
};

export const MappingRow: React.FC<MappingRowProps> = ({
  leftLabel,
  rightLabel,
  delay = 0,
  connected = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const lineProgress = spring({
    frame: frame - delay - 15,
    fps,
    config: springConfigs.smooth,
  });

  const lineWidth = connected ? interpolate(lineProgress, [0, 1], [0, 100]) : 0;

  return (
    <div
      style={{
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "8px 0",
      }}
    >
      {/* Left box */}
      <div
        style={{
          padding: "10px 16px",
          backgroundColor: colors.backgroundLight,
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          fontSize: 14,
          color: colors.text,
          fontFamily: "Inter, system-ui, sans-serif",
          minWidth: 150,
        }}
      >
        {leftLabel}
      </div>

      {/* Connecting line */}
      <div
        style={{
          width: 100,
          height: 2,
          backgroundColor: colors.border,
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${lineWidth}%`,
            height: "100%",
            backgroundColor: connected ? colors.success : colors.primary,
            boxShadow: connected ? `0 0 10px ${colors.success}` : "none",
          }}
        />
        {connected && lineProgress > 0.8 && (
          <div
            style={{
              position: "absolute",
              right: -6,
              top: -4,
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: colors.success,
            }}
          />
        )}
      </div>

      {/* Right box */}
      <div
        style={{
          padding: "10px 16px",
          backgroundColor: connected ? `${colors.success}20` : colors.backgroundLight,
          border: `1px solid ${connected ? colors.success : colors.border}`,
          borderRadius: 8,
          fontSize: 14,
          color: colors.text,
          fontFamily: "Inter, system-ui, sans-serif",
          minWidth: 150,
        }}
      >
        {rightLabel}
      </div>
    </div>
  );
};
