const pool = require('../config/database')

class AccessToDatabase {
    async createUser(value) {
        const user = await pool.query(`
        INSERT INTO users (email, login, password) 
        VALUES($1,$2,$3) 
        RETURNING *;`,
            Object.values(value))
        return user.rows[0]
    }
    async createStatus(status) {
        const user = await pool.query(`
        INSERT INTO status (title) 
        VALUES($1) 
        RETURNING *;`,
            Object.values(status))
        return user.rows[0]
    }
    async createMovie(movie) {
        const user = await pool.query(`
        INSERT INTO movie (title,description,releasedate) 
        VALUES($1,$2,$3) 
        RETURNING *;`,
            Object.values(movie))
        return user.rows[0]
    }
    async createWatchList(movieId, statusId, userId) {
        const user = await pool.query(`
        INSERT INTO watchList (userId,movieId,statusId) 
        VALUES($1,$2,$3) 
        RETURNING *;`,
            [userId, movieId, statusId])
        return user.rows[0]
    }
    async createSimilarMovie(userId, similarMovieId, watchListId) {
        const user = await pool.query(`
        INSERT INTO similarMovie (userId,movieId,watchListId) 
        VALUES($1,$2,$3) 
        RETURNING *;`,
            [userId, similarMovieId, watchListId])
        return user.rows[0]
    }
    async readUserEmail(email) {
        const result = await pool.query(`
        SELECT * 
        FROM users 
        WHERE email = $1;`,
            [email])
        return result.rows[0]
    }
    async readUserLogin(login) {
        const result = await pool.query(`
        SELECT * FROM users
        WHERE login = $1;`,
            [login])
        return result.rows[0]
    }
    async readMovie(title) {
        const result = await pool.query(`
        SELECT * FROM movie 
        WHERE title = $1;`,
            [title])
        return result.rows[0]
    }
    async readWatchList(movieId, userId, statusId) {
        console.log(movieId, userId, statusId)
        const result = await pool.query(`
        SELECT * FROM watchList 
        WHERE movieId = $1 AND userId = $2 AND statusId = $3;`,
            [movieId, userId, statusId])
        console.log('11111111111111111111111')
        return result.rows[0]
    }
    async updateById(userId, movieId, statusId) {
        console.log(userId, movieId, statusId)
        return await pool.query(`
        UPDATE watchList 
        SET statusId = $1 
        WHERE userId = $2 AND movieId = $3`,
            [statusId, userId, movieId])
    }
    async findStatusId(title) {
        console.log(title)
        const statusId = await pool.query(`
        SELECT id 
        FROM status 
        WHERE title = $1 
        LIMIT 1`,
            [title])
        return statusId.rows[0].id
    }
    async readAllSimilar(movieId) {
        const movies = await pool.query(`
        SELECT DISTINCT ON(similarMovie.movieId) similarMovie.movieId,json_build_object('title',movie.title) as movie, similarMovie.watchListId
        FROM similarMovie 
        INNER JOIN watchList ON similarMovie.watchListId = watchList.id 
        INNER JOIN movie ON similarMovie.movieId = movie.id
        WHERE watchList.movieId = $1`, [movieId])
        return movies.rows
    }

}

module.exports = new AccessToDatabase()