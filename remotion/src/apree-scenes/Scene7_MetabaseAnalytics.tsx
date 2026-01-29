import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { ServiceIcon, ITPlatformMini } from "../apree-components";
import { colors, springConfigs } from "../utils/animations";
import { apreeColors } from "../utils/apree-animations";
import { Language, apreeTexts, getApreeText } from "../utils/apree-localization";

type Scene7Props = {
  language: Language;
};

export const Scene7_MetabaseAnalytics: React.FC<Scene7Props> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneWrapper
      title={getApreeText(apreeTexts.scene7Title, language)}
      subtitle={getApreeText(apreeTexts.scene7Subtitle, language)}
      phase="solution"
      phaseLabel={getApreeText(apreeTexts.solution, language)}
      stepNumber={4}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          width: "100%",
        }}
      >
        {/* ETL Pipeline visualization */}
        <ETLPipeline frame={frame} fps={fps} />

        {/* Dashboard preview */}
        <DashboardPreview frame={frame} fps={fps} />

        {/* IT Platform Progress */}
        <Sequence from={110} layout="none">
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
          >
            <ITPlatformMini
              activeModules={["sales", "workspace", "sso"]}
              currentModule="analytics"
              delay={0}
            />
          </div>
        </Sequence>
      </div>
    </SceneWrapper>
  );
};

// ETL Pipeline Component
const ETLPipeline: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const stages = [
    { label: "Extract", icon: "📥", delay: 0 },
    { label: "Transform", icon: "⚙️", delay: 15 },
    { label: "Load", icon: "📊", delay: 30 },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* Data sources */}
      <DataSourcesBlock frame={frame} fps={fps} />

      {/* ETL stages */}
      {stages.map((stage, i) => {
        const progress = spring({
          frame: frame - stage.delay,
          fps,
          config: springConfigs.bouncy,
        });

        const opacity = interpolate(progress, [0, 0.3], [0, 1], {
          extrapolateRight: "clamp",
        });

        const scale = interpolate(progress, [0, 1], [0.5, 1]);

        // Pulse animation for active processing
        const pulsePhase = Math.max(0, frame - stage.delay - 20);
        const pulse = 1 + Math.sin(pulsePhase * 0.2) * 0.05;

        return (
          <React.Fragment key={stage.label}>
            {/* Arrow before (except first) */}
            {i === 0 && (
              <PipelineArrow
                frame={frame}
                delay={stage.delay + 10}
                color={apreeColors.metabase}
              />
            )}

            {/* Stage box */}
            <div
              style={{
                opacity,
                transform: `scale(${scale * pulse})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 12,
                  backgroundColor: colors.backgroundLight,
                  border: `2px solid ${apreeColors.metabase}60`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  boxShadow: `0 0 30px ${apreeColors.metabase}20`,
                }}
              >
                {stage.icon}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: apreeColors.metabase,
                  fontFamily: "Inter, system-ui, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {stage.label}
              </span>
            </div>

            {/* Arrow after */}
            <PipelineArrow
              frame={frame}
              delay={stage.delay + 20}
              color={apreeColors.metabase}
            />
          </React.Fragment>
        );
      })}

      {/* MetaBase logo/icon */}
      <MetaBaseIcon frame={frame} fps={fps} delay={50} />
    </div>
  );
};

// Data sources block
const DataSourcesBlock: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const progress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const sources = ["PostgreSQL", "APIs", "Sheets"];

  return (
    <div
      style={{
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 16,
        backgroundColor: colors.backgroundLight,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: colors.textMuted,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Sources
      </span>
      {sources.map((source, i) => (
        <div
          key={source}
          style={{
            fontSize: 12,
            color: colors.text,
            fontFamily: "monospace",
            padding: "4px 8px",
            backgroundColor: colors.background,
            borderRadius: 4,
          }}
        >
          {source}
        </div>
      ))}
    </div>
  );
};

// Pipeline arrow
const PipelineArrow: React.FC<{
  frame: number;
  delay: number;
  color: string;
}> = ({ frame, delay, color }) => {
  const progress = interpolate(
    frame - delay,
    [0, 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <svg
      width="40"
      height="20"
      viewBox="0 0 40 20"
      style={{
        opacity: progress,
      }}
    >
      <path
        d="M5 10 L30 10 M25 5 L30 10 L25 15"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`${progress * 35} 35`}
      />
    </svg>
  );
};

// MetaBase icon
const MetaBaseIcon: React.FC<{ frame: number; fps: number; delay: number }> = ({
  frame,
  fps,
  delay,
}) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.bouncy,
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [0.5, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <ServiceIcon
        service="analytics"
        size={100}
        animateIn={false}
        showLabel={true}
        label="MetaBase"
      />
    </div>
  );
};

// Dashboard preview
const DashboardPreview: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const progress = spring({
    frame: frame - 60,
    fps,
    config: springConfigs.smooth,
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const y = interpolate(progress, [0, 1], [30, 0]);

  // Animated chart bars
  const bars = [
    { height: 60, color: colors.primary },
    { height: 90, color: colors.success },
    { height: 45, color: colors.warning },
    { height: 75, color: colors.secondary },
    { height: 100, color: colors.primary },
    { height: 55, color: colors.success },
  ];

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        gap: 30,
      }}
    >
      {/* Bar chart */}
      <div
        style={{
          width: 280,
          height: 160,
          backgroundColor: colors.backgroundLight,
          borderRadius: 12,
          border: `1px solid ${colors.border}`,
          padding: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: colors.textMuted,
            marginBottom: 12,
          }}
        >
          Sales KPI
        </span>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            gap: 12,
          }}
        >
          {bars.map((bar, i) => {
            const barProgress = interpolate(
              frame - 70 - i * 5,
              [0, 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: bar.height * barProgress,
                  backgroundColor: bar.color,
                  borderRadius: 4,
                  opacity: 0.8,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Line chart */}
      <div
        style={{
          width: 280,
          height: 160,
          backgroundColor: colors.backgroundLight,
          borderRadius: 12,
          border: `1px solid ${colors.border}`,
          padding: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: colors.textMuted,
            marginBottom: 12,
          }}
        >
          Revenue Trend
        </span>
        <svg
          style={{ flex: 1 }}
          viewBox="0 0 240 100"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[25, 50, 75].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="240"
              y2={y}
              stroke={colors.border}
              strokeWidth="1"
              opacity="0.5"
            />
          ))}

          {/* Animated line */}
          <path
            d="M 0 80 Q 40 60 80 55 T 160 35 T 240 20"
            fill="none"
            stroke={colors.success}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="300"
            strokeDashoffset={interpolate(
              frame - 75,
              [0, 40],
              [300, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
          />

          {/* Area under line */}
          <path
            d="M 0 80 Q 40 60 80 55 T 160 35 T 240 20 L 240 100 L 0 100 Z"
            fill={colors.success}
            opacity={interpolate(
              frame - 90,
              [0, 20],
              [0, 0.15],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
          />
        </svg>
      </div>
    </div>
  );
};
