import { Pool } from 'pg';

export const pool = new Pool({
  user: 'user',
  host: 'postgres',
  database: 'userdb',
  password: 'password',
  port: 5432,
});
