import { beginnerWaves } from "./library/beginnerWaves";
import { intermediateWaves } from "./library/intermediateWaves";
import { expertWaves } from "./library/expertWaves";
import { WaveSetConfiguration } from "../types/WaveSetConfiguration";

export const waveSetsConfig: WaveSetConfiguration[] = [
  {
    experienceThreshold: 0,
    waveConfigs: beginnerWaves,
  },
  {
    experienceThreshold: 10000,
    waveConfigs: intermediateWaves,
  },
  {
    experienceThreshold: 50000,
    waveConfigs: expertWaves,
  },
];