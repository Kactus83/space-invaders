import { WallType } from "../../../entities/wall/WallType";

export interface WallBlockConfig {
  type: WallType;
  count: number; // Nombre de murs dans un bloc (pour cet exemple, on considère toujours un bloc comme une ligne de 10 murs)
}
