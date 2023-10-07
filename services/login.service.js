const accessToDatabase = require('../utils/accessToDatabase')
class loginService {
    async getUser(login, email) {
        if (login) {
            const query = `
            SELECT * FROM users
            WHERE login = $1;`
            return await accessToDatabase.exequteQueryAndGetOne(query, {
                login
            })
        }
        if (email) {
            const query = `
            SELECT * 
            FROM users 
            WHERE email = $1;`
            return await accessToDatabase.exequteQueryAndGetOne(query, {
                email
            })

        }
    }
}

module.exports = new loginService()