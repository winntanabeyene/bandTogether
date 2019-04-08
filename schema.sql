DROP DATABASE IF EXISTS bandtogether;

CREATE DATABASE bandtogether;

USE bandtogether;

CREATE TABLE account (
    id int NOT NULL AUTO_INCREMENT
    username varchar(50)
    password varchar(64)
    salt varchar(255)
    PRIMARY KEY (id)
)

CREATE TABLE musician (
    id int NOT NULL AUTO_INCREMENT
    name varchar(50)
    city varchar(100)
    age int
    id_account int
    PRIMARY KEY (id)
    FOREIGN KEY (id_account)
        REFERENCES account (id)
        ON DELETE CASCADE
)

CREATE TABLE instrument (
    id int NOT NULL AUTO_INCREMENT
    name varchar(50)
)

CREATE TABLE musician_instrument (
    id int NOT NULL AUTO_INCREMENT
    id_musician int
    id_instrument int
    PRIMARY KEY (id)
    FOREIGN KEY (id_musician)
        REFERENCES musician (id)
        ON DELETE CASCADE
    FOREIGN KEY (id_instrument)
        REFERENCES instrument (id)
        ON DELETE CASCADE
)

CREATE TABLE band (
    id int NOT NULL AUTO_INCREMENT
    name varchar(50)
    city varchar(100)
    state varchar(50)
    genre varchar(50)
    year_formed int 
    id_account int
    PRIMARY KEY (id)
    FOREIGN KEY (id_account)
        REFERENCES account(id)
        ON DELETE CASCADE
)

CREATE TABLE band_musician (
    id int NOT NULL AUTO_INCREMENT
    id_musician int 
    id_band int
    PRIMARY KEY (id)
    FOREIGN KEY (id_musician)
        REFERENCES musician (id)
        ON DELETE CASCADE
    FOREIGN KEY (id_band)
        REFERENCES band (id)
        ON DELETE CASCADE
)

CREATE TABLE profile (
    id int NOT NULL AUTO_INCREMENT
    url_image varchar(100)
    bio varchar(255)
    url_bandcamp varchar(100)
    url_spotify varchar(100)
    url_facebook varchar(100)
    url_homepage varchar(100)
    id_band int
    id_musician int
    PRIMARY KEY (id)
    FOREIGN KEY (id_band)
        REFERENCES band (id)
        ON DELETE CASCADE
    FOREIGN KEY (id_musician)
        REFERENCES musician (id)
        ON DELETE CASCADE
)

CREATE TABLE listing (
    id int NOT NULL AUTO_INCREMENT
    title varchar(100)
    date DATETIME
    description varchar(255)
    venue varchar(50)
    type varchar(50)
    url_image varchar(100)
    id_band int
    id_musician int
    PRIMARY KEY (id)
    FOREIGN KEY (id_band)
        REFERENCES band (id)
        ON DELETE CASCADE
    FOREIGN KEY (id_musician)
        REFERENCE musician (id)
        ON DELETE CASCADE
)