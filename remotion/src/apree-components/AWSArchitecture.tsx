import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, springConfigs } from "../utils/animations";
import { apreeColors } from "../utils/apree-animations";

type AWSArchitectureProps = {
  delay?: number;
};

export const AWSArchitecture: React.FC<AWSArchitectureProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Individual service animations
  const serviceDelay = (index: number) => delay + index * 8;

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* AWS Cloud container */}
      <div
        style={{
          position: "relative",
          width: 400,
          height: 280,
          backgroundColor: `${apreeColors.aws}10`,
          borderRadius: 24,
          border: `2px solid ${apreeColors.aws}40`,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* AWS Logo */}
        <div
          style={{
            position: "absolute",
            top: -16,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: colors.background,
            padding: "4px 16px",
            borderRadius: 8,
          }}
        >
          <svg width="60" height="36" viewBox="0 0 60 36">
            <path
              d="M18 24c-5 0-9-3-9-7s4-7 9-7c1 0 2 0 3 .5C22 6 26 3 31 3c6 0 11 4 12 10 4 1 7 4 7 8 0 5-4 9-9 9H18z"
              fill={apreeColors.aws}
            />
            <text
              x="30"
              y="20"
              textAnchor="middle"
              fontSize="8"
              fill="white"
              fontWeight="bold"
              fontFamily="Inter, system-ui, sans-serif"
            >
              AWS
            </text>
          </svg>
        </div>

        {/* Services grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            marginTop: 30,
          }}
        >
          {services.map((service, index) => {
            const sProgress = spring({
              frame: frame - serviceDelay(index),
              fps,
              config: springConfigs.bouncy,
            });

            const sOpacity = interpolate(sProgress, [0, 0.3], [0, 1], {
              extrapolateRight: "clamp",
            });

            const sScale = interpolate(sProgress, [0, 1], [0.5, 1]);

            return (
              <div
                key={service.name}
                style={{
                  opacity: sOpacity,
                  transform: `scale(${sScale})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: 16,
                  backgroundColor: colors.backgroundLight,
                  borderRadius: 12,
                  border: `1px solid ${service.color}60`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    backgroundColor: `${service.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    color: service.color,
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {service.icon}
                </div>
                <div
                  style={{
                    fontSize: 14,
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

        {/* Connection lines (simplified) */}
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
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={apreeColors.aws}
                opacity="0.5"
              />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
};
