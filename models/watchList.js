
const watchList = `
CREATE TABLE watchList(
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movieId INT NOT NULL REFERENCES movie(id),
    statusId INT NOT NULL REFERENCES status(id)
);
`
module.exports = watchList



// const Sequelize = require('sequelize')
// const db = require('../config/database')
// const WatchList = db.define('watchList', {
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     userId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         unique: false
//     },
//     movieId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         unique: false
//     },
//     statusId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         unique: false
//     }
// })
// module.exports = WatchList