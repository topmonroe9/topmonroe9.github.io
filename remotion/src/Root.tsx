import React from "react";
import { Composition, Folder } from "remotion";
import { AlfaVideo } from "./AlfaVideo";
import { getTotalDuration, FPS, VIDEO_WIDTH, VIDEO_HEIGHT } from "./utils/animations";

export const RemotionRoot: React.FC = () => {
  const totalDuration = getTotalDuration();

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
    </>
  );
};
