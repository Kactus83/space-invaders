import { GameBonus } from "../bonus/GameBonus";
import { GroundLine } from "../ground-line/GroundLine";
import { Invader } from "../invader/Invader";
import { Player } from "../player/Player";
import { Projectile } from "../projectile/Projectile";
import { Wall } from "../wall/Wall";

export type GameEntityType = Player | Invader | Projectile | Wall | GroundLine | GameBonus;

