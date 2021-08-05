var db = require('./connect-mysql');
var nanoid = require('nanoid');
const Redis = require("ioredis");
const ioredis = new Redis({host: 'redis'});

function updateEntry( userID, field, value ){
    return ioredis.hgetall( userID )
    .then(
        (val) => {
            var payload = [];

            if ( val[field] ){
                payload = JSON.parse( val[field] );
            }
            payload.push( value );
            return Promise.resolve( ioredis.hset( userID, field, JSON.stringify(payload) ) );
        }
    )
}

const commands = {
    checkConnection: function(){
        console.log( db );
        console.log( ioredis );
    },

    loginUser: function(email, password){
        return ioredis.keys(email + "*")
        .then(
            (val) => {
                // console.log("Retrieving keys:", val);
                return Promise.resolve( ioredis.hgetall( val ) );
            }
        )
        .then(
            (val) => {
                if ( val.email === email && val.password === password ){
                    // console.log("Valid credentials...");
                    return Promise.resolve( val );
                }
                else{
                    // console.log("Invalid credentials...");
                    return null;
                }
            }
        )
    },

    addUser: function(email, displayName, picture, password){
        const userID = email + ":" + nanoid();
        console.log( "User ID:", userID );

        var addUserToDb = db.raw( 'CALL AddUser(?, ?, ?, ?, ?);', [ userID, email, displayName, picture, password ] );

        var addUserToRedis = ioredis.hset( 
            userID, 
            "userID", userID,
            "email", email,
            "display_name", displayName,
            "user_picture", picture,
            "password", password,
            "roles", "[]");

        return Promise.all( [ addUserToDb, addUserToRedis ] )
        .then(
            () => {
                var objectToReturn = {
                    "email": email,
                    "display_name": displayName,
                    "picture": picture,
                }

                return objectToReturn;
            }
        )
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
        return db.raw( 'CALL GetUser(?)', [ userID ] );
    },

    addServer: function(serverName, serverPicture, userID, email, displayName, userPicture){
        const new_serverID = nanoid();
        const new_roleID = nanoid();
        const new_channelID = nanoid();
        
        // const server = {
        //     server_id: new_serverID,
        //     server_name: serverName,
        //     server_picture: serverPicture,
        //     user_id: userID,
        //     email: email,
        //     display_name: displayName,
        //     user_picture: userPicture
        // }

        const role = {
            role_id: new_roleID,
            name: "Admin",
            isAdmin: 1
        }

        // const channel = {
        //     channel_id: new_channelID,
        //     name: "General",
        //     description: "First Channel of this server!",
        //     server_id: new_serverID,
        //     roles: []
        // }

        // console.log( server );

        var addServerToDb = db.raw( 'CALL AddServer(?, ?, ?, ?, ?, ?, ?, ?, ?);', [ new_serverID, serverName, serverPicture, userID, email, displayName, userPicture, new_roleID, new_channelID ] );

        var addRoleToUser = updateEntry( userID, "roles", role );

        return Promise.all( [ addServerToDb, addRoleToUser ] )
        .catch(
            (err) => {
                console.error(err.stack);
            }
        );
    },

    getServersOfUser: function(userID){
        return db.raw( 'CALL GetServerOfUser(?)', [ userID ] )
        .then(
            (val) => {
                return val[0][0];
            }
        )
    },

    getServer: function( serverID ){
        return db.raw( 'CALL GetUsersInServer(?)', [ serverID ] )
        .then(
            (val) => {
                return val[0][0];
            }
        );
    },

    getChannelsInServer: function(userID, serverID){
        return ioredis.hget( userID, "roles" )
        .then(
            (val) => {
                var rolesList = JSON.parse( val );
                return Promise.resolve( db.raw( 'CALL GetChannelsInServer(?,?)', [ serverID, rolesList ] ) );
            }
        )
        .then(
            (val) => {
                return val[0][0];
            }
        )
        
        // return ioredis.hgetall( userID )
        // .then(
        //     (val) => {
        //         const roles = JSON.parse( val.roles );
        //         const channels = JSON.parse( val.channels );

        //         channels.forEach( (channel, index, object) => {
        //             if ( channel.server_id != serverID ){
        //                 object.splice( index, 1 );
        //             }
        //         });

        //         channels.forEach( (channel, index, object) => {
        //             if ( !channel.roles ){
        //                 return;
        //             }

        //         });
        //     }
        // )
    }
}

module.exports = commands;