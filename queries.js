const { Pool } = require('pg');

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASS;
const database = process.env.DB;

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

const getTable = async(items) => {

    pool.connect((error_connection,client,release) => {
        if (error_connection) {
            console.error(error_connection);
            release()
            pool.end()
            throw error_connection;
        }
        const SQLQuery = {
            text: `SELECT * FROM $1;`,
            values: [items]
        }
        client.query(SQLQuery, (error_query,result) => {
            if (error_query) {
                console.error(error_query);
                release()
                pool.end()
                throw error_query
            }
            return result.rows
            release()
            pool.end()
        })
    })

};

module.exports = { getTable }
