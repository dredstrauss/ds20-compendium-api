const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const config = {
    connectionString,
    port: 5432,
    max: 30,
    min: 0,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000
}
const pool = new Pool(config);

const getTable = async(tablePrefix, lang) => {

    const table = tablePrefix+lang;
    const SQLQuery = `SELECT * FROM ${table};`

    try {
        const registers = await pool.query(SQLQuery)
        return registers.rows
    } catch (e) {
        console.error(e);
        return e
    }

};

module.exports = { getTable }
