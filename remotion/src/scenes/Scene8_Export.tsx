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

type Scene8ExportProps = {
  language: Language;
};

export const Scene8Export: React.FC<Scene8ExportProps> = ({ language }) => {
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

  // Excel animation
  const excelProgress = spring({
    frame: frame - 10,
    fps,
    config: springConfigs.bouncy,
  });

  const excelScale = interpolate(excelProgress, [0, 1], [0.5, 1]);
  const excelOpacity = interpolate(excelProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // ZIP animation
  const zipProgress = spring({
    frame: frame - 25,
    fps,
    config: springConfigs.bouncy,
  });

  const zipScale = interpolate(zipProgress, [0, 1], [0.5, 1]);
  const zipOpacity = interpolate(zipProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <SceneWrapper
      title={getText(texts.scene8Title, language)}
      phase="result"
      phaseLabel={language === "ru" ? "Результат" : "Result"}
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
        {/* Excel file */}
        <div
          style={{
            opacity: excelOpacity,
            transform: `scale(${excelScale})`,
          }}
        >
          <div
            style={{
              width: 200,
              height: 260,
              backgroundColor: colors.backgroundLight,
              border: `4px solid #217346`,
              borderRadius: 16,
              position: "relative",
              boxShadow: `0 8px 40px rgba(33, 115, 70, 0.4)`,
              overflow: "hidden",
            }}
          >
            {/* Excel header */}
            <div
              style={{
                backgroundColor: "#217346",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28">
                <rect x="2" y="2" width="24" height="24" rx="3" fill="white" />
                <text x="14" y="19" fontSize="14" fill="#217346" textAnchor="middle" fontWeight="bold">X</text>
              </svg>
              <span
                style={{
                  fontSize: 16,
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                Excel
              </span>
            </div>

            {/* Excel grid */}
            <div style={{ padding: 14 }}>
              {Array.from({ length: 6 }).map((_, row) => (
                <div key={row} style={{ display: "flex", gap: 3, marginBottom: 3 }}>
                  {Array.from({ length: 4 }).map((_, col) => (
                    <div
                      key={col}
                      style={{
                        width: col === 0 ? 24 : 36,
                        height: 20,
                        backgroundColor: row === 0 ? "#217346" : colors.background,
                        borderRadius: 3,
                        opacity: row === 0 ? 0.9 : 0.6,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* File name */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 0,
                right: 0,
                fontSize: 11,
                color: colors.textMuted,
                fontFamily: "Inter, system-ui, sans-serif",
                textAlign: "center",
              }}
            >
              registry_export.xlsx
            </div>
          </div>
        </div>

        {/* Plus sign */}
        <div
          style={{
            opacity: Math.min(excelOpacity, zipOpacity),
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: colors.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: "bold",
              color: "white",
              fontFamily: "Inter, system-ui, sans-serif",
              boxShadow: `0 0 20px ${colors.primary}60`,
            }}
          >
            +
          </div>
        </div>

        {/* ZIP archive */}
        <div
          style={{
            opacity: zipOpacity,
            transform: `scale(${zipScale})`,
          }}
        >
          <div
            style={{
              width: 200,
              height: 260,
              backgroundColor: colors.backgroundLight,
              border: `4px solid ${colors.warning}`,
              borderRadius: 16,
              position: "relative",
              boxShadow: `0 8px 40px rgba(245, 158, 11, 0.4)`,
              overflow: "hidden",
            }}
          >
            {/* ZIP header */}
            <div
              style={{
                backgroundColor: colors.warning,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28">
                <rect x="4" y="2" width="20" height="24" rx="3" fill="white" />
                <rect x="10" y="7" width="8" height="4" fill={colors.warning} />
                <rect x="10" y="13" width="8" height="4" fill={colors.warning} />
              </svg>
              <span
                style={{
                  fontSize: 16,
                  color: colors.background,
                  fontWeight: "bold",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                ZIP
              </span>
            </div>

            {/* ZIP contents */}
            <div style={{ padding: 14 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                    padding: "8px 10px",
                    backgroundColor: colors.background,
                    borderRadius: 6,
                  }}
                >
                  <svg width="20" height="24" viewBox="0 0 20 24">
                    <path d="M2 1h12l4 4v17H2V1z" fill={colors.danger} opacity="0.9" />
                  </svg>
                  <span
                    style={{
                      fontSize: 11,
                      color: colors.textMuted,
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    doc_{i + 1}.pdf
                  </span>
                </div>
              ))}
            </div>

            {/* File name */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 0,
                right: 0,
                fontSize: 11,
                color: colors.textMuted,
                fontFamily: "Inter, system-ui, sans-serif",
                textAlign: "center",
              }}
            >
              documents.zip
            </div>
          </div>
        </div>
      </div>

      {/* Success checkmark */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {(() => {
          const checkProgress = spring({
            frame: frame - 50,
            fps,
            config: springConfigs.bouncy,
          });

          const checkScale = interpolate(checkProgress, [0, 1], [0, 1]);
          const checkOpacity = interpolate(checkProgress, [0, 0.3], [0, 1], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              style={{
                opacity: checkOpacity,
                transform: `scale(${checkScale})`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 28px",
                backgroundColor: `${colors.success}20`,
                border: `2px solid ${colors.success}`,
                borderRadius: 14,
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="17" fill={colors.success} />
                <path d="M10 18l6 6 10-12" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: colors.success,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {language === "ru" ? "Готово к загрузке!" : "Ready to download!"}
              </span>
            </div>
          );
        })()}
      </div>
    </SceneWrapper>
  );
};
