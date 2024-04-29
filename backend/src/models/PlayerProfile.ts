import { Table, Column, Model, DataType } from 'sequelize-typescript';

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
    allowNull: false
  })
  experiencePoints!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  bestScore!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  totalExperiencePoints!: number;

}