const pool = require('../config/database')

const drop = `
DROP TABLE IF EXISTS similarMovies;
DROP TABLE IF EXISTS watchLists;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS statuses;
DROP TABLE IF EXISTS users;
`
// const drop = `

// DROP TABLE IF EXISTS movie;
// DROP TABLE IF EXISTS movies;
// DROP TABLE IF EXISTS status;
// DROP TABLE IF EXISTS statuses;
// DROP TABLE IF EXISTS users;
// `
const user = require('./user')
const movie = require('./movie')
const watchList = require('./watchList')
const similarMovie = require('./similarMovie')
const status = require('./status')

async function dropTable() {
    try {
        await pool.query(drop)
        console.log('dropped')
    } catch (err) {
        console.log(err.message)
    }
}
async function createTable() {
    try {
        await pool.query(movie)
        console.log('movie created succesfull')
        await pool.query(status)
        console.log('status created succesfull')
        await pool.query(user)
        console.log('user created succesfull')
        await pool.query(watchList)
        console.log('watchList created succesfull')
        await pool.query(similarMovie)
        console.log('similarMovie created succesfull')
    } catch (err) {
        console.log(err.message)
    }
}

dropTable()
// createTable()