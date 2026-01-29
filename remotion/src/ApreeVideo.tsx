import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  Scene1_SpreadsheetChaos,
  Scene2_SpaghettiScripts,
  Scene3_DataLeaks,
  Scene4_SalesPanel,
  Scene5_GoogleWorkspace,
  Scene6_SSOAuth,
  Scene7_MetabaseAnalytics,
  Scene8_ContentSystem,
  Scene9_Integration,
  Scene10_Results,
  Scene11_TechStack,
} from "./apree-scenes";
import { Language } from "./utils/apree-localization";
import {
  apreeSceneDurations,
  APREE_TRANSITION_DURATION,
  APREE_FPS,
} from "./utils/apree-animations";

type ApreeVideoProps = {
  language: Language;
};

export const ApreeVideo: React.FC<ApreeVideoProps> = ({ language }) => {
  const transitionTiming = linearTiming({
    durationInFrames: APREE_TRANSITION_DURATION,
  });

  return (
    <TransitionSeries>
      {/* PROBLEM PHASE (Scenes 1-3) - Red accent */}

      {/* Scene 1: Spreadsheet Chaos (0-4s) */}
      <TransitionSeries.Sequence durationInFrames={apreeSceneDurations.scene1}>
        <Scene1_SpreadsheetChaos language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 2: Spaghetti Scripts (4-8s) */}
      <TransitionSeries.Sequence durationInFrames={apreeSceneDurations.scene2}>
        <Scene2_SpaghettiScripts language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 3: Data Leaks (8-12s) */}
      <TransitionSeries.Sequence durationInFrames={apreeSceneDurations.scene3}>
        <Scene3_DataLeaks language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* SOLUTION PHASE (Scenes 4-9) - Blue accent */}

      {/* Scene 4: Sales Panel (12-17s) */}
      <TransitionSeries.Sequence durationInFrames={apreeSceneDurations.scene4}>
        <Scene4_SalesPanel language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 5: Google Workspace (17-21s) */}
      <TransitionSeries.Sequence durationInFrames={apreeSceneDurations.scene5}>
        <Scene5_GoogleWorkspace language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 6: SSO Authentication (21-26s) */}
      <TransitionSeries.Sequence durationInFrames={apreeSceneDurations.scene6}>
        <Scene6_SSOAuth language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 7: MetaBase Analytics (26-31s) */}
      <TransitionSeries.Sequence durationInFrames={apreeSceneDurations.scene7}>
        <Scene7_MetabaseAnalytics language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 8: Content System / DAM (31-36s) */}
      <TransitionSeries.Sequence durationInFrames={apreeSceneDurations.scene8}>
        <Scene8_ContentSystem language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 9: Integration (36-40s) */}
      <TransitionSeries.Sequence durationInFrames={apreeSceneDurations.scene9}>
        <Scene9_Integration language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* RESULT PHASE (Scenes 10-11) - Green accent */}

      {/* Scene 10: Results (40-44s) */}
      <TransitionSeries.Sequence durationInFrames={apreeSceneDurations.scene10}>
        <Scene10_Results language={language} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={transitionTiming}
      />

      {/* Scene 11: Tech Stack (44-49s) */}
      <TransitionSeries.Sequence durationInFrames={apreeSceneDurations.scene11}>
        <Scene11_TechStack language={language} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
