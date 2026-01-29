import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { SmallGoogleSheetIcon, ConnectionLine } from "../apree-components";
import { colors, springConfigs } from "../utils/animations";
import { Language, apreeTexts, getApreeText } from "../utils/apree-localization";

type Scene2Props = {
  language: Language;
};

export const Scene2_SpaghettiScripts: React.FC<Scene2Props> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grid of sheets representing different departments/data sources
  const sheets = [
    { id: 1, x: 200, y: 150, label: "Sales" },
    { id: 2, x: 540, y: 120, label: "HR" },
    { id: 3, x: 880, y: 160, label: "Finance" },
    { id: 4, x: 150, y: 380, label: "Inventory" },
    { id: 5, x: 540, y: 350, label: "CRM" },
    { id: 6, x: 920, y: 400, label: "Orders" },
    { id: 7, x: 340, y: 550, label: "Reports" },
    { id: 8, x: 720, y: 580, label: "Analytics" },
  ];

  // Tangled connections between sheets
  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 4 },
    { from: 1, to: 5 },
    { from: 2, to: 3 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 4, to: 5 },
    { from: 4, to: 7 },
    { from: 5, to: 6 },
    { from: 5, to: 7 },
    { from: 5, to: 8 },
    { from: 6, to: 8 },
    { from: 7, to: 8 },
    // Cross connections (creating spaghetti)
    { from: 1, to: 6 },
    { from: 2, to: 7 },
    { from: 3, to: 4 },
    { from: 4, to: 8 },
  ];

  return (
    <SceneWrapper
      title={getApreeText(apreeTexts.scene2Title, language)}
      subtitle={getApreeText(apreeTexts.scene2Subtitle, language)}
      phase="problem"
      phaseLabel={getApreeText(apreeTexts.problem, language)}
      stepNumber={2}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Connection lines (behind sheets) */}
        {connections.map((conn, index) => {
          const fromSheet = sheets.find((s) => s.id === conn.from)!;
          const toSheet = sheets.find((s) => s.id === conn.to)!;

          return (
            <ConnectionLine
              key={`${conn.from}-${conn.to}`}
              startX={fromSheet.x + 14}
              startY={fromSheet.y + 17}
              endX={toSheet.x + 14}
              endY={toSheet.y + 17}
              delay={index * 4}
              duration={0.4}
              color={colors.danger}
              strokeWidth={2}
              curved={true}
              showPulse={index % 3 === 0}
            />
          );
        })}

        {/* Sheet nodes */}
        {sheets.map((sheet, index) => {
          const progress = spring({
            frame: frame - index * 5,
            fps,
            config: springConfigs.bouncy,
          });

          const opacity = interpolate(progress, [0, 0.3], [0, 1], {
            extrapolateRight: "clamp",
          });

          const scale = interpolate(progress, [0, 1], [0.5, 1]);

          // Slight floating animation
          const floatY = Math.sin((frame + index * 20) / 30) * 5;

          return (
            <div
              key={sheet.id}
              style={{
                position: "absolute",
                left: sheet.x,
                top: sheet.y + floatY,
                opacity,
                transform: `scale(${scale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  padding: 12,
                  backgroundColor: colors.backgroundLight,
                  borderRadius: 12,
                  border: `2px solid ${colors.danger}40`,
                  boxShadow: `0 0 20px ${colors.danger}20`,
                }}
              >
                <SmallGoogleSheetIcon color={colors.danger} />
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: colors.textMuted,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {sheet.label}
              </div>
            </div>
          );
        })}

        {/* "Scripts" label in center */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            padding: "12px 24px",
            backgroundColor: `${colors.danger}20`,
            borderRadius: 8,
            border: `1px solid ${colors.danger}60`,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: colors.danger,
              fontFamily: "monospace",
            }}
          >
            {"// 200+ Google Scripts"}
          </span>
        </div>
      </div>
    </SceneWrapper>
  );
};
