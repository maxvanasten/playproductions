CREATE DATABASE IF NOT EXISTS playproductions;

USE playproductions;

CREATE TABLE IF NOT EXISTS `orders` (
    orderDate DATETIME, -- date the order was placed
    products JSON, -- a list of products and their properties that were ordered
    total FLOAT -- the total price of this order
);

CREATE TABLE IF NOT EXISTS `bookings` (
    startTime DATETIME,
    endTime DATETIME,
    contact VARCHAR(50)
);

-- CREATE TABLE IF NOT EXISTS `reviews` (

-- );

-- CREATE TABLE IF NOT EXISTS `posts` (

-- );

CREATE TABLE IF NOT EXISTS `products` (
    productName VARCHAR(50),
    productDesc VARCHAR(255),
    price FLOAT
);