import { PlayerExperienceData } from "../../experience/types/PlayerExperienceData";
import { PlayerInventoryData } from "../../inventory/types/PlayerInventoryData";
import { PlayerSkillsData } from "../../skills/types/PlayerSkillsData";
import { PlayerWallsData } from "../../walls/types/PlayerWallsData";

export interface PlayerProfileData {
    playerName: string;
    experience: PlayerExperienceData;
    inventory: PlayerInventoryData;
    skills: PlayerSkillsData;
    walls: PlayerWallsData;
}
