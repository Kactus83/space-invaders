import { ExperienceBonus } from "../../experience-system/bonus/ExperienceBonus";
import { HealthBonus } from "../../health-system/bonus/HealthBonus";
import { SpeedBonus } from "../../speed-system/bonus/SpeedBonus";
import { WeaponBonus } from "../../weapon-system/bonus/WeaponBonus";

export type SystemBonusType = HealthBonus | SpeedBonus | WeaponBonus | ExperienceBonus;