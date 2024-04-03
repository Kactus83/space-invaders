import { IGameBonusConfig } from "../../entities/bonus/IGameBonusConfig";
import { IInvadersConfig } from "../../entities/invader/IInvadersConfig";
import { IPlayerConfig } from "../../entities/player/IPlayerConfig";
import { IWallConfig } from "../../entities/wall/IWallConfig";
import { IPlayerProfileConfig } from "../../game-services/player-profile/config/IPlayerProfileConfig";
import { IRendererConfig } from "../renderer/IRendererConfig";

export interface IGlobalConfig extends IRendererConfig, IPlayerConfig, IPlayerProfileConfig, IWallConfig, IInvadersConfig, IGameBonusConfig {
    // Etendre avec d'autres configurations de modules au fur et à mesure
}