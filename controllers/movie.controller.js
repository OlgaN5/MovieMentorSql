const Sentry = require('@sentry/node')
const movieService = require('../services/movie.service')
const {
    validationResult
} = require('express-validator')
class MovieController {
    async addStatus(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const status = await movieService.addStatus(req.body)
                res.send(status)
            } else {
                res.send({
                    errors: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
    async addMovie(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const movie = await movieService.addMovie(req.body)
                res.send(movie)
            } else {
                res.send({
                    errors: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
    async search(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const movie = await movieService.search(req.query.movieName)
                if (!movie) return res.send({
                    message: 'there are not movies with this name'
                })
                res.send(movie)
            } else {
                res.send({
                    errors: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
    async addWatchList(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const movie = await movieService.addWatchList({
                    userId: req.idUser,
                    movieId: req.body.movieId,
                    statusId: req.body.statusId
                })
                res.send(movie)
            } else {
                res.send({
                    errors: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
    async changeStatus(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const movie = await movieService.changeStatusById(req.idUser, req.params.movieId, req.body.statusId)
                res.send(movie)
            } else {
                res.send({
                    errors: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
    async addSimilar(req, res) {
        try {
            const result = validationResult(req)
            if (result.isEmpty()) {
                const movie = await movieService.addSimilar(req.idUser, req.params.movieId, req.body.similarMovieId)
                if (!movie) return res.send({
                    message: 'not added'
                })
                res.send(movie)
            } else {
                res.send({
                    errors: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
    async getRecommendation(req, res) {
        try {
            const result = validationResult(req)
            console.log(result)
            if (result.isEmpty()) {
                const movies = await movieService.getSimilar(req.params.movieId)
                res.send(movies)
            } else {
                res.send({
                    errors: result.array()
                })
            }
        } catch (e) {
            Sentry.captureException(e)
        }
    }
}
module.exports = new MovieController()