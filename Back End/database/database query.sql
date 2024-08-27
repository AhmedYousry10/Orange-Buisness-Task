CREATE DATABASE Library;

USE Library;

CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100),
    Bio TEXT
);

CREATE TABLE Books (
    BookID INT PRIMARY KEY IDENTITY,
    Title NVARCHAR(100) NOT NULL,
    Description TEXT,
    AuthorID INT,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);
