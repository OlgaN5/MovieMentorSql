const accessToDatabase = require('../utils/accessToDatabase')
class registerService {
    async createUser(user) {
        return await accessToDatabase.createUser(user)
    }
    async findUserByEmail(email) {
        return await accessToDatabase.readUserEmail(email)
    }
    async findUserByLogin(login) {
        return await accessToDatabase.readUserLogin(login)
    }
}

module.exports = new registerService()