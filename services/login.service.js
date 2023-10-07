const accessToDatabase = require('../utils/accessToDatabase')
class loginService {
    async getUser(login, email) {
        if (login) {
            return await accessToDatabase.readUserLogin(login)
        }
        if (email) {
            return await accessToDatabase.readUserEmail(email)
        }
    }
}

module.exports = new loginService()