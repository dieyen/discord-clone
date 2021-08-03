var knex = require('./connect-db');

const setup = {
    // listServersOfUser: function( userID ){
    //     return knex.raw( 'CALL ListServersOfUser(?)', [ userID ] )
    //     .then(
    //         (val) => {
    //             var returnValue = val[0][0];
    //             return Promise.resolve( returnValue );
    //         }
    //     );
    // },

    // getServerInfo: function(userID, serverID){
    //     return knex.raw( 'CALL GetServerInfo(?, ?);', [ userID, serverID ] )
    //     .then(
    //         (val) => {
    //             if ( val[0][0].length != 0 ){
    //                 var serverInfo = val[0][0][0];
    //                 return Promise.resolve( serverInfo );
    //             }
    //             else{
    //                 return;
    //             }
    //         }
    //     );;

    // },

    // getServerChannels: function(serverID){
    //     return knex.raw( 'CALL GetServerChannels(?);', [ serverID ] )
    //     .then(
    //         (val) => {
    //             var channelsList = val[0][0];
    //             return Promise.resolve( channelsList );
    //         }
    //     );
    // },

    // getServerRoles: function(serverID){
    //     return knex.raw( 'CALL GetServerRoles(?);', [ serverID ] )
    //     .then(
    //         (val) => {
    //             var rolesList = val[0][0];
    //             return Promise.resolve( rolesList );
    //         }
    //     );
    // },

    // getServerUsers: function(serverID){
    //     return knex.raw( 'CALL GetServerUsers(?);', [ serverID ] )
    //     .then(
    //         (val) => {
    //             var usersList = val[0][0];
    //             return Promise.resolve( usersList );
    //         }
    //     );
    // },

    // addRole: function(serverID, role, isAdmin){
    //     return knex.raw( 'CALL GetServerRoles(?)', [ serverID ] )
    //     .then(
    //         (val) => {
    //             var query = val[0][0]

    //             for ( var i = 0; i < query.length; i++ ){
    //                 if ( query[i].name == role ){
    //                     return knex.raw( 'CALL UpdateRole(?, ?)', [ query[i].roleID, isAdmin ])
    //                 }
    //             }

    //             return knex.raw( 'CALL AddRoleToServer(?, ?, ?)', [ serverID, role, isAdmin ] )
    //         }
    //     )
    // },

    // addChannel: function(serverID, name, desc){
    //     return knex.raw( 'CALL GetServerChannels(?);', [ serverID ] )
    //     .then(
    //         (val) => {
    //             var query = val[0][0]

    //             for ( var i = 0; i < query.length; i++ ){
    //                 if ( query[i].name == name ){
    //                     var channelExists = {
    //                         error: {
    //                             code: 409,
    //                             message: "Channel already exists in this server.",
    //                             status: "CHANNEL_ALREADY_EXISTS"
    //                         }
    //                     };
    //                     return channelExists;
    //                 }
    //             }

    //             return knex.raw( "CALL AddChannel(?, ?, ?)", [ serverID, name, desc ] );
    //         }
    //     )
    // }
}

module.exports = setup