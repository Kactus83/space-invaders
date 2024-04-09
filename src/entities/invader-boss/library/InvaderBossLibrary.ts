import { InvaderBoss } from "../AbstractInvaderBoss";
import { IInvaderBossCharacteristics } from "../IInvaderBossCharacteristics";
import { FirstBoss } from "./bosses/FirstBoss";
import { BossIds } from "./types/InvaderBossIds";

type BossCreator = { [K in BossIds]: (initialPosition: { x: number, y: number }) => InvaderBoss };

export class BossLibrary {
    private static bossCreators: BossCreator = {
        [BossIds.FirstBoss]: (initialPosition) => new FirstBoss(initialPosition),
        // Initialisez d'autres boss ici
    };

    static getBossById(id: BossIds, initialPosition: { x: number, y: number }): InvaderBoss | null {
        const creator = this.bossCreators[id];
        if (creator) {
            return creator(initialPosition);
        }
        return null;
    }

    static getAllBosses(initialPosition: { x: number, y: number }): InvaderBoss[] {
        return Object.values(this.bossCreators).map(creator => creator(initialPosition));
    }
}