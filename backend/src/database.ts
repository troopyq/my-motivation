import config from 'config';
import { PoolOptions } from 'mysql2';
import { createPool } from 'mysql2/promise';

const poolOptions: PoolOptions = {
	host: config.get('host'),
	user: config.get('user'),
	password: config.get('password'),
	database: config.get('database'),
};

const pool = createPool(poolOptions);

export { pool };
