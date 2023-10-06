const accessToDatabase = require('../utils/accessToDatabase')
const {
    User
} = require('../models/associations')
class registerService {
    async createUser(user) {
        console.log(user)
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