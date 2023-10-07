const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

chai.should()
chai.use(chaiHttp)

DESCRIBE('API Methods', () => {
    DESCRIBE('register user', () => {
        const user = {
            email: 'test@gmail.com',
            login: 'test',
            password: 'test'
        }
        it('it should register user', (done) => {

        })
    })
})