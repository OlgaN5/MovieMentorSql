const express = require('express')
require('dotenv').config()

const Sentry = require('@sentry/node')
const router = require('./routes/index.router')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
// const {
//     User,
//     Movie,
//     WatchList,
//     SimilarMovie,
//     Status
// } = require('./models/associations')
const db = require('./config/database')


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'MovieMentor',
            description: 'Customer API information',
            contact: {
                name: 'Olya'
            },
            servers: ["http://localhost:3000"]
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    name: 'Authorization'
                }
            }
        }

    },
    apis: ['./routes/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)





const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.listen(port, () => console.log(`Server started on port ${port}`))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

db.connect()
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err.message))
// User.sync().then(() => console.log('User Model synced'))
// Movie.sync().then(() => console.log('Movie Model synced'))
// WatchList.sync().then(() => console.log('WatchList Model synced')).catch((e) => console.log(e.message))
// SimilarMovie.sync().then(() => console.log('SimilarList Model synced')).catch((e) => console.log(e.message))
// Status.sync().then(() => console.log('Status Model synced')).catch((e) => console.log(e.message))

Sentry.init({
    dsn: process.env.DSN,
});

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.errorHandler())

app.use('/api', router)

module.exports = app