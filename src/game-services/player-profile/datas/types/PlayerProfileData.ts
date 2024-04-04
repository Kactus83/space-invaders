import { PlayerExperienceData } from "../../experience/types/PlayerExperienceData";
import { PlayerInventoryData } from "../../inventory/types/PlayerInventoryData";

export interface PlayerProfileData {
    experience: PlayerExperienceData;
    inventory: PlayerInventoryData;
}