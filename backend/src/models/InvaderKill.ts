import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { GameSessionStats } from './GameSessionStats';
import { InvaderType } from '../types/InvaderType';

@Table({
  timestamps: false,
  tableName: 'invader_kills'
})
export class InvaderKill extends Model<InvaderKill> {
  @ForeignKey(() => GameSessionStats)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  gameSessionId!: number;

  @BelongsTo(() => GameSessionStats)
  gameSession!: GameSessionStats;

  @Column({
    type: DataType.ENUM,
    values: Object.values(InvaderType), 
    allowNull: false
  })
  invaderType!: InvaderType;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  count!: number;
}