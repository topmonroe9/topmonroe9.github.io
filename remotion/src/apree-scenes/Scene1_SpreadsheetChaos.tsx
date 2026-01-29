import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { GoogleSheetIcon } from "../apree-components";
import {
  colors,
  getRandomPosition,
  getRandomRotation,
} from "../utils/animations";
import { Language, apreeTexts, getApreeText } from "../utils/apree-localization";

type Scene1Props = {
  language: Language;
};

export const Scene1_SpreadsheetChaos: React.FC<Scene1Props> = ({ language }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Generate Google Sheets icons in a compact area
  const sheetCount = 18;
  const contentWidth = width - 120;
  const contentHeight = height - 320;

  const sheets = Array.from({ length: sheetCount }).map((_, i) => {
    const pos = getRandomPosition(i * 17 + 5, contentWidth - 80, contentHeight - 100);
    const rotation = getRandomRotation(i * 23 + 3, 25);
    const delay = i * 3;

    // Floating animation
    const floatOffset = Math.sin((frame + i * 20) / 25) * 10;
    const rotateOffset = Math.sin((frame + i * 15) / 35) * 3;

    return {
      id: i,
      x: pos.x + 60,
      y: pos.y + 100,
      rotation: rotation + rotateOffset,
      delay,
      scale: 0.7 + (i % 4) * 0.15,
      floatOffset,
      showError: i % 5 === 0, // Some sheets show error
    };
  });

  // Counter animation
  const counterValue = Math.min(100, Math.floor(frame * 2.5));

  return (
    <SceneWrapper
      title={getApreeText(apreeTexts.scene1Title, language)}
      phase="problem"
      phaseLabel={getApreeText(apreeTexts.problem, language)}
      stepNumber={1}
    >
      {/* Floating Google Sheets */}
      <div
        style={{
          position: "relative",
          width: contentWidth,
          height: contentHeight,
        }}
      >
        {sheets.map((sheet) => (
          <GoogleSheetIcon
            key={sheet.id}
            x={sheet.x}
            y={sheet.y + sheet.floatOffset}
            rotation={sheet.rotation}
            scale={sheet.scale}
            delay={sheet.delay}
            showError={sheet.showError}
          />
        ))}

        {/* Central counter */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: `${colors.background}E8`,
            padding: "28px 48px",
            borderRadius: 20,
            border: `3px solid ${colors.danger}`,
            backdropFilter: "blur(12px)",
            textAlign: "center",
            boxShadow: `0 0 60px ${colors.danger}40`,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: colors.danger,
              fontFamily: "Inter, system-ui, sans-serif",
              lineHeight: 1,
            }}
          >
            {counterValue}+
          </div>
          <div
            style={{
              fontSize: 18,
              color: colors.textMuted,
              fontFamily: "Inter, system-ui, sans-serif",
              marginTop: 8,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {getApreeText(apreeTexts.scene1Counter, language)}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};
