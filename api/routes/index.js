var express = require('express');
var router = express.Router();
const controller = require('../controllers/main.cont');
// const userController;
// const serverController;
// const channelController;

/* Login */
router.post( '/login/', controller.login );
/* Routings for Users */
router.post( '/users/', controller.postUser );
router.get( '/users/', controller.listUsers );
// router.get( '/user/', controller.getUser );
// router.get( '/users/search', controller.searchUser );

// /* Routings for Servers */
router.post( '/servers/', controller.postServer );                // /server/
router.get( '/servers/', controller.listServersInUser );         // /servers/
router.get( '/servers/:serverID', controller.getServerInUser );   // /server/:serverID/
router.get( '/servers/:serverID/users', controller.getUsersInServer );

// /* Routings for Roles */
router.post( '/servers/:serverID/roles/', controller.postRole );                 // /role/
router.get( '/servers/:serverID/roles/', controller.listRolesInServer );        // /roles/
// router.get( '/user/servers/:serverID/role/:roleID', controller.getRoleInServer );    // /roles/:roleID/?serverID=

// /* Routings for Channels */
router.post( '/servers/:serverID/channels/', controller.postChannel );
router.get( '/servers/:serverID/channels/', controller.listChannelsInServer );
// router.get( '/servers/:serverID/channels/:channelID', controller.getChannelInServer );
/* GET home page. */

// initDb.initialize();
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
  });
});

module.exports = router;
