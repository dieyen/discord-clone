DELIMITER // 
CREATE PROCEDURE GetTable(
    IN tableName VARCHAR(255)
)
BEGIN
    SELECT * FROM tableName;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AddUser(
    IN email VARCHAR(100) UNIQUE,
    IN displayName VARCHAR(45) NOT NULL, 
    IN picture VARCHAR(255) NULL,
    IN pass VARCHAR(30) NOT NULL,
)
BEGIN
    INSERT INTO users ('email', 'displayName', 'picture', 'password') 
    VALUES(
        email, displayName, picture, pass
    );
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ListUsers()
BEGIN
    SELECT *
    FROM users;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetUser(
    IN userID INT
)
BEGIN
    SELECT * 
    FROM users
    WHERE user = userID;
END //
DELIMITER ;
