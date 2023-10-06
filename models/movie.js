
const movie = `
CREATE TABLE movie(
    id SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    releaseDate TIMESTAMPTZ NOT NULL
);`
module.exports = movie

// const db = require('../config/database')
// const Sequelize = require('sequelize')
// const Movie = db.define('movies', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,

//     },
//     title: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: false,
//     },
//     releaseDate: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         unique: false,
//     }
// })

// module.exports = Movie