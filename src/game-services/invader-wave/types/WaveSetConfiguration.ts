import { WaveConfig } from "./WaveConfig";
import { WaveSetType } from "./WaveSetType";

export interface WaveSetConfiguration {
    name: WaveSetType;
    experienceThreshold: number;
    waveConfigs: WaveConfig[];
  }