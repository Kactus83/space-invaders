import { IPlayerConfig } from "../../entities/player/IPlayerConfig";
import { IRendererConfig } from "../renderer/IRendererConfig";

export interface IGlobalConfig extends IRendererConfig, IPlayerConfig {
    // Etendre avec d'autres configurations de modules au fur et à mesure
}