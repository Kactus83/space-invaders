import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { PlayerProfile } from './PlayerProfile';
import { InvaderKill } from './InvaderKill';

@Table({
  timestamps: true,
  tableName: 'game_sessions'
})
export class GameSessionStats extends Model<GameSessionStats> {
  @ForeignKey(() => PlayerProfile)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  playerName!: string;

  @BelongsTo(() => PlayerProfile)
  playerProfile!: PlayerProfile;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  score!: number;

  @HasMany(() => InvaderKill)
  invaderKills!: InvaderKill[];

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  isWinningSession!: boolean;

}