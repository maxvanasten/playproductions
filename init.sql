CREATE DATABASE IF NOT EXISTS playproductions;

USE playproductions;

CREATE TABLE IF NOT EXISTS `products` (
    reference VARCHAR(20),
    name VARCHAR(32),
    description VARCHAR(256),
    price FLOAT,
    sales INT
);

CREATE TABLE IF NOT EXISTS `bookings` (
    reference VARCHAR(20),
    phoneNumber VARCHAR(10),
    emailAddress VARCHAR(48),
    address VARCHAR(60),
    type STR,
    deposit FLOAT,
    date DATETIME
);

CREATE TABLE IF NOT EXISTS `orders` (
    reference VARCHAR(20),
    products JSON,
    date DATETIME,
    total FLOAT,
    bookingReference VARCHAR(20)
);

