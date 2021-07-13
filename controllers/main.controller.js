const shortid = require('shortid');

/* 
    USER: userID, email, displayName, picture, password 
    ROLE: roleID, roleName
    SERVER: serverID, name, picture
    CHANNEL: channelID, name, description, categoryID
*/
let users = [];
let roles = [];
let servers = [];
let channels = [];
let userToRoles = [];
let userToServer = [];
let channelToServer = [];

const controller = {
    postUser: function(req, res){
        var userFound = undefined;
        new Promise( (resolve,reject) => {
            users.forEach( (val, key) => {
                if ( userFound ){
                    return;
                }

                if ( val.email == req.body.email ){
                    userFound = val;
                }
            });

            if ( !userFound ){    
                var entry = {
                    "userID": users.length + 1,
                    "email": req.body.email,
                    "displayName": req.body.displayName,
                    "picture": req.body.picture,
                    "password": req.body.password,
                    "servers": []
                };
                console.log( entry );
                users.push( entry );
                resolve( entry );
            }
            reject( userFound );
            
        })
        .then( 
            (val) => {                                            
                res.status(200).json( { data: val } );
            }, 
            
            (reason) => {
                res.status(409).json( {
                    error: {
                        code: 409,
                        message: "User with email " + reason.email + " already exists." ,
                        status: "USER_ALREADY_EXISTS"
                    }
                });
            }
        )
        .catch( 
            (error) => {          
                console.log( error.stack );                             
                res.status(404).json( 
                    {
                        error: {
                            code: 404,
                            message: error.stack,
                            status: "ERROR_CAUGHT"
                        } 
                    }
                );
            }
        )
    },

    listUsers: function(req, res){
        new Promise( (resolve, reject) => {
            resolve( users );
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            })
        .catch( (error) => {
            console.log( error.stack );
            res.status(404).json({
                error: { 
                    code: 404,
                    message: error.stack,
                    status: "ERROR_CAUGHT"
                }
            })
        })
    },

    getUser: function(req, res){
        new Promise( (resolve, reject) => {
            let foundUser;

            users.forEach( (val, key) => {
                if ( val.userID == req.params.userID ){
                    foundUser = val;
                }
            });

            if ( foundUser ){
                resolve( foundUser );
            }
            else{
                reject( req.params.userID );
            }

        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            }, 
            
            (reason) => {
                res.status(404).json(
                    {
                        error: {
                            code: 400,
                            message: "Cannot find user with ID " + reason,
                            status: "USER_NOT_FOUND" 
                        }
                    })
            }
        )
        .catch( 
            (error) => {
                console.log( error.stack );
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CATCH"
                    }
                })
            }
        )
    },

    searchUser: function(req, res){
        new Promise( (resolve, reject) => {
            let foundUser = [];

            users.forEach( (val, key) => {
                if ( val.email == req.query.searchString || val.displayName == req.query.searchString ){
                    foundUser.push( val );
                }
            });

            if ( foundUser ){
                resolve( foundUser );
            }
            else{
                reject( req.params.userID );
            }

        }).then( (val) => {
            res.status(200).json( val );
        }).catch( (error) => {
            res.status(404).json({
                error: {
                    message: 'Cannot find user: ' + error
                }
            })
        })
    },

    postServer: function(req, res){
        let user = users[ req.params.userID - 1 ];

        if ( !user ){
            res.status(400).json({
                error: {
                    code: 400,
                    message: "User does not have a permission to create server. Check if the user exists.",
                    status: "USER_NOT_FOUND"
                }
            });
        }

        new Promise( (resolve,reject) => {
            var serverFound = false;

            servers.forEach( (val, key) => {
                if ( serverFound ){
                    return;
                }

                if ( val.name == req.body.name ){
                    serverFound = true;
                }
            });

            if ( !serverFound ){
                var adminRole = {
                    "roleID": roles.length + 1,
                    "name": "Admin",
                    "isAdmin": true
                }
                var newChannel = {
                    "channelID": channels.length + 1,
                    "name": "General",
                    "description": "",
                    "categoryID": 0,
                    "roles": [],
                    "messages": []
                }

                roles.push( adminRole );
                channels.push( newChannel );

                var entry = {
                    "serverID": servers.length + 1,
                    "name": req.body.name,
                    "picture": req.body.picture,
                    "categories": [],
                    "channels": [ newChannel ],
                    "roles": [ adminRole ],
                    "users-to-roles": [
                        {
                            "roleID": roles.length,
                            "userID": user.userID
                        }
                    ],
                    "channels-to-roles": []
                };
                console.log( entry );
                user.servers.push( entry );
                servers.push( entry );
                resolve( entry );
            }
            reject( req.body.name )
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            }, 
            
            (reason) => {
                res.status(409).json( {
                    error: {
                        code: 409,
                        message: "Server " + reason + " already exists.",
                        status: "SERVER_ALREADY_EXISTS"
                    }
                } );
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                })
            }
        )
    },

    listServersInUser: function(req, res){
        let user = users[ req.params.userID - 1 ];

        new Promise( (resolve, reject) => {
            resolve( user.servers );
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
        })
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                })
        })
    },

    getServerInUser: function(req, res){
        let user = users[ req.params.userID - 1];
        let server = servers[ req.params.serverID - 1 ];

        if ( !server ){
            res.status(400).json({
                error: {
                    code: 400,
                    message: "The server you are looking for does not exist.",
                    status: "SERVER_NOT_FOUND"
                }
            })
        }

        new Promise( (resolve, reject) => {
            user.servers.forEach( (val, key) => {
                if ( server ){
                    return;
                }
                if ( val.serverID == req.params.serverID ){
                    server = val;
                }
            });

            if ( server ){
                resolve( server );
            }
            reject( req.params.serverID );

        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            },
            (reason) => {
                res.status(403).json({
                    error: {
                        code: 403,
                        message: "You are not allowed to view this server. Receive invitation first from the server owner.",
                        status: "SERVER_PERMISSION_DENIED"
                    }
                })
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                })
        })
    },

    postRole: function(req, res){
        let roleFound = false;
        let server = servers[ req.params.serverID - 1 ];

        new Promise( (resolve,reject) => {

            server.roles.forEach( (val, key) => {
                if ( roleFound ){
                    return;
                }
                if ( val.name == req.body.name ){
                    roleFound = val;
                }
            });

            if ( !roleFound ){
                var entry = {
                    "roleID": roles.length + 1,
                    "name": req.body.name,
                    "isAdmin": req.body.isAdmin
                };
                console.log( entry );
                server.roles.push( entry );
                roles.push( entry );
                resolve( entry );
            }
            reject( roleFound );
            
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            },
            (reason) => {
                res.status(403).json({
                    error: {
                        code: 403,
                        message: "Role " + reason.name + " already exists in the server.",
                        status: "ROLE_ALREADY_EXISTS"
                    }
                })
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                })
            }
        )
    },

    listRolesInServer: function(req, res){
        let server = servers[ req.params.serverID - 1 ];

        new Promise( (resolve, reject) => {
            resolve( server.roles );
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                })
        })
    },

    getRoleInServer: function(req, res){
        let server = servers[ req.params.serverID - 1 ];
        let roleFound = undefined;

        new Promise( (resolve, reject) => {

            server.roles.forEach( (val, key) => {
                if ( roleFound ){
                    return;
                }

                if ( val.roleID == req.params.roleID ){
                    roleFound = val
                }
            });

            if ( roleFound ){
                resolve( roleFound );
            }
            reject( req.params.roleID );

        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            },
            (reason) => {
                res.status(400).json({
                    error: {
                        error: 403,
                        message: "Role does not exist in the server.",
                        status: "ROLE_NOT_FOUND"
                    }
                })
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                })
        })
    },

    inviteUserToServer: function(req, res){
        let user = users[ req.params.userID - 1 ];
        let server = undefined;
        let targetUser = users[ req.body.userID - 1 ];
        let userInServer = false;
        
        if ( !targetUser ){
            res.status(400).json({
                error: {
                    code: 400,
                    message: "User with ID " + req.body.userID + " does not exist.",
                    status: "USER_NOT_FOUND"
                }
            });
        }

        new Promise( (resolve, reject) => {

            user.servers.forEach( (val, key) => {
                if ( server ){
                    return;
                }
                if ( val.serverID == req.params.serverID ){
                    server = val;
                }
            });

            targetUser.servers.forEach( (val, key) => {
                if ( userInServer ){
                    return;
                }

                if ( val.serverID == server.serverID ){
                    userInServer = true;
                }
            })

            if ( !userInServer ){
                targetUser.servers.push( server );
                resolve( targetUser );
                // var object = {
                //     "userID": req.body.userID,
                //     "serverID": req.params.serverID
                // }

                // userToServer.push( object );
                // resolve( object );
            }
            reject( targetUser );

        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            },
            (reason) => {
                res.status(409).json({
                    error: {
                        code: 409,
                        message: "User already present in the server.",
                        status: "USER_ALREADY_IN_SERVER"
                    }
                })
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                })
        })
    },

    listUsersInServer: function(req, res){
        let server = servers[ req.params.serverID - 1 ];

        new Promise( (resolve, reject) => {
            resolve( server.users );
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                })
        })
    },

    createChannel: function(req, res){
        let server = servers[ req.params.serverID - 1 ];
        let channelInServer = undefined;

        if ( !server ){
            res.status(400).json({
                error: {
                    code: 400,
                    message: "The server you are modifying does not exist.",
                    status: "SERVER_NOT_FOUND"
                }
            })
        }

        new Promise( (resolve, reject) => {
            server.channels.forEach( (val, key) => {
                if ( channelInServer ){
                    return;
                }

                if ( val.name == req.body.name ){
                    console.log( "Channel already exists on server.");
                    channelInServer = val;
                }
            });

            if ( !channelInServer ){
                console.log( "Assigning the channel to the server.");
                var object = {
                    "channelID": channels.length + 1,
                    "name": req.body.name,
                    "description": req.body.description,
                    "categoryID": req.body.categoryID,
                    "roles": [],
                    "messages": []
                }
                
                server.channels.push( object );
                channels.push( object );

                resolve( object );
            }

            reject( channelInServer );
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            },

            (reason) => {
                res.status(409).json({
                    error: {
                        code: 409,
                        message: "Channel " + reason.name + " already exists in server.",
                        status: "CHANNEL_ALREADY_EXISTS"
                    }
                })
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                })
        })
    },

    listChannelsInServer: function(req, res){
        let user = users[ req.params.userID - 1 ];
        let serverList = user.servers;
        let server = undefined;
        var availableChannels = [];

        new Promise( (resolve, reject) => {
            serverList.forEach( (val, key) => {
                if ( server ){
                    return;
                }
                if ( val.serverID == req.params.serverID ){
                    server = val;
                }
            });
            
            availableChannels = server.channels;
            let userRole = [];

            server["users-to-roles"].forEach( (val, key) => {
                if ( val.userID == user.userID ){
                    userRole.push( val.roleID );
                }
            })

            console.log( "User roles: ", userRole );

            userRole.forEach( (role, key) => {
                server["channels-to-roles"].forEach( (val, key) => {
                    if ( roles[ role - 1 ].isAdmin ){
                        return;
                    }
                    if ( role != val.roleID ){
                        let channelToRemove = undefined;
                        availableChannels.forEach( (channel, key) => {
                            console.log( "Channel: ", channel );
                            console.log( "Evaluating channel: ", channel.name)
                            if ( channelToRemove ){
                                return;
                            }
                            if ( channel.channelID == val.channelID ){
                                console.log( "Channel to remove found: ", channel)
                                channelToRemove = channel;
                            }
                        });

                        var index = availableChannels.indexOf( channelToRemove );
                        console.log( "Channel to remove: ", channelToRemove );
                        console.log( "Index to remove: ", index )
                        availableChannels.splice( index, 1 );
                    }
                });
            });

            resolve( availableChannels );
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                })
        })
    },

    getChannelInServer: function(req, res){
        let server = servers[ req.params.serverID - 1 ];
        let channel = undefined;

        new Promise( (resolve, reject) => {
            server.channels.forEach( (val, key) => {
                if ( channel ){
                    return;
                }
                if ( val.channelID = req.params.channelID ){
                    channel = val ;
                }
            });

            if ( channel ){
                resolve( channel );
            }
            reject( req.params.channelID );
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            },
            (reason) => {
                res.status(400).json({
                    error: {
                        code: 400,
                        message: "Channel with ID " + reason + " does not exist in the server.",
                        status: "CHANNEL_NOT_FOUND_IN_SERVER"
                    }
                });
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                });
            }
        )
    },

    assignUserToRoleInServer: function(req, res){
        let user = users[ req.params.userID - 1 ];
        let server = servers[ req.params.serverID - 1 ];
        var flagFound = undefined;

        new Promise( (resolve, reject) => {
            server["users-to-roles"].forEach( (val, key) => {
                if ( flagFound ){
                    return;
                }
                if ( val.userID == req.body.userID && val.roleID == req.body.roleID ){
                    flagFound = val;
                }
            })

            if ( !flagFound ){
                var object = {
                    "userID": req.body.userID,
                    "roleID": req.body.roleID
                }

                server["users-to-roles"].push( object );
                resolve( object );
            }
            reject( flagFound );

        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            },
            
            (reason) => {
                res.status(409).json({
                    error: {
                        code: 409,
                        message: "User " + users[ reason.userID - 1 ] + " already has the " + roles[ reason.roleID - 1 ] + " role.",
                        status: "USER_ALREADY_HAS_ROLE" 
                    }
                });
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                });
            }
        )
    },

    listUsersToRolesInServer: function(req, res){
        let server = servers[ req.params.serverID - 1 ];

        new Promise( (resolve, reject) => {
            resolve( server.user-to-roles );
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                });
            }
        )
    },

    getUserRolesInServer: function(req, res){
        let server = servers[ req.params.serverID - 1 ];
        let user = users[ req.params.userID - 1 ];
        let rolesList = [];
        new Promise( (resolve, reject) => {
            server.user-to-roles.forEach( (val, key) => {
                console.log( val );
                if ( val.userID == user.userID ){
                    server.roles.forEach( (value, index) => {
                        if ( value.roleID == val.roleID ){
                            rolesList.push( value );
                        }
                    })
                    var object = {
                        'name': user.name,
                        'roles': rolesList
                    }
                    resolve( object );
                }
            });
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            }
        )
        .catch( (error) => {
            res.status(404).json({
                error: {
                    message: 'Cannot find user: ' + error
                }
            })
        })
    },

    getRoleUsersInServer: function(req, res){
        let server = servers[ req.params.serverID - 1 ];
        let role = roles[ req.params.roleID -  1 ];
        let usersList = [];

        new Promise( (resolve, reject) => {
            server.user-to-roles.forEach( (val, key) => {
                console.log( val );
                if ( val.roleID == role.roleID ){
                    server.users.forEach( (value, index) => {
                        if ( value.userID == val.userID ){
                            usersList.push( {
                                "userID": value.userID,
                                "displayName": value.displayName,
                                "picture": value.picture
                            } );
                        }
                    })
                    var object = {
                        'roleID': val.roleID,
                        'users': usersList
                    }
                    resolve( object );
                }
            });
            reject();

        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                });
            }
        )
    },

    assignRoleToChannel: function(req, res){
        let server = servers[ req.params.serverID - 1 ];
        let rolesList = server.roles;
        let channelList = server.channels;
        let isRoleExist = undefined;
        let channel = undefined;
        let role = undefined;
        
        new Promise( (resolve, reject) => {
            console.log( rolesList );
            channelList.forEach( (val, key) =>{
                if ( channel ){
                    return;
                }
                if ( val.channelID == req.params.channelID ){
                    channel = val;
                }
            });

            rolesList.forEach( (val, key) => {
                if ( role ){
                    return;
                }

                if ( val.name == req.body.name ){
                    role = val;
                }
            });

            channel.roles.forEach( (val, key) => {
                console.log( val );
                if ( isRoleExist ){
                    return;
                }

                if ( val == role.roleID ){
                    isRoleExist = true;
                }
           });

           if ( !isRoleExist ){
                var connect = {
                    "channelID": parseInt( channel.channelID ),
                    "roleID": role.roleID
                }
                channel.roles.push( role.roleID );
                server["channels-to-roles"].push( connect );
               resolve( connect );
           }
           reject( role );
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            },
            (reason) => {
                res.status(409).json({
                    error: {
                        code: 409,
                        message: "Role already exists in the channel.",
                        status: "ROLE_ALREADY_EXISTS_IN_SERVER"
                    }
                });
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                });
            }
        )
    },

    listRolesInChannel: function(req, res){
        let channel = channels[ req.params.channelID ];

        new Promise( (resolve, reject) => {
            resolve( channel.roles );
        })
        .then( 
            (val) => {
                res.status(200).json( { data: val } );
            }
        )
        .catch( 
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        message: error.stack,
                        status: "ERROR_CAUGHT"
                    }
                });
            }
        )
    },
}

module.exports = controller;