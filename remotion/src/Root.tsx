import React from "react";
import { Composition, Folder } from "remotion";
import { AlfaVideo } from "./AlfaVideo";
import { ApreeVideo } from "./ApreeVideo";
import { getTotalDuration, FPS, VIDEO_WIDTH, VIDEO_HEIGHT } from "./utils/animations";
import { getApreeTotalDuration, APREE_FPS } from "./utils/apree-animations";

export const RemotionRoot: React.FC = () => {
  const totalDuration = getTotalDuration();
  const apreeTotalDuration = getApreeTotalDuration();

  return (
    <>
      <Folder name="ALFA-Video">
        {/* Russian version */}
        <Composition
          id="AlfaVideoRU"
          component={AlfaVideo}
          durationInFrames={totalDuration}
          fps={FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            language: "ru" as const,
          }}
        />

        {/* English version */}
        <Composition
          id="AlfaVideoEN"
          component={AlfaVideo}
          durationInFrames={totalDuration}
          fps={FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            language: "en" as const,
          }}
        />
      </Folder>

      {/* Individual scenes for preview/testing */}
      <Folder name="Scenes">
        <Composition
          id="Scene1-Chaos"
          component={() => (
            <AlfaVideo language="ru" />
          )}
          durationInFrames={150}
          fps={FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
        />
      </Folder>

      {/* Apree Video - Enterprise IT Platform */}
      <Folder name="Apree-Video">
        {/* Russian version */}
        <Composition
          id="ApreeVideoRU"
          component={ApreeVideo}
          durationInFrames={apreeTotalDuration}
          fps={APREE_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            language: "ru" as const,
          }}
        />

        {/* English version */}
        <Composition
          id="ApreeVideoEN"
          component={ApreeVideo}
          durationInFrames={apreeTotalDuration}
          fps={APREE_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={{
            language: "en" as const,
          }}
        />
      </Folder>
    </>
  );
};
