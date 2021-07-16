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
        var usersList = knex.raw( 'CALL ListUsers();' )
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

    listServersOfUser: async function( userID ){
        let serversList = undefined;
        knex.raw( 'CALL ListServersOfUser(?)', [ userID ] )
        .then(
            (val) => {
                serversList = val[0][0];
            }
        );
        
        console.log( "Knex value: ", serversList );
        return serversList;
    },

    getServerInfo: function(userID, serverID){
        knex.raw( 'CALL GetServerInfo(?, ?);', [ userID, serverID ] )
        .then(
            (val) => {
                if ( val[0][0].length != 0 ){
                    return val[0][0][0];
                }
                else{
                    return;
                }
            }
        );;

    },

    getServerChannels: function(serverID){
        knex.raw( 'CALL GetServerChannels(?);', [ serverID ] )
        .then(
            (val) => {
                if ( val[0][0].length != 0 ){
                    return val[0][0][0];
                }
                else{
                    return;
                }
            }
        );
    },

    getServerRoles: function(serverID){
        knex.raw( 'CALL GetServerRoles(?);', [ serverID ] )
        .then(
            (val) => {
                if ( val[0][0].length != 0 ){
                    return val[0][0][0];
                }
                else{
                    return;
                }
            }
        );
    },

    getServerUsers: function(serverID){
        knex.raw( 'CALL GetServerUsers(?);', [ serverID ] )
        .then(
            (val) => {
                if ( val[0][0].length != 0 ){
                    return val[0][0][0];
                }
                else{
                    return;
                }
            }
        );
    }
}

module.exports = setup