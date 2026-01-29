import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { SmallGoogleSheetIcon } from "../apree-components";
import { colors, springConfigs } from "../utils/animations";
import { Language, apreeTexts, getApreeText } from "../utils/apree-localization";

type Scene3Props = {
  language: Language;
};

export const Scene3_DataLeaks: React.FC<Scene3Props> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three columns for the three problems
  const columnDelay = 15;

  return (
    <SceneWrapper
      title={getApreeText(apreeTexts.scene3Title, language)}
      phase="problem"
      phaseLabel={getApreeText(apreeTexts.problem, language)}
      stepNumber={3}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 60,
          width: "100%",
        }}
      >
        {/* Column 1: Files disappear */}
        <ProblemColumn
          frame={frame}
          fps={fps}
          delay={0}
          title={getApreeText(apreeTexts.scene3Item1, language)}
          icon={<DisappearingFilesIcon frame={frame} />}
        />

        {/* Column 2: Access leaks */}
        <ProblemColumn
          frame={frame}
          fps={fps}
          delay={columnDelay}
          title={getApreeText(apreeTexts.scene3Item2, language)}
          icon={<OpenLockIcon frame={frame} delay={columnDelay} />}
        />

        {/* Column 3: Multiple accounts */}
        <ProblemColumn
          frame={frame}
          fps={fps}
          delay={columnDelay * 2}
          title={getApreeText(apreeTexts.scene3Item3, language)}
          icon={<MultipleAccountsIcon frame={frame} delay={columnDelay * 2} />}
        />
      </div>
    </SceneWrapper>
  );
};

// Problem column component
type ProblemColumnProps = {
  frame: number;
  fps: number;
  delay: number;
  title: string;
  icon: React.ReactNode;
};

const ProblemColumn: React.FC<ProblemColumnProps> = ({
  frame,
  fps,
  delay,
  title,
  icon,
}) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const opacity = interpolate(progress, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  const y = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        width: 260,
      }}
    >
      <div
        style={{
          width: 200,
          height: 200,
          backgroundColor: colors.backgroundLight,
          borderRadius: 20,
          border: `2px solid ${colors.danger}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 40px ${colors.danger}15`,
          overflow: "hidden",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: colors.text,
          fontFamily: "Inter, system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        {title}
      </div>
    </div>
  );
};

// Animated icon: Files disappearing
const DisappearingFilesIcon: React.FC<{ frame: number }> = ({ frame }) => {
  const files = [0, 1, 2, 3, 4];

  return (
    <div style={{ position: "relative", width: 120, height: 140 }}>
      {files.map((i) => {
        // Staggered disappearing animation
        const cycleLength = 60;
        const fileDelay = i * 10;
        const cycleFrame = (frame + fileDelay) % cycleLength;

        const opacity = interpolate(
          cycleFrame,
          [0, 20, 40, 60],
          [1, 1, 0.3, 0],
          { extrapolateRight: "clamp" }
        );

        const x = interpolate(
          cycleFrame,
          [30, 60],
          [0, 50],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 10 + (i % 3) * 35,
              top: 10 + Math.floor(i / 3) * 50,
              opacity,
              transform: `translateX(${x}px)`,
            }}
          >
            <SmallGoogleSheetIcon color={colors.danger} />
          </div>
        );
      })}

      {/* Ghost/fade effect */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 60,
          background: `linear-gradient(to right, transparent, ${colors.backgroundLight})`,
        }}
      />
    </div>
  );
};

// Animated icon: Open lock
const OpenLockIcon: React.FC<{ frame: number; delay: number }> = ({ frame, delay }) => {
  const openProgress = interpolate(
    frame - delay - 20,
    [0, 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const shackleRotation = interpolate(openProgress, [0, 1], [0, -30]);

  return (
    <svg width="100" height="120" viewBox="0 0 100 120">
      {/* Lock body */}
      <rect
        x="20"
        y="55"
        width="60"
        height="50"
        rx="8"
        fill={colors.danger}
        opacity="0.8"
      />

      {/* Shackle (animated) */}
      <g
        style={{
          transformOrigin: "70px 55px",
          transform: `rotate(${shackleRotation}deg)`,
        }}
      >
        <path
          d="M30 55 L30 35 Q30 15 50 15 Q70 15 70 35 L70 55"
          fill="none"
          stroke={colors.danger}
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>

      {/* Keyhole */}
      <circle cx="50" cy="80" r="8" fill={colors.backgroundLight} />
      <rect x="47" y="80" width="6" height="15" fill={colors.backgroundLight} />

      {/* Warning exclamation */}
      <text
        x="50"
        y="45"
        textAnchor="middle"
        fontSize="20"
        fill={colors.danger}
        fontWeight="bold"
        opacity={openProgress}
      >
        !
      </text>
    </svg>
  );
};

// Animated icon: Multiple accounts
const MultipleAccountsIcon: React.FC<{ frame: number; delay: number }> = ({
  frame,
  delay,
}) => {
  const accounts = [
    { x: 50, y: 40, size: 40, delay: 0 },
    { x: 25, y: 70, size: 32, delay: 8 },
    { x: 75, y: 70, size: 32, delay: 12 },
    { x: 35, y: 95, size: 28, delay: 16 },
    { x: 65, y: 95, size: 28, delay: 20 },
  ];

  return (
    <svg width="100" height="130" viewBox="0 0 100 130">
      {accounts.map((acc, i) => {
        const progress = interpolate(
          frame - delay - acc.delay,
          [0, 15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const scale = interpolate(progress, [0, 1], [0.5, 1]);
        const opacity = interpolate(progress, [0, 0.5], [0, 1], {
          extrapolateRight: "clamp",
        });

        return (
          <g
            key={i}
            style={{
              transform: `translate(${acc.x}px, ${acc.y}px) scale(${scale})`,
              transformOrigin: "0 0",
              opacity,
            }}
          >
            {/* User circle */}
            <circle
              cx="0"
              cy={-acc.size * 0.3}
              r={acc.size * 0.25}
              fill={i === 0 ? colors.danger : `${colors.danger}80`}
            />
            {/* Body arc */}
            <path
              d={`M ${-acc.size * 0.35} ${acc.size * 0.15} Q 0 ${-acc.size * 0.1} ${acc.size * 0.35} ${acc.size * 0.15}`}
              fill="none"
              stroke={i === 0 ? colors.danger : `${colors.danger}80`}
              strokeWidth={acc.size * 0.15}
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* Question marks */}
      <text
        x="15"
        y="120"
        fontSize="14"
        fill={colors.textMuted}
        fontFamily="Inter, system-ui, sans-serif"
      >
        ?
      </text>
      <text
        x="85"
        y="120"
        fontSize="14"
        fill={colors.textMuted}
        fontFamily="Inter, system-ui, sans-serif"
      >
        ?
      </text>
    </svg>
  );
};
