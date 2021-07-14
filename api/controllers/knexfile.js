var knex = require('./connect-db');

const setup = {
    checkConnection: function(){
        console.log( knex );
    },

    loginUser: function(user){
        return knex.raw( 'CALL LoginUser(?, ?);', [ user.email, user.password ] );
    },

    postUser: function(user){
        return knex.raw( 'CALL AddUser(?, ?, ?, ?)', [ user.email, user.displayName, user.picture, user.password ] );
    },

    listUsers: function(){
        return knex.raw( 'CALL ListUsers();' );
    },

    getUser: function(userID){
        return knex.raw( 'CALL GetUser(?)', [ userID ] );
    },

    addServer: function(userID, server){
        return knex.raw( 'CALL AddServer(?, ?, ?)', [ userID, server.name, server.picture ] );
    }
}

module.exports = setup