import { PlayerExperienceData } from "../../experience/types/PlayerExperienceData";
import { PlayerInventoryData } from "../../inventory/types/PlayerInventoryData";

export interface PlayerProfileData {
    playerName: string;
    experience: PlayerExperienceData;
    inventory: PlayerInventoryData;
}
