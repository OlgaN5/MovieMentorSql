// const User = require('./user')
// const Movie = require('./movie')
// const WatchList = require('./watchList')
// const SimilarMovie = require('./similarMovie')
// const Status = require('./status')

// Status.hasMany(WatchList,{
//     foreignKey: 'statusId'
// })
// WatchList.belongsTo(Status,{
//     foreignKey: 'statusId'
// })
// User.hasMany(WatchList, {
//     foreignKey: 'userId'
// })
// WatchList.belongsTo(User, {
//     foreignKey: 'userId'
// })
// Movie.hasMany(WatchList, {
//     foreignKey: 'movieId'
// })
// WatchList.belongsTo(Movie, {
//     foreignKey: 'movieId'
// })
// User.hasMany(SimilarMovie, {
//     foreignKey: 'userId'
// })
// SimilarMovie.belongsTo(User, {
//     foreignKey: 'userId'
// })
// WatchList.hasMany(SimilarMovie, {
//     foreignKey: 'watchListId'
// })
// SimilarMovie.belongsTo(WatchList, {
//     foreignKey: 'watchListId'
// })
// Movie.hasMany(SimilarMovie,{
//     foreignKey:'movieId'
// })
// SimilarMovie.belongsTo(Movie,{
//     foreignKey:'movieId'
// })



// module.exports = {
//     User,
//     Movie,
//     SimilarMovie,
//     WatchList,
//     Status
// }