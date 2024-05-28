import { IGameBonusConfig } from "../../entities/bonus/IGameBonusConfig";
import { IInvadersConfig } from "../../entities/invader/IInvadersConfig";
import { IPlayerConfig } from "../../entities/player/IPlayerConfig";
import { IWallConfig } from "../../entities/wall/IWallConfig";
import { IPlayerProfileConfig } from "../../game-services/player-profile/config/IPlayerProfileConfig";
import { IRendererConfig } from "../renderer/IRendererConfig";

/**
 * Interface for the global configuration of the game
 * (Extends all the configuration interfaces of the modules)
 */
export interface IGlobalConfig extends IRendererConfig, IPlayerConfig, IPlayerProfileConfig, IWallConfig, IInvadersConfig, IGameBonusConfig {
}