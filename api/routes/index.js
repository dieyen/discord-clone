var express = require('express');
var router = express.Router();
const controller = require('../controllers/main.controller');
const initDb = require('../controllers/knexfile');


/* Routings for Users */
router.post( '/user/', controller.postUser );
router.get( '/users/', controller.listUsers );
router.get( '/user/:userID', controller.getUser );
router.get( '/users/search', controller.searchUser );

/* Routings for Servers */
router.post( '/user/:userID/server/', controller.postServer );
router.get( '/user/:userID/servers/', controller.listServersInUser );
router.get( '/user/:userID/server/:serverID', controller.getServerInUser );

/* Routings for Roles */
router.post( '/user/:userID/server/:serverID/role/', controller.postRole );
router.get( '/user/:userID/server/:serverID/roles/', controller.listRolesInServer );
router.get( '/user/:userID/server/:serverID/role/:roleID', controller.getRoleInServer );

/* Routings for Channels */
router.post( '/user/:userID/server/:serverID/channel/', controller.createChannel );
router.get( '/user/:userID/server/:serverID/channels/', controller.listChannelsInServer );
router.get( '/user/:userID/server/:serverID/channel/:channelID', controller.getChannelInServer );

/* Routings for table connections */
  /* Users and Roles connection */
  router.post( '/user/:userID/server/:serverID/assign-user-to-role/', controller.assignUserToRoleInServer );
  router.get( '/users-to-roles/', controller.listUsersToRolesInServer );
  router.get( '/user-to-roles/:userID', controller.getUserRolesInServer );
  router.get( '/role-to-users/:roleID', controller.getRoleUsersInServer );

  /* Roles and Servers connection */
  // router.get( '/server-to-roles/:serverID', controller.getServerToRoles );

  /* Users to Servers connection */
  router.post( '/user/:userID/server/:serverID/invite', controller.inviteUserToServer );
  router.get( '/user/:userID/server/:serverID/users/', controller.listUsersInServer );

  /* Roles and Channels connection */
  router.post( '/user/:userID/server/:serverID/channel/:channelID/role/', controller.assignRoleToChannel );
  router.get( '/user/:userID/server/:serverID/channel/:channelID/roles', controller.listRolesInChannel );
/* GET home page. */

// initDb.initialize();
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
  });
});

module.exports = router;
