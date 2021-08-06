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
        return ioredis.keys("users:" + email + "*")
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
            "users:"+userID, 
            "userID", userID,
            "email", email,
            "display_name", displayName,
            "user_picture", picture,
            "password", password);

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
        return ioredis.hkeys( "users:*" );
        // return db.raw( 'CALL ListUsers();' )
        // .then(
        //     (val) => {
        //         return val[0][0];
        //     }
        // );
    },

    getUser: function(userID){
        return ioredis.hgetall( "users:" + userID );
        // return db.raw( 'CALL GetUser(?)', [ userID ] );
    },

    addServer: function(serverName, serverPicture, userID, email, displayName, userPicture){
        const newServerID = nanoid();
        const newRoleID = nanoid();
        const newChannelID = nanoid();
        
        const server = {
            id: newServerID,
            name: serverName,
            picture: serverPicture
        }

        const role = {
            id: newRoleID,
            name: "Admin",
            isAdmin: 1
        }

        const channel = {
            id: newChannelID,
            name: "General",
            description: "First Channel of this server!"
        }

        console.log( server );

        var addServerToDb = db.raw( 'CALL AddServer(?, ?, ?, ?, ?, ?, ?, ?, ?);', [ newServerID, serverName, serverPicture, userID, email, displayName, userPicture, newRoleID, newChannelID ] );

        var addServerToRedis = ioredis.hset( "servers:" + newServerID, server );
        var addChannelToRedis = ioredis.hset( "channels:" + newChannelID, channel );
        var addRolesToRedis = ioredis.hset( "roles:" + newRoleID, role );

        return Promise.all( [ addServerToDb, addServerToRedis, addChannelToRedis, addRolesToRedis ] )
        .catch(
            (err) => {
                console.error(err.stack);
            }
        );
    },

    getServersOfUser: function(userID){
        return db.raw( 'CALL GetServersOfUser(?)', [ userID ] )
        .then(
            (val) => {
                return val[0][0];
            }
        )
    },

    getServer: function( serverID ){
        return ioredis.hgetall( "servers:" + serverID );
    },

    getUsersInServer: function( serverID ){
        return db.raw( 'CALL GetUsersInServer(?)', [ serverID ] )
        .then(
            (val) => {
                return val[0][0];
            }
        );
    },

    getChannelsInServer: function(userID, serverID){
        return db.raw( "CALL GetChannelsInServer(?, ?);", [ userID, serverID ] )
        .then(
            (val) => {
                return val[0][1];
            }
        );
    },

    addChannelInServer: function( channelName, channelDescription, serverID, role ){
        const channelID = nanoid();

        const channel = {
            channelID: channelID,
            name: channelName,
            description: channelDescription,
            serverID: serverID
        }

        console.log( typeof(role) );

        if ( role === '' ){
            role = [];
        }
        
        const roleString = JSON.stringify( role );

        var addChannelToDb = db.raw( "CALL AddChannelInServer(?, ?, ?, ?, ?);", [ channelID, channelName, channelDescription, serverID, roleString ] )

        var addChannelToRedis = ioredis.hset( "channels:" + channelID, channel );

        return Promise.all( [ addChannelToDb, addChannelToRedis ] )
        .then(
            (val) => {
                var objectToReturn = {
                    name: channelName,
                    description: channelDescription
                }

                return objectToReturn;
            }
        )
        .catch(
            (error) => {
                console.error( error.stack );
            }
        )
    },

    addRoleInServer: function( serverID, roleName, isAdmin ){
        const roleID = nanoid();

        const role = {
            id: roleID,
            name: roleName,
            isAdmin: isAdmin
        }

        var addRoleToDb = db.raw( 'CALL AddRoleToServer(?, ?, ?, ?)', [ roleID, serverID, roleName, isAdmin ] );

        var addRoleToRedis = ioredis.hset( "roles:" + roleID, role );

        return Promise.all( [ addRoleToDb, addRoleToRedis ] )
        .catch(
            (error) => {
                console.error( error );
            }
        )
    },

    getRolesInServer: function( serverID ){
        return db.raw( 'CALL GetRolesInServer(?);', [ serverID ] )
        .then(
            (val) => {
                return val[0][0];
            }
        )
    }
}

module.exports = commands;