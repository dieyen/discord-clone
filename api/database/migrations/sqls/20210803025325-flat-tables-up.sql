/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS `mydb`.`servers` (
    `server_id` INT NOT NULL AUTO_INCREMENT,
    `server_name` VARCHAR(100),
    `server_picture` VARCHAR(255) NULL,
    `user_id` INT NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `display_name` VARCHAR(45) NOT NULL,
    `user_picture` VARCHAR(255) NULL,
    PRIMARY KEY (`server_id`)
);

CREATE TABLE IF NOT EXISTS `mydb`.`roles`(
    `role_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(300) NOT NULL,
    `is_admin` BOOLEAN,
    PRIMARY KEY (`role_id`)
);

CREATE TABLE IF NOT EXISTS `mydb`.`channels`(
    `channel_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `server_id` INT NOT NULL,
    `roles` JSON DEFAULT NULL,
    PRIMARY KEY (`channel_id`)
);

CREATE TABLE IF NOT EXISTS `mydb`.`messages`(
    `message_id` INT NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `date` DATE,
    `time` TIME,
    `channel_id` INT NOT NULL,
    `channel_name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `display_name` VARCHAR(45) NOT NULL,
    `user_picture` VARCHAR(255) NULL,
    PRIMARY KEY (`message_id`)
);

CREATE TABLE IF NOT EXISTS `mydb`.`users`(
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `display_name` VARCHAR(45) NOT NULL,
    `user_picture` VARCHAR(255) NULL,
    `password` VARCHAR(45) NOT NULL,
    `roles` JSON,
    PRIMARY KEY (`user_id`)
);