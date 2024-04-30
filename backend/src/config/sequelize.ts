import { Sequelize } from 'sequelize-typescript';
import { PlayerProfile } from '../models/PlayerProfile';
import { GameSessionStats } from '../models/GameSessionStats';
import { Skill } from '../models/Skill';
import { InvaderKill } from '../models/InvaderKill';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [PlayerProfile, GameSessionStats, Skill, InvaderKill], 
  logging: false,
});