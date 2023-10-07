const accessToDatabase = require('../utils/accessToDatabase')
class MovieService {
    async addStatus(status) {
        return await accessToDatabase.createStatus(status)
    }
    async addMovie(movie) {
        return await accessToDatabase.createMovie(movie)
    }
    async search(movieTitle) {
        const conditions = {
            title: movieTitle
        }
        return await accessToDatabase.readMovie(movieTitle)
    }
    async addWatchList(movieId, statusId, idUser) {
        return await accessToDatabase.createWatchList(movieId, statusId, idUser)
    }

    async changeStatusById(userId, movieId, statusId) {
        const movie = await accessToDatabase.updateById(userId, movieId, statusId)
        return movie
    }
    async addSimilar(userId, movieId, similarMovieId) {
        const id = await accessToDatabase.findStatusId('watched')
        const movieFromWatchList = await accessToDatabase.readWatchList(movieId, userId, id)
        const similarMovieFromWatchList = await accessToDatabase.readWatchList(similarMovieId, userId, id)
        if (!movieFromWatchList || !similarMovieFromWatchList) return null
        return await accessToDatabase.createSimilarMovie(userId, similarMovieId, movieFromWatchList.id)
    }

    async getSimilar(movieId) {
        const movies = await accessToDatabase.readAllSimilar(movieId)
        return movies
    }
}

module.exports = new MovieService()