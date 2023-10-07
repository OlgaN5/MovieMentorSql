const accessToDatabase = require('../utils/accessToDatabase')
class MovieService {
    async addStatus(status) {
        const queryAddStatus = `
                INSERT INTO status (title) 
                VALUES($1) 
                RETURNING *;`
        return await accessToDatabase.exequteQueryAndGetOne(queryAddStatus, status)
    }
    async addMovie(movie) {
        const queryAddMovie = `
                INSERT INTO movie (title,description,releasedate) 
                VALUES($1,$2,$3) 
                RETURNING *;`
        return await accessToDatabase.exequteQueryAndGetOne(queryAddMovie, movie)
    }
    async addWatchList(watchList) {
        const queryAddWatchList = `
                INSERT INTO watchList (userId,movieId,statusId) 
                VALUES($1,$2,$3) 
                RETURNING *;`
        return await accessToDatabase.exequteQueryAndGetOne(queryAddWatchList, watchList)
    }
    async addSimilar(userId, movieId, similarMovieId) {
        const queryFindStatusId = `
                SELECT id 
                FROM status 
                WHERE title = $1 
                LIMIT 1`
        const result = await accessToDatabase.exequteQueryAndGetOne(queryFindStatusId, {
            title: 'watched'
        })
        const id = result.id

        const queryReadWatchList = `
                SELECT * FROM watchList 
                WHERE movieId = $1 AND userId = $2 AND statusId = $3;`
        const conditionMovie = {
            movieId,
            userId,
            id
        }
        const conditionSimilarMovie = {
            movieId: similarMovieId,
            userId,
            id
        }
        const movieFromWatchList = await accessToDatabase.exequteQueryAndGetOne(queryReadWatchList, conditionMovie)
        const similarMovieFromWatchList = await accessToDatabase.exequteQueryAndGetOne(queryReadWatchList, conditionSimilarMovie)

        if (!movieFromWatchList || !similarMovieFromWatchList) return null

        const queryInsertSimilarMovie = `
                INSERT INTO similarMovie (userId,movieId,watchListId) 
                VALUES($1,$2,$3) 
                RETURNING *;`
        const similarMovie = {
            userId,
            similarMovieId,
            watchListId: movieFromWatchList.id
        }
        return await accessToDatabase.exequteQueryAndGetOne(queryInsertSimilarMovie, similarMovie)
    }
    async search(movieTitle) {
        const querySearchByTitle = `
                SELECT * FROM movie 
                WHERE title = $1;`
        return await accessToDatabase.exequteQueryAndGetOne(querySearchByTitle, {
            title: movieTitle
        })
    }

    async changeStatusById(userId, movieId, statusId) {
        const queryChangeStatus = `
                UPDATE watchList 
                SET statusId = $1 
                WHERE userId = $2 AND movieId = $3`

        const movie = await accessToDatabase.exequteQueryAndGetOne(queryChangeStatus, {
            statusId,
            userId,
            movieId
        })
        return movie
    }

    async getSimilar(movieId) {
        const queryGetRecommendation = `
                SELECT DISTINCT ON(similarMovie.movieId) similarMovie.movieId,json_build_object('title',movie.title) as movie, similarMovie.watchListId
                FROM similarMovie 
                INNER JOIN watchList ON similarMovie.watchListId = watchList.id 
                INNER JOIN movie ON similarMovie.movieId = movie.id
                WHERE watchList.movieId = $1`
        const movies = await accessToDatabase.exequteQueryAndGetAll(queryGetRecommendation, {
            movieId
        })
        return movies
    }
}

module.exports = new MovieService()