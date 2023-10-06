// const Sequelize = require('sequelize')

// module.exports = new Sequelize('psagflzi', 'psagflzi', 'IQeihzw6C63v_WrKH3qXJnwA4XxelqSg', {
//     host: 'surus.db.elephantsql.com',
//     dialect: 'postgres'
// })

const {Pool} = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '6vremja6',
    connectionTimeoutMillis: 5000,
  });
  
module.exports = pool

// const Sequelize = require('sequelize')

// module.exports = new Sequelize(process.env.DATABASE, process.env.USER_DB, process.env.USER_PASSWORD, {
//     host: process.env.HOST,
//     dialect: process.env.DIALECT
// })
