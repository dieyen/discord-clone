/* Replace with your SQL commands */

CREATE PROCEDURE `AddUser`(
    IN `p_user_id` VARCHAR(127),
    IN `p_email` VARCHAR(100),
    IN `p_display_name` VARCHAR(45),
    IN `p_picture` VARCHAR(255),
    IN `p_password` VARCHAR(45)
)
BEGIN
    INSERT INTO `users` ( `user_id`, `email`, `display_name`, `user_picture`, `password`, `roles`) VALUES
    ( `p_user_id`, `p_email`, `p_display_name`, `p_picture`, `p_password`, CAST( '[]' AS JSON) );
END;

CREATE PROCEDURE `LoginUser`(
    IN `p_email` VARCHAR(100),
    IN `p_pass` VARCHAR(45)
)
BEGIN
    SELECT `users`.`user_id`, `users`.`email`, `users`.`display_name`, `users`.`user_picture`, `users`.`roles`
    FROM `users`
    WHERE `users`.`email` = `p_email`
    AND `users`.`password` = `p_pass`;
END;

CREATE PROCEDURE `ListUsers`()
BEGIN
    SELECT `users`.`user_id`, `users`.`email`, `users`.`display_name`, `users`.`user_picture`
    FROM `users`;
END;

CREATE PROCEDURE `GetUser`(
    IN `p_user_id` VARCHAR(127)
)
BEGIN
    SELECT `users`.`user_id`, `users`.`email`, `users`.`display_name`, `users`.`user_picture`, `users`.`roles`
    FROM `users`
    WHERE `users`.`user_id` = `p_user_id`;
END;

CREATE PROCEDURE `AddServer`(
    IN `p_server_id` VARCHAR(127),
    IN `p_server_name` VARCHAR(100),
    IN `p_server_picture` VARCHAR(255),
    IN `p_user_id` VARCHAR(127),
    IN `p_email` VARCHAR(100),
    IN `p_display_name` VARCHAR(45),
    IN `p_user_picture` VARCHAR(255),
    IN `p_role_id` VARCHAR(127),
    IN `p_channel_id` VARCHAR(127)
)
BEGIN
    INSERT INTO `servers` ( `server_id`, `server_name`, `server_picture`, `user_id`, `email`, `display_name`, `user_picture`) VALUES
    ( `p_server_id`, `p_server_name`, `p_server_picture`, `p_user_id`, `p_email`, `p_display_name`, `p_user_picture`);

    INSERT INTO `roles` ( `role_id`, `name`, `is_admin`, `server_id` ) VALUES
    ( `p_role_id`, "Admin", 1, `p_server_id` );

    INSERT INTO `channels` ( `channel_id`, `name`, `description`, `server_id`, `roles` ) VALUES
    ( `p_channel_id`, "General", "First channel of this server!", `p_server_id`, "[]" );
	
    UPDATE `users`
	SET `users`.`roles` = JSON_ARRAY_APPEND(`users`.`roles`, '$',  CAST( CONCAT( '{"role_id":"', `p_role_id`,'","role_name": "Admin", "is_admin": 1}') AS JSON) )
	WHERE `users`.`user_id` = `p_user_id`;
END;

CREATE PROCEDURE `GetServersOfUser`(
    IN `p_user_id` VARCHAR(127)
)
BEGIN
    SELECT * FROM `servers`
    WHERE `servers`.`user_id` = `p_user_id`;
END;

CREATE PROCEDURE `GetUsersInServer`(
    IN `p_server_id` VARCHAR(127)
)
BEGIN
    SELECT `servers`.`user_id`, `servers`.`email`, `servers`.`display_name`, `servers`.`user_picture` FROM `servers`
    WHERE `servers`.`server_id` = `p_server_id`;
END;

CREATE PROCEDURE `GetChannelsInServer`(
    IN `p_user_id` VARCHAR(127),
    IN `p_server_id` VARCHAR(127)
)
BEGIN
	DECLARE `q_roles` JSON;
	
    SELECT `users`.`roles` as `q_roles` 
    FROM `users`
    WHERE `users`.`user_id` = `p_user_id`;
    
    SELECT * FROM `channels`
    WHERE `channels`.`server_id` = `p_server_id`
    AND (`channels`.`roles` LIKE '[]' OR JSON_CONTAINS(`channels`.`roles`, `q_roles`) );
END;

CREATE PROCEDURE `GetMessagesInChannel`(
    IN `p_channel_id` VARCHAR(127)
)
BEGIN
    SELECT * FROM `messages`
    WHERE `messages`.`channel_id` = `p_channel_id`
    ORDER BY `messages`.`datetime` DESC;
END;

CREATE PROCEDURE `AddChannelInServer`(
    IN `p_channel_id` VARCHAR(127),
    IN `p_channel_name` VARCHAR(100),
    IN `p_channel_desc` VARCHAR(255),
    IN `p_server_id` VARCHAR(127),
    IN `p_roles` JSON
)
BEGIN
    INSERT INTO `channels` VALUES
    ( `p_channel_id`, `p_channel_name`, `p_channel_desc`, `p_server_id`, `p_roles`);
END;

CREATE PROCEDURE `AddRoleToServer` (
	IN `p_role_id` VARCHAR(127),
    IN `p_server_id` VARCHAR(127),
    IN `p_role_name` VARCHAR(300),
    IN `p_is_admin` BOOLEAN
)
BEGIN
	INSERT INTO `roles` ( `role_id`, `server_id`, `name`, `is_admin` ) VALUES
    ( `p_role_id`, `p_server_id`, `p_role_name`, `p_is_admin` );
END;

CREATE PROCEDURE `GetRolesInServer` (
	`p_server_id` VARCHAR(127)
)
BEGIN
	SELECT *
    FROM `roles`
    WHERE `roles`.`server_id` = `p_server_id`;
END;

CREATE PROCEDURE `AddRoleToUser` (
	`p_user_id` VARCHAR(127),
    `p_role` JSON
)
BEGIN
	UPDATE `users`
	SET `users`.`roles` = JSON_ARRAY_APPEND(`users`.`roles`, '$',  `p_role`)
	WHERE `users`.`user_id` = `p_user_id`;
END;
