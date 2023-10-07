const accessToDatabase = require('../utils/accessToDatabase')
class registerService {
    async createUser(user) {
        const query = `
        INSERT INTO users (email, login, password) 
        VALUES($1,$2,$3) 
        RETURNING *;`
        return await accessToDatabase.exequteQueryAndGetOne(query, user)
    }
    async findUserByEmail(email) {
        const query = `
        SELECT * 
        FROM users 
        WHERE email = $1;`
        return await accessToDatabase.exequteQueryAndGetOne(query, {
            email
        })
    }
    async findUserByLogin(login) {
        const query = `
        SELECT * FROM users
        WHERE login = $1;`
        return await accessToDatabase.exequteQueryAndGetOne(query, {
            login
        })
    }
}

module.exports = new registerService()