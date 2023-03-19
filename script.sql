-- create the database
CREATE DATABASE stereopay;
-- use the database
USE stereopay;
-- create table 
CREATE TABLE media (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    type ENUM('audio', 'image') NOT NULL,
    description TEXT,
    url VARCHAR(255) NOT NULL,
    status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    deletedAt DATETIME
);