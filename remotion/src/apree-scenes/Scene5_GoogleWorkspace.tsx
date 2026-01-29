import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { SceneWrapper } from "../components/SceneWrapper";
import { GoogleLogo, ITPlatformMini } from "../apree-components";
import { colors, springConfigs } from "../utils/animations";
import { apreeColors } from "../utils/apree-animations";
import { Language, apreeTexts, getApreeText } from "../utils/apree-localization";

type Scene5Props = {
  language: Language;
};

export const Scene5_GoogleWorkspace: React.FC<Scene5Props> = ({ language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Personal emails (left side, fading out)
  const personalEmails = [
    "john.sales@gmail.com",
    "anna_hr@yahoo.com",
    "mike.dev@outlook.com",
    "sales_team@mail.ru",
  ];

  // Company emails (right side, appearing)
  const companyEmails = [
    "john@company.com",
    "anna@company.com",
    "mike@company.com",
    "sales@company.com",
  ];

  const transitionStart = 30;

  return (
    <SceneWrapper
      title={getApreeText(apreeTexts.scene5Title, language)}
      subtitle={getApreeText(apreeTexts.scene5Subtitle, language)}
      phase="solution"
      phaseLabel={getApreeText(apreeTexts.solution, language)}
      stepNumber={2}
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
        {/* Google Workspace Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <GoogleLogo size={80} />
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: colors.text,
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Workspace
          </span>
        </div>

        {/* Email transition */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 60,
          }}
        >
          {/* Personal emails */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {personalEmails.map((email, i) => {
              const fadeOut = interpolate(
                frame - transitionStart - i * 5,
                [0, 20],
                [1, 0.2],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              const strikeThrough = interpolate(
                frame - transitionStart - i * 5,
                [0, 20],
                [0, 100],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <div
                  key={email}
                  style={{
                    position: "relative",
                    opacity: fadeOut,
                  }}
                >
                  <EmailBadge email={email} variant="personal" />
                  {/* Strike-through line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      height: 2,
                      width: `${strikeThrough}%`,
                      backgroundColor: colors.danger,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Arrow */}
          <TransitionArrow frame={frame} fps={fps} delay={transitionStart + 20} />

          {/* Company emails */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {companyEmails.map((email, i) => {
              const progress = spring({
                frame: frame - transitionStart - 30 - i * 8,
                fps,
                config: springConfigs.bouncy,
              });

              const opacity = interpolate(progress, [0, 0.3], [0, 1], {
                extrapolateRight: "clamp",
              });

              const x = interpolate(progress, [0, 1], [30, 0]);

              return (
                <div
                  key={email}
                  style={{
                    opacity,
                    transform: `translateX(${x}px)`,
                  }}
                >
                  <EmailBadge email={email} variant="company" />
                </div>
              );
            })}
          </div>
        </div>

        {/* User count */}
        <UserCounter frame={frame} fps={fps} delay={60} />

        {/* IT Platform Progress */}
        <Sequence from={80} layout="none">
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
          >
            <ITPlatformMini
              activeModules={["sales"]}
              currentModule="workspace"
              delay={0}
            />
          </div>
        </Sequence>
      </div>
    </SceneWrapper>
  );
};

// Email badge component
const EmailBadge: React.FC<{
  email: string;
  variant: "personal" | "company";
}> = ({ email, variant }) => {
  const isCompany = variant === "company";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 16px",
        backgroundColor: colors.backgroundLight,
        borderRadius: 10,
        border: `1px solid ${isCompany ? colors.success : colors.border}40`,
        boxShadow: isCompany ? `0 0 20px ${colors.success}20` : "none",
      }}
    >
      {/* Email icon */}
      <svg width="20" height="20" viewBox="0 0 20 20">
        <rect
          x="2"
          y="4"
          width="16"
          height="12"
          rx="2"
          fill={isCompany ? apreeColors.googleBlue : colors.textMuted}
          opacity="0.3"
        />
        <path
          d="M2 6 L10 11 L18 6"
          fill="none"
          stroke={isCompany ? apreeColors.googleBlue : colors.textMuted}
          strokeWidth="1.5"
        />
      </svg>
      <span
        style={{
          fontSize: 14,
          fontFamily: "monospace",
          color: isCompany ? colors.text : colors.textMuted,
        }}
      >
        {email}
      </span>
      {isCompany && (
        <svg width="16" height="16" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6" fill={colors.success} />
          <path
            d="M5 8 L7 10 L11 6"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

// Transition arrow
const TransitionArrow: React.FC<{ frame: number; fps: number; delay: number }> = ({
  frame,
  fps,
  delay,
}) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.smooth,
  });

  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity }}>
      <svg width="80" height="40" viewBox="0 0 80 40">
        <defs>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.danger} />
            <stop offset="100%" stopColor={colors.success} />
          </linearGradient>
        </defs>
        <path
          d="M10 20 L55 20 M45 10 L55 20 L45 30"
          fill="none"
          stroke="url(#arrowGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

// User counter
const UserCounter: React.FC<{ frame: number; fps: number; delay: number }> = ({
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

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const countValue = Math.min(120, Math.floor((frame - delay) * 3));

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 24px",
        backgroundColor: `${colors.success}15`,
        borderRadius: 12,
        border: `1px solid ${colors.success}40`,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" fill={colors.success} />
        <path
          d="M4 22 Q4 16 12 16 Q20 16 20 22"
          fill={colors.success}
          opacity="0.7"
        />
      </svg>
      <span
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: colors.success,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {countValue > 0 ? `${countValue}+` : "0"}
      </span>
      <span
        style={{
          fontSize: 14,
          color: colors.textMuted,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        users
      </span>
    </div>
  );
};
