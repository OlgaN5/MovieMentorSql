const pool = require('../config/database')
const status = `
CREATE TABLE status(
    id SERIAL PRIMARY KEY,
    title VARCHAR(25) NOT NULL UNIQUE
);`
module.exports = status
// const db = require('../config/database')
// const Sequelize = require('sequelize')
// const Status = db.define('status', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//     },
//     title: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     }
// })

// module.exports = Status