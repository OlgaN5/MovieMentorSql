const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movie.controller')
const authenticate = require('../utils/authenticate')
const {
    body,
    param,
    header,
    query
} = require('express-validator')
const validationCheckPropertyMovie = [
    body('title').notEmpty().escape().isString().trim(),
    body('description').notEmpty().escape().isString().trim(),
    body('releaseDate').notEmpty().escape().isString().trim()
]
const validationQuery = [
    query('movieName').notEmpty().escape().isString().trim()
]
const validationParam = [
    param('movieId').notEmpty().isInt(),
]
const validationStatus = [
    body('statusId').notEmpty().isInt()
]
const validationBodyMovieId = [
    body('similarMovieId').notEmpty().isInt()
]
/**
 * @swagger
 * /api/movies/add-status:
 *   post:
 *     tags: 
 *       - Movie
 *     summary: use to add status in database
 *     security:
 *       - bearerAuth: []
 *     description: returns added status
 *     requestBody:
 *       description: status
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 default: watched 
 *     responses:
 *       '200':
 *         description: Added succesfully
 *       '401':
 *         description: Need a token
 */
router.post('/add-status', authenticate, movieController.addStatus)
/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           default: movie
 *         description:
 *           type: string
 *           default: descr
 *         releaseDate:
 *           type: string
 *           default: 01-02-2002    
 *     MovieStatus:
 *       type: object
 *       properties:
 *         movieId: 
 *           type: int
 *           default: 1
 *         statusId:
 *           type: integer
 *           default: 1
 * /api/movies/create:
 *   post:
 *     tags: 
 *       - Movie
 *     summary: use to add movie in database
 *     security:
 *       - bearerAuth: []
 *     description: returns added movie
 *     requestBody:
 *       description: movie
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       '200':
 *         description: Added succesfully
 *       '401':
 *         description: Need a token
 */
router.post('/create', validationCheckPropertyMovie, authenticate, movieController.addMovie)
/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     summary: use to search movie by title
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Movie
 *     description: returns searched movie
 *     parameters:
 *       - name: movieName
 *         in: query
 *         required: true
 *         description: title of movie
 *         default: 1
 *     responses:
 *       '200':      
 *         description: Added succesfully
 *       '401':
 *         description: Need a token       
 */
router.get('/search', validationQuery, authenticate, movieController.search)
/**
 * @swagger
 * /api/movies/watchlist:
 *   post:
 *     summary: use to add watchlist to authorizated user
 *     description: returns added watchList
 *     security: 
 *       - bearerAuth: []
 *     tags: 
 *       - Movie
 *     requestBody:
 *       description: movie
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieStatus'
 *     responses:
 *       '200':
 *         description: Found
 *       '401':
 *         description: Need a token
 */
router.post('/watchlist', validationStatus, authenticate, movieController.addWatchList)
/**
 * @swagger
 * /api/movies/watchList/{movieId}:
 *   patch: 
 *     summary: use to change status of watchlist by movieId
 *     description: returns changed watchlist
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Movie
 *     parameters:
 *       - name: movieId
 *         in: path
 *         required: true
 *     requestBody:
 *       descrition: text
 *       required: true
 *       content: 
 *         application/json: 
 *           schema:
 *             type: object
 *             properties:
 *               statusId:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       '200': 
 *         description: Added succesfully
 *       '401':
 *         description: Need a token
 */
router.patch('/watchList/:movieId', validationParam, validationStatus, authenticate, movieController.changeStatus)
/**
 * @swagger
 * /api/movies/{movieId}/similar:
 *   post:
 *     summary: use to add similarMovie to movie
 *     description: returns added similarMovie
 *     tags: 
 *       - Movie
 *     security: 
 *       - bearerAuth: []
 *     parameters: 
 *       - name: movieId
 *         required: true
 *         in: path
 *     requestBody:
 *       description: movie
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               similarMovieId:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       '200':
 *         descrition: Changed succesfully
 *       '401':
 *         description: Need a token
 */
router.post('/:movieId/similar', validationParam, validationBodyMovieId, authenticate, movieController.addSimilar)
/**
 * @swagger
 * /api/movies/{movieId}/recommendations:
 *   get:
 *     summary: use to get recommended movies
 *     description: return array recommended movies
 *     tags: 
 *       - Movie
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - name: movieId
 *         in: path
 *         required: true
 *     responses: 
 *       '200':
 *         descrition: Added succesfully
 *       '401':
 *         description: Need a token *   
 */
router.get('/:movieId/recommendations', validationParam, authenticate, movieController.getRecommendation)

module.exports = router