import { IInvadersConfig } from "../../entities/invader/IInvadersConfig";
import { IPlayerConfig } from "../../entities/player/IPlayerConfig";
import { IWallConfig } from "../../entities/wall/IWallConfig";
import { IRendererConfig } from "../renderer/IRendererConfig";

export interface IGlobalConfig extends IRendererConfig, IPlayerConfig, IWallConfig, IInvadersConfig {
    // Etendre avec d'autres configurations de modules au fur et à mesure
}