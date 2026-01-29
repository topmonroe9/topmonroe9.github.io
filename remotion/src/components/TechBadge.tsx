import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, springConfigs } from "../utils/animations";

type TechBadgeProps = {
  name: string;
  icon?: string;
  delay?: number;
  color?: string;
};

const techColors: Record<string, string> = {
  Python: "#3776AB",
  FastAPI: "#009688",
  "Claude API": "#D97706",
  "GCP Vision": "#4285F4",
  RapidFuzz: "#8B5CF6",
  React: "#61DAFB",
  TypeScript: "#3178C6",
};

export const TechBadge: React.FC<TechBadgeProps> = ({
  name,
  delay = 0,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfigs.bouncy,
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [0.5, 1]);

  const badgeColor = color || techColors[name] || colors.primary;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 28px",
        backgroundColor: colors.backgroundLight,
        border: `2px solid ${badgeColor}`,
        borderRadius: 12,
        boxShadow: `0 0 20px ${badgeColor}40`,
      }}
    >
      <TechIcon name={name} color={badgeColor} />
      <span
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: colors.text,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {name}
      </span>
    </div>
  );
};

const TechIcon: React.FC<{ name: string; color: string }> = ({ name, color }) => {
  const size = 32;

  // Simple icon representations
  const icons: Record<string, React.ReactNode> = {
    Python: (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <path
          d="M16 4C12 4 9 5 9 8v3h7v1H7c-2 0-4 2-4 5s2 5 4 5h3v-3c0-2 2-4 4-4h8c2 0 4-2 4-4V8c0-3-3-4-7-4h-3zm-3 2a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
          fill={color}
        />
        <path
          d="M16 28c4 0 7-1 7-4v-3h-7v-1h9c2 0 4-2 4-5s-2-5-4-5h-3v3c0 2-2 4-4 4H10c-2 0-4 2-4 4v4c0 3 3 4 7 4h3zm3-2a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
          fill={color}
          opacity="0.7"
        />
      </svg>
    ),
    FastAPI: (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" fill="none" stroke={color} strokeWidth="2" />
        <path d="M16 8v16M10 16h12" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    "Claude API": (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" fill={color} opacity="0.2" />
        <circle cx="16" cy="16" r="8" fill={color} opacity="0.4" />
        <circle cx="16" cy="16" r="4" fill={color} />
      </svg>
    ),
    "GCP Vision": (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="10" fill="none" stroke={color} strokeWidth="2" />
        <circle cx="16" cy="16" r="4" fill={color} />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke={color} strokeWidth="2" />
      </svg>
    ),
    RapidFuzz: (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <path d="M4 16h24" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M8 10l4 6-4 6M24 10l-4 6 4 6" stroke={color} strokeWidth="2" fill="none" />
      </svg>
    ),
  };

  return icons[name] || (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect x="4" y="4" width="24" height="24" rx="4" fill={color} opacity="0.3" />
      <rect x="8" y="8" width="16" height="16" rx="2" fill={color} />
    </svg>
  );
};

// Tech stack row component
type TechStackRowProps = {
  technologies: string[];
  startDelay?: number;
  delayBetween?: number;
};

export const TechStackRow: React.FC<TechStackRowProps> = ({
  technologies,
  startDelay = 0,
  delayBetween = 8,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 20,
      }}
    >
      {technologies.map((tech, index) => (
        <TechBadge key={tech} name={tech} delay={startDelay + index * delayBetween} />
      ))}
    </div>
  );
};
