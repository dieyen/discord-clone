var knex = require('./connect-db');

const setup = {
    checkConnection: function(){
        console.log( knex );
    },

    loginUser: function(email, password){
        return knex.raw( 'CALL LoginUser(?, ?);', [ email, password ] );
        // knex.raw( 'CALL LoginUser(?, ?);', [ email, password ] )
        // .then(
        //     (val) => {
        //         if ( val[0][0].length != 0 ){
        //             console.log( "Returning value: ", val[0][0][0] );
        //             return val[0][0][0];
        //         }
        //         else{
        //             return;
        //         }
        //     }
        // )
        // .catch(
        //     (error) => {
        //         return error;
        //     }
        // )
    },

    postUser: function(email, displayName, picture, password){
        return knex.raw( 'CALL AddUser(?, ?, ?, ?)', [ email, displayName, picture, password ] );
    },

    listUsers: function(){
        return knex.raw( 'CALL ListUsers();' )
        .then(
            (val) => {
                return val[0][0];
            }
        );
    },

    getUser: function(userID){
        return knex.raw( 'CALL GetUser(?)', [ userID ] );
    },

    addServer: function(userID, name, picture){
        return knex.raw( 'CALL AddServer(?, ?, ?)', [ userID, name, picture ] );
    },

    listServersOfUser: function( userID ){
        return knex.raw( 'CALL ListServersOfUser(?)', [ userID ] )
        .then(
            (val) => {
                var returnValue = val[0][0];
                return Promise.resolve( returnValue );
            }
        );
    },

    getServerInfo: function(userID, serverID){
        return knex.raw( 'CALL GetServerInfo(?, ?);', [ userID, serverID ] )
        .then(
            (val) => {
                if ( val[0][0].length != 0 ){
                    var serverInfo = val[0][0][0];
                    return Promise.resolve( serverInfo );
                }
                else{
                    return;
                }
            }
        );;

    },

    getServerChannels: function(serverID){
        return knex.raw( 'CALL GetServerChannels(?);', [ serverID ] )
        .then(
            (val) => {
                var channelsList = val[0][0];
                return Promise.resolve( channelsList );
            }
        );
    },

    getServerRoles: function(serverID){
        return knex.raw( 'CALL GetServerRoles(?);', [ serverID ] )
        .then(
            (val) => {
                var rolesList = val[0][0];
                return Promise.resolve( rolesList );
            }
        );
    },

    getServerUsers: function(serverID){
        return knex.raw( 'CALL GetServerUsers(?);', [ serverID ] )
        .then(
            (val) => {
                var usersList = val[0][0];
                return Promise.resolve( usersList );
            }
        );
    },

    addRole: function(serverID, role, isAdmin){
        return knex.raw( 'CALL GetServerRoles(?)', [ serverID ] )
        .then(
            (val) => {
                var query = val[0][0]

                for ( var i = 0; i < query.length; i++ ){
                    if ( query[i].name == role ){
                        return knex.raw( 'CALL UpdateRole(?, ?)', [ query[i].roleID, isAdmin ])
                    }
                }

                return knex.raw( 'CALL AddRoleToServer(?, ?, ?)', [ serverID, role, isAdmin ] )
            }
        )
    }
}

module.exports = setup