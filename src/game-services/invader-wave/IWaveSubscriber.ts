import { Invader } from "../../entities/invader/Invader";

export interface IWaveSubscriber {
    onInvaderSpawn(invader: Invader): void;
}
