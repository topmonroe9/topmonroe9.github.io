import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  Scene1Chaos,
  Scene2NoStructure,
  Scene3RegistryProblem,
  Scene4Separation,
  Scene5AIAnalysis,
  Scene6ColumnMapping,
  Scene7Matching,
  Scene8Export,
  Scene9TechStack,
} from "./scenes";
import { Language } from "./utils/localization";
import { sceneDurations, TRANSITION_DURATION, FPS } from "./utils/animations";

type AlfaVideoProps = {
  language: Language;
};

export const AlfaVideo: React.FC<AlfaVideoProps> = ({ language }) => {
  const transitionTiming = linearTiming({ durationInFrames: TRANSITION_DURATION });

  return (
    <TransitionSeries>
      {/* Scene 1: Chaos - Document chaos (0-5s) */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations.scene1}>
        <Scene1Chaos language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 2: No Structure (5-8s) */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations.scene2}>
        <Scene2NoStructure language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 3: Registry Problem (8-11s) */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations.scene3}>
        <Scene3RegistryProblem language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 4: Separation (11-15s) */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations.scene4}>
        <Scene4Separation language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 5: AI Analysis (15-21s) */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations.scene5}>
        <Scene5AIAnalysis language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 6: Column Mapping (21-25s) */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations.scene6}>
        <Scene6ColumnMapping language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 7: Matching (25-30s) */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations.scene7}>
        <Scene7Matching language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 8: Export (30-35s) */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations.scene8}>
        <Scene8Export language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 9: Tech Stack / Final (35-40s) */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations.scene9}>
        <Scene9TechStack language={language} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
