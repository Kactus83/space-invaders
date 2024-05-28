import { IHealthCharacteristics } from "../models/health-system/IHealthCharasteristics";
import { WallType } from "./WallType";

export interface IWallCharacteristics extends IHealthCharacteristics {
    type: WallType;
}