import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  AbsoluteFill,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { ITPlatformMini } from "../apree-components";
import { colors, springConfigs } from "../utils/animations";
import { apreeColors } from "../utils/apree-animations";
import { Language, apreeTexts, getApreeText } from "../utils/apree-localization";

type Scene8Props = {
  language: Language;
};

export const Scene8_ContentSystem: React.FC<Scene8Props> = ({ language }) => {
  return (
    <SceneWrapper
      title={getApreeText(apreeTexts.scene8Title, language)}
      subtitle={getApreeText(apreeTexts.scene8Subtitle, language)}
      phase="solution"
      phaseLabel={getApreeText(apreeTexts.solution, language)}
      stepNumber={5}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Phase 1: MEGA (frames 0-50) */}
        <Sequence durationInFrames={55} layout="none">
          <MEGAPhase />
        </Sequence>

        {/* Phase 2: Transition Arrow (frames 45-75) */}
        <Sequence from={45} durationInFrames={35} layout="none">
          <TransitionPhase />
        </Sequence>

        {/* Phase 3: AWS (frames 65+) */}
        <Sequence from={65} layout="none">
          <AWSPhase />
        </Sequence>

        {/* IT Platform Progress (frames 110+) */}
        <Sequence from={110} layout="none">
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
          >
            <ITPlatformMini
              activeModules={["sales", "workspace", "sso", "analytics"]}
              currentModule="dam"
              delay={0}
            />
          </div>
        </Sequence>
      </AbsoluteFill>
    </SceneWrapper>
  );
};

// Phase 1: MEGA system
const MEGAPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  const exitProgress = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(enterProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  }) * (1 - exitProgress);

  const scale = interpolate(enterProgress, [0, 1], [0.9, 1]) *
    interpolate(exitProgress, [0, 1], [1, 0.85]);

  const files = [
    { type: "image", x: 30, y: 50 },
    { type: "video", x: 110, y: 35 },
    { type: "doc", x: 180, y: 60 },
    { type: "image", x: 60, y: 120 },
    { type: "video", x: 140, y: 130 },
  ];

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        position: "relative",
        width: 320,
        height: 260,
        backgroundColor: colors.backgroundLight,
        borderRadius: 20,
        border: `2px solid ${colors.warning}50`,
        overflow: "hidden",
        boxShadow: `0 0 40px ${colors.warning}20`,
      }}
    >
      {/* MEGA header */}
      <div
        style={{
          padding: "14px 20px",
          backgroundColor: "#D9272E",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 24,
            backgroundColor: "white",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 800,
            color: "#D9272E",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          MEGA
        </div>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "white",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Cloud Storage
        </span>
      </div>

      {/* Files */}
      {files.map((file, i) => {
        const float = Math.sin((frame + i * 20) / 25) * 4;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: file.x,
              top: file.y + 48 + float,
            }}
          >
            <FileIcon type={file.type as "image" | "video" | "doc"} />
          </div>
        );
      })}

      {/* Warning */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 14,
          right: 14,
          padding: "10px 14px",
          backgroundColor: `${colors.danger}15`,
          borderRadius: 10,
          border: `1px solid ${colors.danger}40`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 18 }}>⚠️</span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: colors.danger,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          No access control
        </span>
      </div>
    </div>
  );
};

// Phase 2: Transition
const TransitionPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: springConfigs.bouncy,
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [20, 35], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = 1 + Math.sin(frame * 0.2) * 0.08;

  return (
    <div
      style={{
        opacity: opacity * exitOpacity,
        transform: `scale(${pulse})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <svg width="140" height="70" viewBox="0 0 140 70">
        <defs>
          <linearGradient id="migrationGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.danger} />
            <stop offset="50%" stopColor={colors.warning} />
            <stop offset="100%" stopColor={apreeColors.aws} />
          </linearGradient>
        </defs>
        <path
          d="M20 35 L100 35 M85 20 L105 35 L85 50"
          fill="none"
          stroke="url(#migrationGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: colors.text,
          fontFamily: "Inter, system-ui, sans-serif",
          textTransform: "uppercase",
          letterSpacing: 3,
        }}
      >
        Migration
      </span>
    </div>
  );
};

// Phase 3: AWS
const AWSPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  const opacity = interpolate(progress, [0, 0.4], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [0.9, 1]);

  const services = [
    { name: "Lambda", color: apreeColors.aws, icon: "λ" },
    { name: "S3", color: "#569A31", icon: "S3" },
    { name: "CloudFront", color: "#8C4FFF", icon: "CF" },
    { name: "Cognito", color: "#DD344C", icon: "🔐" },
  ];

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* AWS Cloud container */}
      <div
        style={{
          position: "relative",
          width: 400,
          height: 300,
          backgroundColor: `${apreeColors.aws}08`,
          borderRadius: 24,
          border: `2px solid ${apreeColors.aws}50`,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: `0 0 60px ${apreeColors.aws}25`,
        }}
      >
        {/* AWS Logo badge */}
        <div
          style={{
            position: "absolute",
            top: -18,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: colors.background,
            padding: "8px 24px",
            borderRadius: 12,
            border: `2px solid ${apreeColors.aws}`,
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: apreeColors.aws,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            ☁️ AWS
          </span>
        </div>

        {/* Services grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            marginTop: 40,
          }}
        >
          {services.map((service, index) => {
            const sProgress = spring({
              frame: frame - 5 - index * 6,
              fps,
              config: springConfigs.bouncy,
            });

            const sOpacity = interpolate(sProgress, [0, 0.3], [0, 1], {
              extrapolateRight: "clamp",
            });

            const sScale = interpolate(sProgress, [0, 1], [0.6, 1]);

            return (
              <div
                key={service.name}
                style={{
                  opacity: sOpacity,
                  transform: `scale(${sScale})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  padding: 16,
                  backgroundColor: colors.backgroundLight,
                  borderRadius: 14,
                  border: `2px solid ${service.color}50`,
                  boxShadow: `0 0 20px ${service.color}15`,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    backgroundColor: `${service.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    fontWeight: 700,
                    color: service.color,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {service.icon}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: colors.text,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {service.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits row */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 20,
          }}
        >
          {["✓ Secure", "✓ Scalable", "✓ CDN"].map((benefit, i) => {
            const bProgress = spring({
              frame: frame - 35 - i * 5,
              fps,
              config: springConfigs.snappy,
            });

            return (
              <span
                key={benefit}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.success,
                  fontFamily: "Inter, system-ui, sans-serif",
                  opacity: interpolate(bProgress, [0, 1], [0, 1], {
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                {benefit}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// File icon
const FileIcon: React.FC<{ type: "image" | "video" | "doc" }> = ({ type }) => {
  const configs = {
    image: { color: "#10B981", icon: "🖼️" },
    video: { color: "#8B5CF6", icon: "🎬" },
    doc: { color: "#3B82F6", icon: "📄" },
  };

  const config = configs[type];

  return (
    <div
      style={{
        width: 48,
        height: 56,
        backgroundColor: colors.background,
        borderRadius: 8,
        border: `1px solid ${config.color}50`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
      }}
    >
      {config.icon}
    </div>
  );
};
