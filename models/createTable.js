const pool = require('../config/database')
// pool.connect()

const drop = `
DROP TABLE IF EXISTS similarMovie;
DROP TABLE IF EXISTS watchList;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS users;
`


const user = require('./user')
const movie = require('./movie')
const watchList = require('./watchList')
const similarMovie = require('./similarMovie')
const status = require('./status')

async function dropTable() {
    await pool.query(drop, (err, res) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log('dropped')
        }
    })
}
async function createTable() {
    // await pool.query(drop, (err, res) => {
    //     if (err) {
    //         console.log(err.message)
    //     } else {
    //         console.log('dropped')
    //     }
    // })
    // await pool.query(movie, (err, res) => {
    //     if (err) {
    //         console.log(err.message)
    //     } else {
    //         console.log('succesfull')
    //     }
    // })
    // await pool.query(status, (err, res) => {
    //     if (err) {
    //         console.log(err.message)
    //     } else {
    //         console.log('succesfull')
    //     }
    // })
    await pool.query(user, (err, res) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log('succesfull')
        }
    })
    await pool.query(watchList, (err, res) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log('succesfull')
        }
    })
    await pool.query(similarMovie, (err, res) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log('succesfull')
        }
    })
}

// dropTable()
createTable()