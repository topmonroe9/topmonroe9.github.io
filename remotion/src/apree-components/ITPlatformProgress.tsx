import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, springConfigs } from "../utils/animations";

// Modules that can be added to the platform
export type PlatformModule = "sales" | "workspace" | "sso" | "analytics" | "dam";

type ITPlatformProgressProps = {
  activeModules: PlatformModule[];
  currentModule?: PlatformModule;
  size?: "small" | "medium" | "large";
  showLabels?: boolean;
  animateCurrentModule?: boolean;
  delay?: number;
};

const moduleConfigs: Record<PlatformModule, { label: string; color: string; icon: string }> = {
  sales: { label: "Sales", color: "#10B981", icon: "💼" },
  workspace: { label: "Workspace", color: "#4285F4", icon: "📧" },
  sso: { label: "SSO", color: "#8B5CF6", icon: "🔐" },
  analytics: { label: "Analytics", color: "#509EE3", icon: "📊" },
  dam: { label: "DAM", color: "#FF9900", icon: "☁️" },
};

const allModules: PlatformModule[] = ["sales", "workspace", "sso", "analytics", "dam"];

export const ITPlatformProgress: React.FC<ITPlatformProgressProps> = ({
  activeModules,
  currentModule,
  size = "medium",
  showLabels = true,
  animateCurrentModule = true,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sizes = {
    small: { container: 200, module: 32, gap: 8, fontSize: 8, centerSize: 40 },
    medium: { container: 320, module: 48, gap: 12, fontSize: 11, centerSize: 60 },
    large: { container: 450, module: 64, gap: 16, fontSize: 14, centerSize: 80 },
  };

  const s = sizes[size];

  // Container animation
  const containerProgress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const containerOpacity = interpolate(containerProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Calculate positions for modules (pentagon layout around center)
  const getModulePosition = (index: number, total: number) => {
    const angleOffset = -90; // Start from top
    const angle = angleOffset + (index * 360) / total;
    const angleRad = (angle * Math.PI) / 180;
    const radius = s.container * 0.35;
    return {
      x: Math.cos(angleRad) * radius,
      y: Math.sin(angleRad) * radius,
    };
  };

  return (
    <div
      style={{
        opacity: containerOpacity,
        width: s.container,
        height: s.container,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Connection lines from center to modules */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {allModules.map((module, index) => {
          const pos = getModulePosition(index, allModules.length);
          const isActive = activeModules.includes(module);
          const isCurrent = module === currentModule;

          const lineProgress = isActive
            ? 1
            : isCurrent && animateCurrentModule
            ? interpolate(
                frame - delay - 20,
                [0, 15],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            : 0;

          return (
            <line
              key={`line-${module}`}
              x1={s.container / 2}
              y1={s.container / 2}
              x2={s.container / 2 + pos.x}
              y2={s.container / 2 + pos.y}
              stroke={moduleConfigs[module].color}
              strokeWidth={2}
              opacity={lineProgress * 0.6}
              strokeDasharray={`${lineProgress * 100} 100`}
            />
          );
        })}
      </svg>

      {/* Central IT Platform hub */}
      <div
        style={{
          width: s.centerSize,
          height: s.centerSize,
          borderRadius: s.centerSize / 4,
          backgroundColor: colors.backgroundLight,
          border: `2px solid ${colors.primary}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 20px ${colors.primary}30`,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: s.fontSize + 2,
            fontWeight: 700,
            color: colors.primary,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          IT
        </span>
      </div>

      {/* Module nodes */}
      {allModules.map((module, index) => {
        const pos = getModulePosition(index, allModules.length);
        const config = moduleConfigs[module];
        const isActive = activeModules.includes(module);
        const isCurrent = module === currentModule;

        // Animation for current module being added
        const moduleProgress =
          isCurrent && animateCurrentModule
            ? spring({
                frame: frame - delay - 10,
                fps,
                config: springConfigs.bouncy,
              })
            : isActive
            ? 1
            : 0;

        const moduleOpacity = interpolate(moduleProgress, [0, 0.3], [0, 1], {
          extrapolateRight: "clamp",
        });

        const moduleScale = interpolate(moduleProgress, [0, 1], [0.5, 1]);

        // Pulse effect for current module
        const pulse =
          isCurrent && animateCurrentModule
            ? 1 + Math.sin((frame - delay) * 0.2) * 0.1
            : 1;

        return (
          <div
            key={module}
            style={{
              position: "absolute",
              left: s.container / 2 + pos.x - s.module / 2,
              top: s.container / 2 + pos.y - s.module / 2,
              opacity: isActive || isCurrent ? moduleOpacity : 0.2,
              transform: `scale(${moduleScale * pulse})`,
            }}
          >
            <div
              style={{
                width: s.module,
                height: s.module,
                borderRadius: s.module / 4,
                backgroundColor:
                  isActive || isCurrent
                    ? colors.backgroundLight
                    : colors.background,
                border: `2px solid ${
                  isActive || isCurrent ? config.color : colors.border
                }`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  isActive || isCurrent
                    ? `0 0 15px ${config.color}40`
                    : "none",
              }}
            >
              <span style={{ fontSize: s.module * 0.45 }}>{config.icon}</span>
            </div>
            {showLabels && (
              <div
                style={{
                  position: "absolute",
                  top: s.module + 4,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: s.fontSize,
                  fontWeight: 600,
                  color:
                    isActive || isCurrent ? colors.text : colors.textMuted,
                  fontFamily: "Inter, system-ui, sans-serif",
                  whiteSpace: "nowrap",
                  opacity: isActive || isCurrent ? 1 : 0.5,
                }}
              >
                {config.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Compact version for corner placement
export const ITPlatformMini: React.FC<{
  activeModules: PlatformModule[];
  currentModule?: PlatformModule;
  delay?: number;
}> = ({ activeModules, currentModule, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        padding: 12,
        backgroundColor: `${colors.background}E0`,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: colors.textMuted,
          marginBottom: 8,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        IT Platform
      </div>
      <div
        style={{
          display: "flex",
          gap: 6,
        }}
      >
        {allModules.map((module) => {
          const config = moduleConfigs[module];
          const isActive = activeModules.includes(module);
          const isCurrent = module === currentModule;

          const pulse = isCurrent ? 1 + Math.sin((frame - delay) * 0.2) * 0.15 : 1;

          return (
            <div
              key={module}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                backgroundColor:
                  isActive || isCurrent
                    ? `${config.color}30`
                    : colors.backgroundLight,
                border: `1.5px solid ${
                  isActive || isCurrent ? config.color : colors.border
                }`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${pulse})`,
                transition: "none",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  opacity: isActive || isCurrent ? 1 : 0.3,
                }}
              >
                {config.icon}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
