const accessToDatabase = require('../utils/accessToDatabase')
class resetPasswordService {
    async getUser(email) {
        const query = `
        SELECT * 
        FROM users 
        WHERE email = $1;`
        return await accessToDatabase.exequteQueryAndGetOne(query, {
            email
        })
    }
    async setNewPassword(id, newPassword) {
        const query = `
        UPDATE users SET password = $1 WHERE id = $2
        `
        return await accessToDatabase.exequteQueryAndGetOne(query, {
            newPassword,
            id
        })

    }
}
module.exports = new resetPasswordService()