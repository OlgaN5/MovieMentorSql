const accessToDatabase = require('../utils/accessToDatabase')
const {User} = require('../models/associations')
class loginService {
    async getUser(login, email) {
        if (login) {
            // const conditions = {
            //     login
            // }
            return await accessToDatabase.readUserLogin(login)
        }
        if (email) {
            // const conditions = {
            //     email
            // }
            return await accessToDatabase.readUserEmail(email)
        }
    }
}

module.exports = new loginService()