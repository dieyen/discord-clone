/* Replace with your SQL commands */

CREATE PROCEDURE `AddUser`(
    IN `p_email` VARCHAR(100),
    IN `p_display_name` VARCHAR(45),
    IN `p_picture` VARCHAR(255),
    IN `p_password` VARCHAR(45)
)
BEGIN
    INSERT INTO `users` (`email`, `display_name`, `user_picture`, `password`, `roles`) VALUES
    ( `p_email`, `p_display_name`, `p_picture`, `p_password`, CAST( '[]' AS JSON) );
END;

CREATE PROCEDURE `LoginUser`(
    IN `p_email` VARCHAR(100),
    IN `p_pass` VARCHAR(45)
)
BEGIN
    SELECT `users`.`user_id`, `users`.`email`, `users`.`display_name`, `users`.`user_picture`
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
    IN `p_user_id` INT
)
BEGIN
    SELECT `users`.`user_id`, `users`.`email`, `users`.`display_name`, `users`.`user_picture`
    FROM `users`
    WHERE `users`.`user_id` = `p_user_id`;
END;

CREATE PROCEDURE `AddServer`(
    IN `p_server_name` VARCHAR(100),
    IN `p_server_picture` VARCHAR(255),
    IN `p_user_id` INT,
    IN `p_email` VARCHAR(100),
    IN `p_display_name` VARCHAR(45),
    IN `p_user_picture` VARCHAR(255)
)
BEGIN
    DECLARE `q_role_id` INT;
    DECLARE `q_server_id` INT;
    SELECT COUNT(`servers`.`server_id`) INTO `q_server_id` FROM `servers` ORDER BY `servers`.`server_id` DESC;

    INSERT INTO `servers` ( `server_id`, `server_name`, `server_picture`, `user_id`, `email`, `display_name`, `user_picture`) VALUES
    ( `q_server_id`+1, `p_server_name`, `p_server_picture`, `p_user_id`, `p_email`, `p_display_name`, `p_user_picture`);

    INSERT INTO `roles` (`name`, `is_admin`) VALUES
    ("Admin", 1);

    SELECT `roles`.`role_id` INTO `q_role_id` FROM `roles` WHERE `roles`.`role_id` = @@Identity;
	
    UPDATE `users`
	SET `users`.`roles` = JSON_ARRAY_APPEND(`users`.`roles`, '$',  CAST( CONCAT( '{"role_id":', `q_role_id`,',"role_name": "Admin", "is_admin": 1}') AS JSON) )
	WHERE `users`.`user_id` = `p_user_id`;
END;

CREATE PROCEDURE `GetServersOfUser`(
    IN `p_user_id` INT
)
BEGIN
    SELECT * FROM `servers`
    WHERE `servers`.`user_id` = `p_user_id`;
END;

CREATE PROCEDURE `GetUsersInServer`(
    IN `p_server_id` INT
)
BEGIN
    SELECT * FROM `servers`
    WHERE `servers`.`server_id` = `p_server_id`;
END;

CREATE PROCEDURE `GetChannelsInServer`(
    IN `p_server_id` VARCHAR(100)
)
BEGIN
    SELECT * FROM `channels`
    WHERE `channels`.`server_id` = `p_server_id`;
END;

CREATE PROCEDURE `GetMessagesInChannel`(
    IN `p_channel_id` INT
)
BEGIN
    SELECT * FROM `messages`
    WHERE `messages`.`channel_id` = `p_channel_id`
    ORDER BY `messages`.`datetime` DESC;
END;