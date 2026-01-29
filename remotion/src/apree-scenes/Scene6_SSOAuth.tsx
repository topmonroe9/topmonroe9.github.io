import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { GoogleLogo, ServiceIcon, ConnectionLine, ITPlatformMini } from "../apree-components";
import { colors, springConfigs } from "../utils/animations";
import { apreeColors } from "../utils/apree-animations";
import { Language, apreeTexts, getApreeText } from "../utils/apree-localization";

type Scene6Props = {
  language: Language;
};

export const Scene6_SSOAuth: React.FC<Scene6Props> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Center position for Google logo
  const centerX = 540;
  const centerY = 340;

  // Services positioned in a circle around the center
  const services = [
    { type: "sales" as const, angle: -60, label: getApreeText(apreeTexts.serviceSales, language) },
    { type: "hr" as const, angle: 0, label: getApreeText(apreeTexts.serviceHR, language) },
    { type: "dam" as const, angle: 60, label: getApreeText(apreeTexts.serviceDAM, language) },
    { type: "analytics" as const, angle: 120, label: getApreeText(apreeTexts.serviceAnalytics, language) },
  ];

  const radius = 260;

  // Google logo animation
  const logoProgress = spring({
    frame,
    fps,
    config: springConfigs.bouncy,
  });

  const logoScale = interpolate(logoProgress, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Rays animation
  const rayDelay = 25;

  return (
    <SceneWrapper
      title={getApreeText(apreeTexts.scene6Title, language)}
      subtitle={getApreeText(apreeTexts.scene6Subtitle, language)}
      phase="solution"
      phaseLabel={getApreeText(apreeTexts.solution, language)}
      stepNumber={3}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Connection rays from center to services */}
        {services.map((service, i) => {
          const angleRad = (service.angle * Math.PI) / 180;
          const endX = centerX + Math.cos(angleRad) * (radius - 40);
          const endY = centerY + Math.sin(angleRad) * (radius - 40);

          return (
            <ConnectionLine
              key={service.type}
              startX={centerX}
              startY={centerY}
              endX={endX}
              endY={endY}
              delay={rayDelay + i * 12}
              duration={0.5}
              color={apreeColors.googleBlue}
              strokeWidth={3}
              showPulse={true}
            />
          );
        })}

        {/* Center: Google logo with glow */}
        <div
          style={{
            position: "absolute",
            left: centerX,
            top: centerY,
            transform: `translate(-50%, -50%) scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              backgroundColor: colors.backgroundLight,
              border: `3px solid ${apreeColors.googleBlue}`,
              boxShadow: `0 0 60px ${apreeColors.googleBlue}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GoogleLogo size={80} />
          </div>

          {/* SSO label */}
          <div
            style={{
              position: "absolute",
              bottom: -35,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "6px 16px",
              backgroundColor: colors.primary,
              borderRadius: 6,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "white",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Single Sign-On
            </span>
          </div>
        </div>

        {/* Service icons around the center */}
        {services.map((service, i) => {
          const angleRad = (service.angle * Math.PI) / 180;
          const x = centerX + Math.cos(angleRad) * radius;
          const y = centerY + Math.sin(angleRad) * radius;

          const serviceProgress = spring({
            frame: frame - rayDelay - 10 - i * 12,
            fps,
            config: springConfigs.bouncy,
          });

          const serviceOpacity = interpolate(serviceProgress, [0, 0.3], [0, 1], {
            extrapolateRight: "clamp",
          });

          const serviceScale = interpolate(serviceProgress, [0, 1], [0.5, 1]);

          // Pulse animation when connected
          const connected = frame > rayDelay + 30 + i * 12;
          const pulse = connected
            ? 1 + Math.sin((frame - rayDelay - 30 - i * 12) * 0.15) * 0.05
            : 1;

          return (
            <div
              key={service.type}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `translate(-50%, -50%) scale(${serviceScale * pulse})`,
                opacity: serviceOpacity,
              }}
            >
              <ServiceIcon
                service={service.type}
                size={90}
                animateIn={false}
                showLabel={true}
                label={service.label}
              />

              {/* Checkmark when connected */}
              {connected && (
                <div
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: colors.success,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 12px ${colors.success}60`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path
                      d="M4 8 L6.5 10.5 L12 5"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}

        {/* Decorative rays/beams from center */}
        <RayBurst frame={frame} centerX={centerX} centerY={centerY} delay={rayDelay} />

        {/* IT Platform Progress */}
        <Sequence from={100} layout="none">
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
          >
            <ITPlatformMini
              activeModules={["sales", "workspace"]}
              currentModule="sso"
              delay={0}
            />
          </div>
        </Sequence>
      </div>
    </SceneWrapper>
  );
};

// Decorative ray burst effect
const RayBurst: React.FC<{
  frame: number;
  centerX: number;
  centerY: number;
  delay: number;
}> = ({ frame, centerX, centerY, delay }) => {
  const rays = 12;
  const rayLength = 180;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (i * 360) / rays;
        const angleRad = (angle * Math.PI) / 180;

        const startX = centerX + Math.cos(angleRad) * 80;
        const startY = centerY + Math.sin(angleRad) * 80;
        const endX = centerX + Math.cos(angleRad) * rayLength;
        const endY = centerY + Math.sin(angleRad) * rayLength;

        const progress = interpolate(
          frame - delay - i * 2,
          [0, 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Fade out over time
        const fadeOut = interpolate(
          frame - delay - 30,
          [0, 30],
          [1, 0.2],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <line
            key={i}
            x1={startX}
            y1={startY}
            x2={interpolate(progress, [0, 1], [startX, endX])}
            y2={interpolate(progress, [0, 1], [startY, endY])}
            stroke={apreeColors.googleBlue}
            strokeWidth={2}
            opacity={0.3 * progress * fadeOut}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};
