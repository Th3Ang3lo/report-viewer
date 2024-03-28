import knex from 'knex';

import { Enviroment } from '../../enviroment';

export const connectionConfig = () => ({
  client: 'pg',
  pool: { min: 0, max: 1 },
  connection: Enviroment.getPostgresURL(),
  log: {
    warn(message: string) {
      console.warn(`[POSTGRES][WARN] :: ${message}`);
    },
    error(message: string) {
      console.error(`[POSTGRES][ERROR] :: ${message}`);
    },
  },
  migrations: {
    directory: './migrations',
    loadExtensions: ['.ts', '.js'],
  },
  seeds: {
    directory: './seeds',
    loadExtensions: ['.ts', '.js'],
  },
});

export const postgresClient = () => knex(connectionConfig());
