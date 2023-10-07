const movie = `
CREATE TABLE movie(
    id SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    releaseDate TIMESTAMPTZ NOT NULL
);`
module.exports = movie