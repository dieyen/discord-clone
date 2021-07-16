/* Replace with your SQL commands */
CREATE PROCEDURE `LoginUser`(
    IN email VARCHAR(100),
    IN pass VARCHAR(30)
)
BEGIN
    SELECT `users`.`userID`, `users`.`email,`, `users`.`displayName`, `users`.`picture`
    FROM `users`
    WHERE `users`.`email` = `email`
    AND `users`.`password` = `pass`;
END

CREATE PROCEDURE `AddUser`(
    IN email VARCHAR(100),
    IN displayName VARCHAR(45), 
    IN picture VARCHAR(255),
    IN pass VARCHAR(30)
)
BEGIN
    INSERT INTO users (`email`, `displayName`, `picture`, `password`) 
    VALUES(
        email, displayName, picture, pass
    );
END;

CREATE PROCEDURE `ListUsers`()
BEGIN
    SELECT `email`, `displayName`, `picture`
    FROM users;
END;

CREATE PROCEDURE `GetUser`(
    IN userID INT
)
BEGIN
    SELECT * 
    FROM users
    WHERE userID = userID;
END;

CREATE PROCEDURE `AddServer`(
    IN `userID` INT,
    IN `name` VARCHAR(100),
    IN `picture` VARCHAR(255)
)
BEGIN
    DECLARE `serverID` INT;
    DECLARE `channelID` INT;
    DECLARE `roleID` INT;

    INSERT INTO `servers` (`name`, `picture`) 
    VALUES(
        `name`, `picture`
    );
    SELECT `servers`.`serverID` INTO `serverID` FROM `servers` WHERE `servers`.`serverID` = @@Identity;

    INSERT INTO `users-servers` (`userID`, `serverID`)
    VALUES(
        `userID`, `serverID`
    );

    INSERT INTO `roles`(`name`, `isAdmin`)
    VALUES(
        "Admin", 1
    );

    SELECT `roles`.`roleID` INTO `roleID` FROM `roles` WHERE `roles`.`roleID` = @@Identity;

    INSERT INTO `servers-roles` (`serverID`, `roleID`)
    VALUES(
        `serverID`, `roleID`
    );

    INSERT INTO `users-roles` (`userID`, `roleID`)
    VALUES(
        `userID`, `roleID`
    );

    INSERT INTO `channels`(`name`, `description`)
    VALUES(
        "General", ""
    );

    SELECT `channels`.`channelID` INTO `channelID` FROM `channels` WHERE `channels`.`channelID` = @@Identity;

    INSERT INTO `servers-channels` (`serverID`, `channelID`)
    VALUES(
        `serverID`, `channelID`
    );

END;

CREATE PROCEDURE `ListServersOfUser`(
    IN `userID` INT
)
BEGIN
    SELECT `servers`.`name`, `servers`.`picture`
    FROM `servers`
    INNER JOIN `users-servers`
        ON `servers`.`serverID` = `users-servers`.`serverID`
    INNER JOIN `users`
        ON `users`.`userID` = `users-servers`.`userID`
    WHERE `users`.`userID` = `userID`;
END

CREATE PROCEDURE `GetServerInfo`(
    IN `userID` INT,
    IN `serverID` INT
)
BEGIN
    SELECT `servers`.`serverID`, `servers`.`name`, `servers`.`picture`
    FROM `servers`
    INNER JOIN `users-servers`
        ON `servers`.`serverID` = `users-servers`.`serverID`
    INNER JOIN `users`
        ON `users`.`userID` = `users-servers`.`userID`
    WHERE `users`.`userID` = `userID`
    AND `servers`.`serverID` = `serverID`;        
END;

CREATE PROCEDURE `GetServerChannels`(
    IN `serverID` INT
)
BEGIN
    SELECT `channels`.`channelID`, `channel`.`name`, `channel`.`description`
    FROM `channels`
    INNER JOIN `servers-channels`
        ON `servers`.`serverID` = `servers-channels`.`serverID`
    WHERE `servers`.`serverID` = `serverID`;    
END;

CREATE PROCEDURE `GetServerRoles`(
    IN `serverID` INT
)
BEGIN
    SELECT `roles`.`roleID`, `roles`.`name`, `roles`.`isAdmin`
    FROM `roles`
    INNER JOIN `servers-roles`
        ON `servers`.`serverID` = `servers-roles`.`serverID`
    WHERE `servers`.`serverID` = `serverID`;    
END;

CREATE PROCEDURE `GetServerUsers`(
    IN `serverID` INT
)
BEGIN
    SELECT `users`.`userID`, `users`.`email`, `users`.`diplayName`, `users`.`picture`
    FROM `users`
    INNER JOIN `users-servers`
        ON `servers`.`serverID` = `users-servers`.`serverID`
    WHERE `servers`.`serverID` = `serverID`;    
END;