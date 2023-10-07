const status = `
CREATE TABLE status(
    id SERIAL PRIMARY KEY,
    title VARCHAR(25) NOT NULL UNIQUE
);`
module.exports = status
