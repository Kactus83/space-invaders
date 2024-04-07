import { beginnerWaves } from "./library/beginnerWaves";
import { intermediateWaves } from "./library/intermediateWaves";
import { expertWaves } from "./library/expertWaves";
import { WaveSetConfiguration } from "../types/WaveSetConfiguration";

export const waveSetsConfig: WaveSetConfiguration[] = [
  {
    name: "Beginner",
    experienceThreshold: 0,
    waveConfigs: beginnerWaves,
  },
  {
    name: "Intermediate",
    experienceThreshold: 10000,
    waveConfigs: intermediateWaves,
  },
  {
    name: "Expert",
    experienceThreshold: 50000,
    waveConfigs: expertWaves,
  },
];