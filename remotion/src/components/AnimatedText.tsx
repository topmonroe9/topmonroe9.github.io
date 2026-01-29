import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, springConfigs } from "../utils/animations";

type AnimatedTextProps = {
  text: string;
  fontSize?: number;
  color?: string;
  delay?: number;
  style?: React.CSSProperties;
  variant?: "title" | "subtitle" | "body";
  align?: "left" | "center" | "right";
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize,
  color = colors.text,
  delay = 0,
  style,
  variant = "title",
  align = "center",
}) => {
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

  const translateY = interpolate(progress, [0, 1], [30, 0]);

  const defaultFontSize =
    variant === "title" ? 56 : variant === "subtitle" ? 32 : 24;

  const fontWeight = variant === "title" ? 700 : variant === "subtitle" ? 500 : 400;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontSize: fontSize || defaultFontSize,
        fontWeight,
        color,
        fontFamily: "Inter, system-ui, sans-serif",
        textAlign: align,
        lineHeight: 1.3,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

// Animated text that appears word by word
type WordByWordTextProps = {
  text: string;
  fontSize?: number;
  color?: string;
  delay?: number;
  delayPerWord?: number;
  style?: React.CSSProperties;
};

export const WordByWordText: React.FC<WordByWordTextProps> = ({
  text,
  fontSize = 56,
  color = colors.text,
  delay = 0,
  delayPerWord = 5,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.25em",
        fontFamily: "Inter, system-ui, sans-serif",
        ...style,
      }}
    >
      {words.map((word, index) => {
        const wordDelay = delay + index * delayPerWord;
        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: springConfigs.smooth,
        });

        const opacity = interpolate(progress, [0, 0.5], [0, 1], {
          extrapolateRight: "clamp",
        });

        const translateY = interpolate(progress, [0, 1], [20, 0]);

        return (
          <span
            key={index}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              fontSize,
              fontWeight: 700,
              color,
              display: "inline-block",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// Text with typewriter effect
type TypewriterTextProps = {
  text: string;
  fontSize?: number;
  color?: string;
  delay?: number;
  charsPerFrame?: number;
  style?: React.CSSProperties;
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  fontSize = 24,
  color = colors.text,
  delay = 0,
  charsPerFrame = 0.5,
  style,
}) => {
  const frame = useCurrentFrame();

  const adjustedFrame = Math.max(0, frame - delay);
  const charsToShow = Math.floor(adjustedFrame * charsPerFrame);
  const displayedText = text.slice(0, charsToShow);

  return (
    <div
      style={{
        fontSize,
        color,
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 500,
        ...style,
      }}
    >
      {displayedText}
      {charsToShow < text.length && (
        <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span>
      )}
    </div>
  );
};
