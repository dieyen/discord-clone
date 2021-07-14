CREATE TABLE users (
    `userID` INT NOT NULL AUTO_INCREMENT, 
    `email` VARCHAR(100) UNIQUE,
    'displayName' VARCHAR(45) NOT NULL, 
    'picture' VARCHAR(255) NULL,
    'password' VARCHAR(30) NOT NULL,
    PRIMARY KEY (`userID`)
);

CREATE TABLE servers(
    'serverID' INT NOT NULL AUTO_INCREMENT,
    'name' VARCHAR(100) UNIQUE,
    'picture' VARCHAR(255) NULL,
    PRIMARY KEY('serverID')
);

CREATE TABLE users-servers(
    'userID' INT NOT NULL,
    'serverID' INT NOT NULL,
    FOREIGN KEY ('userID') REFERENCES users ('userID'),
    FOREIGN KEY ('serverID') REFERENCES servers ('serverID')  
);

CREATE TABLE roles(
    'roleID' INT NOT NULL AUTO_INCREMENT,
    'name' VARCHAR(300) NOT NULL,
    'isAdmin' BOOLEAN,
    PRIMARY KEY ('roleID')
);

CREATE TABLE servers-roles(
    'serverID' INT NOT NULL,
    'roleID' INT NOT NULL,
    FOREIGN KEY ('serverID') REFERENCES servers ('serverID'),
    FOREIGN KEY ('roleID') REFERENCES roles ('roleID')
);

CREATE TABLE channel(
    'channelID' INT NOT NULL AUTO_INCREMENT,
    'name' VARCHAR(100) NOT NULL,
    'description' VARCHAR(255) NOT NULL,
    PRIMARY KEY ('channelID')
);

CREATE TABLE servers-channels(
    'serverID' INT NOT NULL,
    'channelID' INT NOT NULL,
    FOREIGN KEY ('serverID') REFERENCES servers ('serverID'),
    FOREIGN KEY ('channelID') REFERENCES channels ('chnanelID')
);

CREATE TABLE channels-roles(
    'channelID' INT NOT NULL,
    'roleID' INT NOT NULL,
    FOREIGN KEY ('channelID') REFERENCES channels ('channelID'),
    FOREIGN KEY ('roleID') REFERENCES roles ('roleID')
);

CREATE TABLE users-roles(
    'userID' INT NOT NULL,
    'roleID' INT NOT NULL,
    FOREIGN KEY ('userID') REFERENCES users ('userID'),
    FOREIGN KEY ('roleID') REFERENCES roles ('roleID')
);

CREATE TABLE messages(
    'messageID' INT NOT NULL AUTO_INCREMENT,
    'content' TEXT NOT NULL,
    'date' DATE,
    'time' TIME,
    'userID' INT NOT NULL,
    FOREIGN KEY ('userID') REFERENCES users ('userID'),
    PRIMARY KEY ('messageID')
);

CREATE TABLE channels-  (
    'channelID' INT NOT NULL,
    'messageID' INT NOT NULL,
    FOREIGN KEY ('channelID') REFERENCES channels ('channelID'),
    FOREIGN KEY ('messageID') REFERENCES messages ('messageID')
);