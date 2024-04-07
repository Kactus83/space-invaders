import { beginnerWaves } from "./library/beginnerWaves";
import { intermediateWaves } from "./library/intermediateWaves";
import { expertWaves } from "./library/expertWaves";
import { WaveSetConfiguration } from "../types/WaveSetConfiguration";
import { WaveSetType } from "../types/WaveSetType";
import { beginnerWaves_2 } from "./library/beginnerWaves_2";
import { beginnerWaves_3 } from "./library/beginnerWaves_3";
import { intermediateWaves_2 } from "./library/intermediateWaves_2";
import { intermediateWaves_3 } from "./library/intermediateWaves_3";
import { expertWaves_2 } from "./library/expertWaves_2";
import { expertWaves_3 } from "./library/expertWaves_3";

export const waveSetsConfig: WaveSetConfiguration[] = [
  {
    name: WaveSetType.Beginner,
    experienceThreshold: 0,
    waveConfigs: beginnerWaves,
  },
  {
    name: WaveSetType.Beginner_2,
    experienceThreshold: 1000,
    waveConfigs: beginnerWaves_2,
  },
  {
    name: WaveSetType.Beginner_3,
    experienceThreshold: 2500,
    waveConfigs: beginnerWaves_3,
  },
  {
    name: WaveSetType.Intermediate,
    experienceThreshold: 3500,
    waveConfigs: intermediateWaves,
  },
  {
    name: WaveSetType.Intermediate_2,
    experienceThreshold: 5000,
    waveConfigs: intermediateWaves_2,
  },
  {
    name: WaveSetType.Intermediate_3,
    experienceThreshold: 7000,
    waveConfigs: intermediateWaves_3,
  },
  {
    name: WaveSetType.Expert,
    experienceThreshold: 10000,
    waveConfigs: expertWaves,
  },
  {
    name: WaveSetType.Expert_2,
    experienceThreshold: 13000,
    waveConfigs: expertWaves_2,
  },
  {
    name: WaveSetType.Expert_3,
    experienceThreshold: 16000,
    waveConfigs: expertWaves_3,
  },
];