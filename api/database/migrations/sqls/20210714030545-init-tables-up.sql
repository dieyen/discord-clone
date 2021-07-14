/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS mydb.users (
    `userID` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `displayName` VARCHAR(45) NOT NULL,
    `picture` VARCHAR(255) NULL,
    `password` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`userID`),
    UNIQUE INDEX `email_UNIQUE` (`email` ASC)
);

CREATE TABLE IF NOT EXISTS mydb.servers(
    `serverID` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100),
    `picture` VARCHAR(255) NULL,
    PRIMARY KEY(`serverID`)
);

CREATE TABLE IF NOT EXISTS mydb.`users-servers`(
    `userID` INT NOT NULL,
    `serverID` INT NOT NULL,
    FOREIGN KEY (`userID`) REFERENCES users (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`serverID`) REFERENCES servers (`serverID`) ON DELETE CASCADE ON UPDATE CASCADE 
);

CREATE TABLE IF NOT EXISTS mydb.roles(
    `roleID` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(300) NOT NULL,
    `isAdmin` BOOLEAN,
    PRIMARY KEY (`roleID`)
);

CREATE TABLE IF NOT EXISTS mydb.`servers-roles`(
    `serverID` INT NOT NULL,
    `roleID` INT NOT NULL,
    FOREIGN KEY (`serverID`) REFERENCES servers (`serverID`) ON DELETE CASCADE,
    FOREIGN KEY (`roleID`) REFERENCES roles (`roleID`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mydb.channels(
    `channelID` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`channelID`)
);

CREATE TABLE IF NOT EXISTS mydb.`servers-channels`(
    `serverID` INT NOT NULL,
    `channelID` INT NOT NULL,
    FOREIGN KEY (`serverID`) REFERENCES servers (`serverID`) ON DELETE CASCADE,
    FOREIGN KEY (`channelID`) REFERENCES channels (`channelID`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mydb.`channels-roles`(
    `channelID` INT NOT NULL,
    `roleID` INT NOT NULL,
    FOREIGN KEY (`channelID`) REFERENCES channels (`channelID`) ON DELETE CASCADE,
    FOREIGN KEY (`roleID`) REFERENCES roles (`roleID`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mydb.`users-roles`(
    `userID` INT NOT NULL,
    `roleID` INT NOT NULL,
    FOREIGN KEY (`userID`) REFERENCES users (`userID`) ON DELETE CASCADE,
    FOREIGN KEY (`roleID`) REFERENCES roles (`roleID`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mydb.messages(
    `messageID` INT NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `date` DATE,
    `time` TIME,
    `userID` INT NOT NULL,
    FOREIGN KEY (`userID`) REFERENCES users (`userID`) ON DELETE CASCADE,
    PRIMARY KEY (`messageID`)
);

CREATE TABLE IF NOT EXISTS mydb.`channels-messages`(
    `channelID` INT NOT NULL,
    `messageID` INT NOT NULL,
    FOREIGN KEY (`channelID`) REFERENCES channels (`channelID`) ON DELETE CASCADE,
    FOREIGN KEY (`messageID`) REFERENCES messages (`messageID`) ON DELETE CASCADE
);

CREATE PROCEDURE `LoginUser`(
    IN email VARCHAR(100),
    IN pass VARCHAR(30)
)
BEGIN
    SELECT * 
    FROM users
    WHERE users.email = email
    AND users.password = pass;
END;

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
    SELECT *
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