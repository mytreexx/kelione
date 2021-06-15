create database vacations;
use vacations;

CREATE TABLE users (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE vacations (
    id INT AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    starting_date DATE NOT NULL,
    ending_date DATE NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE followers (
    id INT AUTO_INCREMENT,
    vacation INT NOT NULL,
    following_user INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (vacation)
        REFERENCES vacations (id),
    FOREIGN KEY (following_user)
        REFERENCES users (id)
);

INSERT INTO users (first_name, last_name, username, `password`, is_admin)
VALUES ("admin", "admin", "admin", "admin", 1 );

DELETE FROM `users` WHERE `id` = 8;