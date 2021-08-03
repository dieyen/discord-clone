var db = require('./connect');

const commands = {
    checkConnection: function(){
        console.log( db );
    },

    loginUser: function(email, password){
        return db.raw( 'CALL LoginUser(?, ?);', [ email, password ] )
        .then(
            (val) => {
                return val[0][0][0];
            }
        );
    },

    addUser: function(email, displayName, picture, password){
        return db.raw( 'CALL AddUser(?, ?, ?, ?);', [ email, displayName, picture, password ] );
    },

    listUsers: function(){
        console.log( "Repository: Listing users..." );
        return db.raw( 'CALL ListUsers();' )
        .then(
            (val) => {
                return val[0][0];
            }
        );
    },

    getUser: function(userID){
        return knex.raw( 'CALL GetUser(?)', [ userID ] );
    },

    addServer: function(serverName, serverPicture, userID, email, displayName, userPicture){
        return db.raw( 'CALL AddServer(?, ?, ?, ?, ?, ?)', [ serverName, serverPicture, userID, email, displayName, userPicture ] );
    },
}

module.exports = commands;