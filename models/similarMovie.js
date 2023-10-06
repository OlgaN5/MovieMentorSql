const pool = require('../config/database')
const similarMovie = `
CREATE TABLE similarMovie(
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users(id),
    watchListId INT NOT NULL REFERENCES watchList(id),
    movieId INT NOT NULL REFERENCES movie(id) ON DELETE CASCADE
);
`
module.exports = similarMovie

// const Sequelize = require('sequelize')
// const db = require('../config/database')
// const SimilarMovie = db.define('similarMovie', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     userId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         unique: false
//     },
//     watchListId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         unique: false
//     },
//     movieId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         unique: false
//     }
// })
// module.exports = SimilarMovie