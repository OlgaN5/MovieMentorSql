const similarMovie = `
CREATE TABLE similarMovie(
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users(id),
    watchListId INT NOT NULL REFERENCES watchList(id),
    movieId INT NOT NULL REFERENCES movie(id) ON DELETE CASCADE
);
`
module.exports = similarMovie

