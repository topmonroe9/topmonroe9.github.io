import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { ServiceIcon, ConnectionLine } from "../apree-components";
import { colors, springConfigs } from "../utils/animations";
import { Language, apreeTexts, getApreeText } from "../utils/apree-localization";

type Scene9Props = {
  language: Language;
};

export const Scene9_Integration: React.FC<Scene9Props> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central platform
  const centerX = 540;
  const centerY = 340;

  // All modules around the center
  const modules = [
    { type: "sales" as const, angle: -90, label: getApreeText(apreeTexts.serviceSales, language) },
    { type: "hr" as const, angle: -30, label: getApreeText(apreeTexts.serviceHR, language) },
    { type: "analytics" as const, angle: 30, label: getApreeText(apreeTexts.serviceAnalytics, language) },
    { type: "dam" as const, angle: 90, label: getApreeText(apreeTexts.serviceDAM, language) },
    { type: "sso" as const, angle: 150, label: "SSO" },
    { type: "workspace" as const, angle: -150, label: "Workspace" },
  ];

  const radius = 240;

  // Central platform animation
  const platformProgress = spring({
    frame,
    fps,
    config: springConfigs.smooth,
  });

  const platformScale = interpolate(platformProgress, [0, 1], [0.5, 1]);
  const platformOpacity = interpolate(platformProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Pulse effect for the center
  const pulse = 1 + Math.sin(frame * 0.1) * 0.03;

  return (
    <SceneWrapper
      title={getApreeText(apreeTexts.scene9Title, language)}
      phase="solution"
      phaseLabel={getApreeText(apreeTexts.solution, language)}
      stepNumber={6}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Connection lines from modules to center */}
        {modules.map((module, i) => {
          const angleRad = (module.angle * Math.PI) / 180;
          const endX = centerX + Math.cos(angleRad) * (radius - 50);
          const endY = centerY + Math.sin(angleRad) * (radius - 50);

          return (
            <ConnectionLine
              key={module.type}
              startX={centerX}
              startY={centerY}
              endX={endX}
              endY={endY}
              delay={20 + i * 8}
              duration={0.4}
              color={colors.primary}
              strokeWidth={3}
              showPulse={true}
            />
          );
        })}

        {/* Inner connections between adjacent modules */}
        {modules.map((module, i) => {
          const nextModule = modules[(i + 1) % modules.length];
          const angleRad1 = (module.angle * Math.PI) / 180;
          const angleRad2 = (nextModule.angle * Math.PI) / 180;

          const x1 = centerX + Math.cos(angleRad1) * radius;
          const y1 = centerY + Math.sin(angleRad1) * radius;
          const x2 = centerX + Math.cos(angleRad2) * radius;
          const y2 = centerY + Math.sin(angleRad2) * radius;

          return (
            <ConnectionLine
              key={`${module.type}-${nextModule.type}`}
              startX={x1}
              startY={y1}
              endX={x2}
              endY={y2}
              delay={50 + i * 6}
              duration={0.3}
              color={colors.success}
              strokeWidth={2}
              curved={true}
              dashed={true}
            />
          );
        })}

        {/* Central platform */}
        <div
          style={{
            position: "absolute",
            left: centerX,
            top: centerY,
            transform: `translate(-50%, -50%) scale(${platformScale * pulse})`,
            opacity: platformOpacity,
          }}
        >
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 24,
              backgroundColor: colors.backgroundLight,
              border: `3px solid ${colors.primary}`,
              boxShadow: `0 0 80px ${colors.primary}40`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {/* Platform icon */}
            <svg width="60" height="60" viewBox="0 0 60 60">
              <rect
                x="5"
                y="20"
                width="50"
                height="30"
                rx="4"
                fill={colors.primary}
                opacity="0.3"
              />
              <rect
                x="10"
                y="25"
                width="40"
                height="20"
                rx="2"
                fill={colors.primary}
              />
              {/* Server dots */}
              <circle cx="20" cy="35" r="3" fill="white" opacity="0.8" />
              <circle cx="30" cy="35" r="3" fill="white" opacity="0.8" />
              <circle cx="40" cy="35" r="3" fill="white" opacity="0.8" />
              {/* Connection lines up */}
              <path
                d="M30 20 L30 10 M20 20 L15 10 M40 20 L45 10"
                stroke={colors.primary}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: colors.text,
                fontFamily: "Inter, system-ui, sans-serif",
                textAlign: "center",
              }}
            >
              IT Platform
            </span>
          </div>
        </div>

        {/* Module icons around */}
        {modules.map((module, i) => {
          const angleRad = (module.angle * Math.PI) / 180;
          const x = centerX + Math.cos(angleRad) * radius;
          const y = centerY + Math.sin(angleRad) * radius;

          const moduleProgress = spring({
            frame: frame - 10 - i * 6,
            fps,
            config: springConfigs.bouncy,
          });

          const moduleOpacity = interpolate(moduleProgress, [0, 0.3], [0, 1], {
            extrapolateRight: "clamp",
          });

          const moduleScale = interpolate(moduleProgress, [0, 1], [0.5, 1]);

          // Connected state animation
          const connected = frame > 30 + i * 8;
          const connectedPulse = connected
            ? 1 + Math.sin((frame - 30 - i * 8) * 0.12) * 0.05
            : 1;

          return (
            <div
              key={module.type}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `translate(-50%, -50%) scale(${moduleScale * connectedPulse})`,
                opacity: moduleOpacity,
              }}
            >
              <ServiceIcon
                service={module.type}
                size={80}
                animateIn={false}
                showLabel={true}
                label={module.label}
              />

              {/* Connection indicator */}
              {connected && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: colors.success,
                    boxShadow: `0 0 8px ${colors.success}`,
                  }}
                />
              )}
            </div>
          );
        })}

        {/* "Unified" label */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 40,
            transform: "translateX(-50%)",
            opacity: interpolate(
              frame - 70,
              [0, 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              backgroundColor: `${colors.success}20`,
              borderRadius: 20,
              border: `1px solid ${colors.success}40`,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: colors.success,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              ✓ Unified & Secure
            </span>
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};
