import knex from 'knex';
import path from 'node:path';

import { Enviroment } from '../../enviroment';

const config = {
  client: 'pg',
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
};

export const postgresClient = knex(config);

export default config;
