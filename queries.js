const { Pool } = require('pg');

const host = process.env.DS20HOST;
const user = process.env.DS20USER;
const password = process.env.DS20PASS;
const database = process.env.DS20DB;

const config = {
    host,
    user,
    password,
    database,
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
