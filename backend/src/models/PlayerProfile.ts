import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { GameSessionStats } from './GameSessionStats';
import { Skill } from './Skill';

@Table({
  timestamps: false,
  tableName: 'player_profiles'
})
export class PlayerProfile extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true
  })
  playerName!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0 
  })
  experiencePoints!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0 
  })
  bestScore!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0  
  })
  totalExperiencePoints!: number;

  @HasMany(() => GameSessionStats)
  gameSessions!: GameSessionStats[];

  @HasMany(() => Skill)
  skills!: Skill[];

}