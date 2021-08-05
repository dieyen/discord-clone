const db = require('knex')({
    client: 'mysql',
    connection: {
      host : 'db_server',
      port: "3306",
      user : 'root',
      password : 'password',
      database : 'mydb'
    },

    pool: {
    },

    acquireConnectionTimeout: 10000
});

module.exports = db