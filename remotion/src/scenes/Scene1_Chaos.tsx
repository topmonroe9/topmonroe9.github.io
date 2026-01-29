import React from "react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { DocumentIcon } from "../components/DocumentIcon";
import {
  colors,
  getRandomPosition,
  getRandomRotation,
} from "../utils/animations";
import { Language, texts, getText } from "../utils/localization";

type Scene1ChaosProps = {
  language: Language;
};

export const Scene1Chaos: React.FC<Scene1ChaosProps> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Generate documents in a more compact area
  const documentCount = 20;
  const contentWidth = width - 100;
  const contentHeight = height - 280;

  const documents = Array.from({ length: documentCount }).map((_, i) => {
    const pos = getRandomPosition(i * 17, contentWidth - 80, contentHeight - 100);
    const rotation = getRandomRotation(i * 23, 35);
    const delay = i * 2;
    const variant = i % 3 === 0 ? "pdf" : i % 3 === 1 ? "doc" : "unknown";

    // Floating animation
    const floatOffset = Math.sin((frame + i * 20) / 25) * 8;
    const rotateOffset = Math.sin((frame + i * 15) / 35) * 4;

    return {
      id: i,
      x: pos.x + 50,
      y: pos.y + 120,
      rotation: rotation + rotateOffset,
      delay,
      variant,
      scale: 0.8 + (i % 3) * 0.15,
      floatOffset,
    };
  });

  return (
    <SceneWrapper
      title={getText(texts.scene1Title, language)}
      phase="problem"
      phaseLabel={language === "ru" ? "Проблема" : "Problem"}
    >
      {/* Floating documents */}
      <div
        style={{
          position: "relative",
          width: contentWidth,
          height: contentHeight,
        }}
      >
        {documents.map((doc) => (
          <DocumentIcon
            key={doc.id}
            x={doc.x}
            y={doc.y + doc.floatOffset}
            rotation={doc.rotation}
            scale={doc.scale}
            delay={doc.delay}
            variant={doc.variant as "pdf" | "doc" | "unknown"}
          />
        ))}

        {/* Central counter */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: `${colors.background}E0`,
            padding: "24px 40px",
            borderRadius: 16,
            border: `2px solid ${colors.danger}`,
            backdropFilter: "blur(10px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: colors.danger,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            100K+
          </div>
          <div
            style={{
              fontSize: 16,
              color: colors.textMuted,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {language === "ru" ? "документов" : "documents"}
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};
