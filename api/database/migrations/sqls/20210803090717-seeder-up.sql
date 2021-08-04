INSERT INTO `users` VALUES 
(1, 'anna.union@gmail.com', 'Anna Union', 'anna-union.jpg', 'password', '[]'),
(2, 'bob.trawleney@gmail.com', 'Bob Trawleney', 'bob-trawleney.jpg', 'password', '[]'),
(3, 'george.smith@gmail.com', 'George Smith', 'george-smith.jpg', 'password', '[]'),
(4, 'alfonso.graves@gmail.com', 'Alfonso Graves', 'alfonso-graves.jpg', 'password', '[]'),
(5, 'emperor.ketema@gmail.com', 'Emperor Ketema', 'emperor-ketema.jpg', 'password', '[
    { "role_id": 1, "name": "Emperor of Enbessa", "is_admin": 1}
    ]'),
(6, 'princess.qing@gmail.com', 'Princess Qing', 'princess-qing.jpg', 'password', '[]');

INSERT INTO `roles` VALUES
(1, 'Emperor of Enbessa', 1),
(2, 'Pirate Friend', 0),
(3, 'Friend to the Revolution', 0),
(4, 'The Queen', 1);

INSERT INTO `servers` ( `server_id`, `server_name`, `server_picture`, `user_id`, `email`, `display_name`, `user_picture` ) VALUES
(1, 'Old World', 'old-world.jpg', 1, 'anna.union@gmail.com', 'Anna Union', 'anna-union.jpg'),
(2, 'New World', 'new-world.jpg', 1, 'anna.union@gmail.com', 'Anna Union', 'anna-union.jpg'),
(1, 'Old World', 'old-world.jpg', 2, 'bob.trawleney@gmail.com', 'Bob Trawleney', 'bob-trawleney.jpg'),
(2, 'New World', 'new-world.jpg', 2, 'bob.trawleney@gmail.com', 'Bob Trawleney', 'bob-trawleney.jpg'),
(3, 'Cape Trawleney', 'cape-trawleney.jpg', 2, 'bob.trawleney@gmail.com', 'Bob Trawleney', 'bob-trawleney.jpg'),
(1, 'Old World', 'old-world.jpg', 3, 'george.smith@gmail.com', 'George Smith', 'george-smith.jpg'),
(2, 'New World', 'new-world.jpg', 3, 'george.smith@gmail.com', 'George Smith', 'george-smith.jpg'),
(3, 'Cape Trawleney', 'cape-trawleney.jpg', 3, 'george.smith@gmail.com', 'George Smith', 'george-smith.jpg'),
(1, 'Old World', 'old-world.jpg', 4, 'alfonso.graves@gmail.com', 'Alfonso Graves', 'alfonso-graves.jpg'),
(2, 'New World', 'new-world.jpg', 4, 'alfonso.graves@gmail.com', 'Alfonso Graves', 'alfonso-graves.jpg'),
(3, 'Cape Trawleney', 'cape-trawleney.jpg', 4, 'alfonso.graves@gmail.com', 'Alfonso Graves', 'alfonso-graves.jpg'),
(4, 'The Arctic', 'the-arctic.jpg', 4, 'alfonso.graves@gmail.com', 'Alfonso Graves', 'alfonso-graves.jpg'),
(4, 'The Arctic', 'the-arctic.jpg', 3, 'george.smith@gmail.com', 'George Smith', 'george-smith.jpg'),
(5, 'Horn of Enbessa', 'horn-of-enbessa.jpg', 5, 'emperor.ketema@gmail.com', 'Emperor Ketema', 'emperor-ketema.jpg'),
(5, 'Horn of Enbessa', 'horn-of-enbessa.jpg', 1, 'anna.union@gmail.com', 'Anna Union', 'anna-union.jpg'),
(1, 'Old World', 'old-world.jpg', 6, 'princess.qing@gmail.com', 'Princess Qing', 'princess-qing.jpg');

INSERT INTO `channels` VALUES
(1, 'High Clarence Hall', 'Trading port of Sir Archibald Blake', 1, '[]'),
(2, 'Wormsway Prison', 'Prison island of Eli Bleakworth', 1, '[]'),
(3, 'Emporium Exotique', 'Exotic goods port of Madame Kahina', 1, '[]'),
(4, 'Narwhal', 'Pirate island of Anne Harlow', 1, '[]'),
(5, 'El Puerto', 'Refuge island port of Isabel Sarmento', 2, '[]'),
(6, 'High Mountain', 'Pirate island of Jean La Fortune', 2, '[]'),
(7, "Old Nate's Harbor", 'Workshop harbor of Old Nate', 3, '[]'),
(8, "Old Nate's Hangar", 'Airship station of Old Nate', 4, '[]'),
(9, 'Taborime', 'Capital island of Emperor Ketema', 5, '[
    { "role_id": 1, "name": "Emperor of Enbessa", "is_admin": 1}
    ]');