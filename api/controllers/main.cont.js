const db = require('../repo/methods');

let loggedInUser = undefined;

const controller = {
    postUser: function(req, res){
        console.log( "Controller: POST User" );
        let pendingUser = req.body;
        console.log( "Controller: Request body:", pendingUser );

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
        console.log( "Controller: Request body clear." );
        db.addUser( pendingUser.email, pendingUser.displayName, pendingUser.picture, pendingUser.password )
        .then(
            (val) => {
                console.log( val );
                res.status(200).json({ 
                    data: {
                        email: pendingUser.email,
                        displayName: pendingUser.displayName,
                        picture: pendingUser.picture
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
                    res.status(200).json({
                        data: {
                            userID: val.user_id,
                            email: val.email,
                            displayName: val.display_name,
                            picture: val.user_picture
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
                        displayName: val.display_name,
                        picture: val.user_picture
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

                db.addServer( pendingServer.name, pendingServer.picture, val.user_id, val.email, val.display_name, val.user_picture)
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
}

module.exports = controller;