import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PlayerProfile } from './PlayerProfile';

@Table({
  timestamps: false,
  tableName: 'skills'
})
export class Skill extends Model<Skill> {
  @ForeignKey(() => PlayerProfile)
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  playerName!: string;

  @BelongsTo(() => PlayerProfile)
  playerProfile!: PlayerProfile;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  skillId!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  isActive!: boolean;
}