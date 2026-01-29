import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, springConfigs } from "../utils/animations";
import { apreeColors } from "../utils/apree-animations";

type ServiceType = "sales" | "hr" | "dam" | "analytics" | "sso" | "workspace";

type ServiceIconProps = {
  service: ServiceType;
  size?: number;
  delay?: number;
  animateIn?: boolean;
  showLabel?: boolean;
  label?: string;
};

const serviceConfigs: Record<ServiceType, { color: string; icon: React.ReactNode }> = {
  sales: {
    color: "#10B981",
    icon: (
      <>
        <circle cx="24" cy="20" r="8" fill="currentColor" opacity="0.3" />
        <path d="M12 38 L24 26 L36 32 L36 42 L12 42 Z" fill="currentColor" />
        <path d="M20 18 L24 14 L28 18 L28 24 L20 24 Z" fill="currentColor" opacity="0.5" />
      </>
    ),
  },
  hr: {
    color: "#8B5CF6",
    icon: (
      <>
        <circle cx="24" cy="16" r="8" fill="currentColor" />
        <path d="M12 42 Q12 30 24 30 Q36 30 36 42" fill="currentColor" opacity="0.7" />
        <circle cx="38" cy="20" r="5" fill="currentColor" opacity="0.5" />
        <circle cx="10" cy="20" r="5" fill="currentColor" opacity="0.5" />
      </>
    ),
  },
  dam: {
    color: "#F59E0B",
    icon: (
      <>
        <rect x="8" y="12" width="32" height="24" rx="2" fill="currentColor" opacity="0.3" />
        <circle cx="18" cy="22" r="4" fill="currentColor" />
        <path d="M10 34 L20 26 L28 30 L38 22 L38 34 L10 34 Z" fill="currentColor" opacity="0.7" />
      </>
    ),
  },
  analytics: {
    color: apreeColors.metabase,
    icon: (
      <>
        <rect x="10" y="28" width="6" height="14" fill="currentColor" />
        <rect x="21" y="20" width="6" height="22" fill="currentColor" opacity="0.8" />
        <rect x="32" y="12" width="6" height="30" fill="currentColor" opacity="0.6" />
        <path d="M10 26 L24 14 L38 18" stroke="currentColor" strokeWidth="3" fill="none" />
      </>
    ),
  },
  sso: {
    color: apreeColors.googleBlue,
    icon: (
      <>
        <circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="20" y="18" width="8" height="6" rx="1" fill="currentColor" />
        <path d="M24 24 L24 32" stroke="currentColor" strokeWidth="3" />
        <circle cx="24" cy="34" r="2" fill="currentColor" />
      </>
    ),
  },
  workspace: {
    color: apreeColors.googleBlue,
    icon: (
      <>
        <circle cx="16" cy="16" r="6" fill={apreeColors.googleBlue} />
        <circle cx="32" cy="16" r="6" fill={apreeColors.googleRed} />
        <circle cx="16" cy="32" r="6" fill={apreeColors.googleGreen} />
        <circle cx="32" cy="32" r="6" fill={apreeColors.googleYellow} />
      </>
    ),
  },
};

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  service,
  size = 80,
  delay = 0,
  animateIn = true,
  showLabel = false,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = animateIn
    ? spring({
        frame: frame - delay,
        fps,
        config: springConfigs.bouncy,
      })
    : 1;

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = interpolate(progress, [0, 1], [0.5, 1]);

  const config = serviceConfigs[service];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 16,
          backgroundColor: colors.backgroundLight,
          border: `2px solid ${config.color}`,
          boxShadow: `0 0 30px ${config.color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: config.color,
        }}
      >
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 48 48">
          {config.icon}
        </svg>
      </div>
      {showLabel && label && (
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: colors.text,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// Google logo for SSO scene
export const GoogleLogo: React.FC<{ size?: number }> = ({ size = 60 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path
        d="M44 24c0-1.4-.1-2.8-.4-4H24v8h11.3c-.5 2.5-2 4.6-4.2 6v5h6.8c4-3.7 6.1-9.1 6.1-15z"
        fill={apreeColors.googleBlue}
      />
      <path
        d="M24 46c5.7 0 10.5-1.9 14-5.2l-6.8-5c-1.9 1.3-4.3 2-7.2 2-5.5 0-10.2-3.7-11.8-8.7H5v5.3C8.5 41.3 15.7 46 24 46z"
        fill={apreeColors.googleGreen}
      />
      <path
        d="M12.2 29c-.4-1.3-.7-2.6-.7-4s.3-2.7.7-4v-5H5c-1.3 2.6-2 5.5-2 8.5s.7 5.9 2 8.5l7.2-4z"
        fill={apreeColors.googleYellow}
      />
      <path
        d="M24 9.5c3.1 0 5.9 1.1 8.1 3.2l6-6C34.5 3.4 29.7 1.5 24 1.5 15.7 1.5 8.5 6.2 5 13l7.2 5.6c1.6-5 6.3-9.1 11.8-9.1z"
        fill={apreeColors.googleRed}
      />
    </svg>
  );
};

// AWS Lambda icon
export const AWSLambdaIcon: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path d="M24 4 L44 44 L4 44 Z" fill={apreeColors.aws} />
      <path d="M24 14 L34 34 L14 34 Z" fill="#252F3E" opacity="0.8" />
    </svg>
  );
};

// AWS S3 icon
export const AWSS3Icon: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="8" y="8" width="32" height="32" rx="4" fill="#569A31" />
      <path d="M16 20 L24 16 L32 20 L32 32 L24 36 L16 32 Z" fill="white" opacity="0.9" />
      <path d="M24 16 L24 36" stroke="#569A31" strokeWidth="2" />
    </svg>
  );
};

// AWS CloudFront icon
export const AWSCloudFrontIcon: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="18" fill="#8C4FFF" />
      <circle cx="24" cy="24" r="10" fill="white" opacity="0.3" />
      <circle cx="24" cy="24" r="5" fill="white" />
    </svg>
  );
};
