const { Pool } = require('pg');

const lang = process.env.LANGUAGE;
const text = require('./lang.json');

const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
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
        return {
            error: true,
            message: `${text.queries.getTable.message1[lang]}`
        }
    }

};

module.exports = { getTable }
