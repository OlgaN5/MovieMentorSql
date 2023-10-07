const {Pool} = require('pg')
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: '6vremja6',
//     connectionTimeoutMillis: 5000,
//   });
const pool = new Pool({

  connectionString: "postgres://default:TRCz0QXj9btD@ep-cold-flower-38311113-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",

})
module.exports = pool
