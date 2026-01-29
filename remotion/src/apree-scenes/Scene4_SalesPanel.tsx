import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { SmallGoogleSheetIcon, ServiceIcon, ITPlatformMini } from "../apree-components";
import { colors, springConfigs } from "../utils/animations";
import { Language, apreeTexts, getApreeText } from "../utils/apree-localization";

type Scene4Props = {
  language: Language;
};

export const Scene4_SalesPanel: React.FC<Scene4Props> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Chaos fades, panel appears (frames 0-90)
  // Phase 2: Platform progress appears (frames 90-150)

  // Chaos elements (fading out)
  const chaosOpacity = interpolate(frame, [0, 10, 40, 60], [0, 0.6, 0.6, 0], {
    extrapolateRight: "clamp",
  });

  const chaosX = interpolate(frame, [40, 70], [0, -80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Panel emergence - starts earlier, centered
  const panelProgress = spring({
    frame: frame - 15,
    fps,
    config: springConfigs.smooth,
  });

  const panelOpacity = interpolate(panelProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const panelScale = interpolate(panelProgress, [0, 1], [0.85, 1]);

  return (
    <SceneWrapper
      title={getApreeText(apreeTexts.scene4Title, language)}
      subtitle={getApreeText(apreeTexts.scene4Subtitle, language)}
      phase="solution"
      phaseLabel={getApreeText(apreeTexts.solution, language)}
      stepNumber={1}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Chaos sheets (background, fading) */}
        <div
          style={{
            position: "absolute",
            left: 80,
            opacity: chaosOpacity,
            transform: `translateX(${chaosX}px)`,
          }}
        >
          <ChaosSheets />
        </div>

        {/* Sales Panel (centered) */}
        <div
          style={{
            opacity: panelOpacity,
            transform: `scale(${panelScale})`,
          }}
        >
          <SalesPanelMockup frame={frame} fps={fps} />
        </div>

        {/* IT Platform Progress (bottom right corner) */}
        <Sequence from={90} layout="none">
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
          >
            <ITPlatformMini
              activeModules={[]}
              currentModule="sales"
              delay={0}
            />
          </div>
        </Sequence>
      </div>
    </SceneWrapper>
  );
};

// Chaos sheets component
const ChaosSheets: React.FC = () => {
  return (
    <div
      style={{
        width: 180,
        height: 240,
        position: "relative",
      }}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 10 + (i % 3) * 55,
            top: 20 + Math.floor(i / 3) * 90,
            transform: `rotate(${(i - 2.5) * 10}deg)`,
          }}
        >
          <SmallGoogleSheetIcon color={colors.danger} />
        </div>
      ))}
    </div>
  );
};

// Sales Panel Mockup Component
const SalesPanelMockup: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const rowAnimations = [0, 1, 2, 3].map((i) => {
    const progress = spring({
      frame: frame - 35 - i * 6,
      fps,
      config: springConfigs.snappy,
    });
    return interpolate(progress, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  });

  return (
    <div
      style={{
        width: 480,
        height: 380,
        backgroundColor: colors.backgroundLight,
        borderRadius: 20,
        border: `2px solid ${colors.primary}50`,
        boxShadow: `0 0 80px ${colors.primary}25`,
        overflow: "hidden",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          height: 56,
          backgroundColor: colors.primary,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 14,
        }}
      >
        <ServiceIcon service="sales" size={32} animateIn={false} />
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "white",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Sales Panel
        </span>
      </div>

      {/* Content area */}
      <div style={{ padding: 24 }}>
        {/* Search bar */}
        <div
          style={{
            height: 44,
            backgroundColor: colors.background,
            borderRadius: 10,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            border: `1px solid ${colors.border}`,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill={colors.textMuted}>
            <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 12 L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span
            style={{
              marginLeft: 12,
              fontSize: 14,
              color: colors.textMuted,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Search orders...
          </span>
        </div>

        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr",
            gap: 12,
            padding: "12px 0",
            borderBottom: `2px solid ${colors.border}`,
          }}
        >
          {["ID", "Client", "Status", "Sum"].map((header) => (
            <span
              key={header}
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: colors.textMuted,
                fontFamily: "Inter, system-ui, sans-serif",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {header}
            </span>
          ))}
        </div>

        {/* Table rows */}
        {[
          { id: "#4521", client: "Alpha Corp", status: "Done", sum: "$12,400" },
          { id: "#4520", client: "Beta LLC", status: "In Progress", sum: "$8,200" },
          { id: "#4519", client: "Gamma Inc", status: "Done", sum: "$15,800" },
          { id: "#4518", client: "Delta Co", status: "Pending", sum: "$6,500" },
        ].map((row, i) => (
          <div
            key={row.id}
            style={{
              display: "grid",
              gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr",
              gap: 12,
              padding: "14px 0",
              borderBottom: `1px solid ${colors.border}40`,
              opacity: rowAnimations[i],
              transform: `translateX(${interpolate(rowAnimations[i], [0, 1], [20, 0])}px)`,
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: colors.primary,
                fontFamily: "monospace",
                fontWeight: 600,
              }}
            >
              {row.id}
            </span>
            <span
              style={{
                fontSize: 14,
                color: colors.text,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {row.client}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color:
                  row.status === "Done"
                    ? colors.success
                    : row.status === "In Progress"
                    ? colors.warning
                    : colors.textMuted,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {row.status}
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: colors.text,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              {row.sum}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
