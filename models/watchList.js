const watchList = `
CREATE TABLE watchList(
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movieId INT NOT NULL REFERENCES movie(id),
    statusId INT NOT NULL REFERENCES status(id)
);
`
module.exports = watchList