const db = require('../repo/methods');

let loggedInUser = undefined;

const controller = {
    postUser: function(req, res){
        let pendingUser = req.body;

        if ( pendingUser.email === "" ){
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Email address is empty.",
                    status: "EMAIL_ADDRESS_EMPTY"
                }
            });
        }

        if ( pendingUser.displayName === "" ){
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Display name is empty.",
                    status: "DISPLAY_NAME_EMPTY"
                }
            });
        }

        if ( pendingUser.password === "" ){
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Password is empty.",
                    status: "PASSWORD_EMPTY"
                }
            });
        }
        db.addUser( pendingUser.email, pendingUser.displayName, pendingUser.picture, pendingUser.password )
        .then(
            (val) => {
                res.status(200).json({ 
                    data: {
                        email: val.email,
                        displayName: val.displayName,
                        picture: val.picture
                    } 
                })
            }
        )
        .catch(
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        sql_code: error.errno,
                        message: error.stack,
                        status: "ERROR_CAUGHT: " + error.code
                    }
                })
            }
        )
    },

    login: function( req, res ){
        if ( req.body.email === "" ){
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Email address is empty.",
                    status: "EMAIL_ADDRESS_EMPTY"
                }
            });
        }
        
        if ( req.body.password === "" ){
            res.status(400).json({
                error: {
                    code: 400,
                    message: "Password is empty.",
                    status: "PASSWORD_EMPTY"
                }
            });
        }

        db.loginUser( req.body.email, req.body.password )
        .then(
            (val) => {
                if ( val ){
                    loggedInUser = val;
                    // console.log(val);
                    res.status(200).json({
                        data: {
                            userID: val.userID,
                            email: val.email,
                            displayName: val.displayName,
                            picture: val.userPicture
                        }
                    });
                }
                else{
                    res.status(404).json({
                        error: {
                            code: 404,
                            message: "Invalid user credentials or user not found.",
                            status: "USER_NOT_FOUND"
                        }
                    });
                }
            }
        )
        .catch(
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        sql_code: error.errno,
                        message: error.stack,
                        status: "ERROR_CAUGHT: " + error.code
                    }
                })
            }
        )
    },

    listUsers: function(req, res){
        db.listUsers()
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
                        sql_code: error.errno,
                        message: error.stack,
                        status: "ERROR_CAUGHT: " + error.code
                    }
                })
            }
        )
    },

    getUser: function(req, res){
        new Promise( (resolve, reject) => {
            if ( loggedInUser ){
                resolve( loggedInUser );
            }
            else{
                reject()
            }
        })
        .then(
            (val) => {
                res.status(200).json({
                    data: {
                        email: val.email,
                        displayName: val.displayName,
                        picture: val.userPicture
                    }
                });
            },
            () => {
                res.status(403).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
                    }
                });
            }
        )
        .catch(
            (error) => {
                res.status(404).json({
                    error: {
                        code: 404,
                        sql_code: error.errno,
                        message: error.stack,
                        status: "ERROR_CAUGHT: " + error.code
                    }
                })
            }
        )
    },

    postServer: function(req, res){
        new Promise( (resolve, reject) => {
            if ( loggedInUser ){
                resolve( loggedInUser );
            }
            else{
                reject();
            }
        })
        .then(
            (val) => {
                var pendingServer = req.body;

                if ( pendingServer.name === "" ){
                    res.status(400).json({
                        error: {
                            code: 400,
                            message: "Server name is empty.",
                            status: "SERVER_NAME_EMPTY"
                        }
                    });
                    return;
                }

                db.addServer( pendingServer.name, pendingServer.picture, val.userID, val.email, val.displayName, val.userPicture)
                .then(
                    (val) => {
                        res.status(200).json({
                            data: {
                                name: pendingServer.name,
                                picture: pendingServer.picture
                            }
                        });
                    }
                )
            },

            (reason) => {
                res.status(404).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
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
                })
            }
        )
    },

    listServersInUser: function(req, res){
        new Promise( (resolve, reject) => {
            if ( loggedInUser ){
                resolve( loggedInUser );
            }
            else{
                reject();
            }
        })
        .then(
            (val) => {
                db.getServersOfUser( val.userID )
                .then(
                    (val) => {;
                        res.status(200).json( { data: val } );
                    }
                )
            },

            (reason) => {
                res.status(404).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
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
                })
            }
        )
    },

    getServerInUser: function(req, res){
        new Promise( (resolve, reject) => {
            if ( loggedInUser ){
                resolve( loggedInUser );
            }
            else{
                reject();
            }
        })
        .then( 
            (val) => {
                db.getServer( req.params.serverID )
                .then(
                    (val) => {
                        res.status(200).json( { data: val } );
                    }
                )
            },
            (reason) => {
                res.status(404).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
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
                })
        })
    },

    getUsersInServer: function(req, res){
        new Promise( (resolve, reject) => {
            if ( loggedInUser ){
                resolve( loggedInUser );
            }
            else{
                reject();
            }
        })
        .then( 
            (val) => {
                db.getUsersInServer( req.params.serverID )
                .then(
                    (val) => {
                        // console.log( val );
                        res.status(200).json( { data: val } );
                    }
                )
            },
            (reason) => {
                res.status(404).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
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
                })
        })
    },

    getUsersNotInServer: function(req, res){
        new Promise( (resolve, reject) => {
            if ( loggedInUser ){
                resolve( loggedInUser );
            }
            else{
                reject();
            }
        })
        .then( 
            (val) => {
                db.getUsersNotInServer( val.userID, req.params.serverID )
                .then(
                    (val) => {
                        // console.log( val );
                        res.status(200).json( { data: val } );
                    }
                )
            },
            (reason) => {
                res.status(404).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
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
                })
        })
    },
    
    postChannel: function(req, res){
        new Promise( (resolve, reject) => {
            if (loggedInUser){
                resolve( loggedInUser );
            }
            else{
                reject();
            }
        })
        .then(
            (val) => {
                var pendingChannel = req.body;
                db.addChannelInServer( pendingChannel.name, pendingChannel.description, req.params.serverID, pendingChannel.role )
                .then(
                    (val) => {
                        res.status(200).json({
                            data: {
                                name: val.name,
                                desription: val.description
                            }
                        })
                    }
                )
            },

            () => {
                res.status(403).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
                    }
                });
            }
        )
    },

    listChannelsInServer: function(req, res){
        
        new Promise( (resolve, reject) => {
            if ( loggedInUser ){
                resolve( loggedInUser );
            }
            else{
                reject();
            }
        })
        .then(
            (val) => {
                db.getChannelsInServer( val.userID, req.params.serverID )
                .then(
                    (val) => {
                        res.status(200).json({
                            data: val
                        })
                    }
                )
            },
            () => {
                res.status(403).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
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
                })
        })
    },

    postRole: function(req, res){
        new Promise( (resolve, reject) => {
            if ( loggedInUser ){
                resolve( loggedInUser );
            }
            else{
                reject()
            }
        })
        .then(
            (val) => {
                var pendingRole = req.body;
                db.addRoleInServer( req.params.serverID, pendingRole.name, pendingRole.isAdmin )
                .then(
                    (val) => {
                        res.status(200).json({
                            data: {
                                name: pendingRole.name,
                                isAdmin: pendingRole.isAdmin
                            }
                        })
                    }
                )
            },
            () => {
                res.status(403).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
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
                })
        })
    },

    listRolesInServer: function(req, res){
        new Promise( (resolve, reject) => {
            if (loggedInUser){
                resolve( loggedInUser );
            }
            else{
                reject();
            }
        })
        .then(
            (val) => {
                db.getRolesInServer( req.params.serverID )
                .then(
                    (val) => {
                        res.status(200).json({
                            data: val
                        });
                    }
                )
            },
            () => {
                res.status(403).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
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
                })
        })
    },

    addUserInServer: function(req, res){
        new Promise( (resolve, reject) => {
            if ( loggedInUser ){
                resolve( loggedInUser );
            }
            else{
                reject();
            }
        })
        .then(
            () => {
                var body = req.body;
                db.addUserInServer( req.params.serverID, body.email, body.role)
                .then(
                    () => {
                        res.status(200).json({
                            data: {
                                email: body.email,
                                serverName: body.serverName,
                                role: body.role
                            }
                        })
                    }
                )
            },
            () => {
                res.status(403).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
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
                })
            }
        )
    },

    addRoleInUser: function(req, res){
        new Promise( (resolve, reject) => {
            if (loggedInUser){
                resolve( loggedInUser );
            }
            else{
                reject();
            }
        })
        .then(
            (val) => {
                var body = req.body;
                db.addRoleToUser( body.userID, body.role )
                .then(
                    () => {
                        res.status(200).json({
                            data: {
                                message: "Added role " + body.role + " to user."
                            }
                        });
                    }
                )
            },
            () => {
                res.status(403).json({
                    error: {
                        code: 403,
                        message: "You are not logged in. Please login to continue.",
                        status: "USER_NOT_LOGGED_IN"
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
                })
            }
        )
    }
}

module.exports = controller;