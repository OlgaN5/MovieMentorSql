const pool = require('../config/database')

class AccessToDatabase {
    //postgres
    async exequteQueryAndGetOne(query, value) {

        const queryResult = await pool.query(query, Object.values(value))
        console.log(query, value,Object.values(value), queryResult)
        return queryResult.rows[0]
    }
    async exequteQueryAndGetAll(query, value) {
        const movies = await pool.query(query, Object.values(value))
        return movies.rows
    }

}

module.exports = new AccessToDatabase()