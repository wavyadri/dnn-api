import * as pg from 'pg';
const { Pool } = pg;

// pools will use environment variables
// for connection information
const pool = new Pool();

export default pool;
