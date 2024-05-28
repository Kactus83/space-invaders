import { ExperienceBonus } from "../../experience-system/bonus/ExperienceBonus";
import { HealthBonus } from "../../health-system/bonus/HealthBonus";
import { SkillBonus } from "../../skill-system/bonus/SkillBonus";
import { SpeedBonus } from "../../speed-system/bonus/SpeedBonus";
import { WeaponBonus } from "../../weapon-system/bonus/WeaponBonus";

export type SystemBonusType = HealthBonus | SpeedBonus | WeaponBonus | ExperienceBonus | SkillBonus;