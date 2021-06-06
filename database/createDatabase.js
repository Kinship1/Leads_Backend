// var mysql = require('mysql');
// const dotenv = require("dotenv");
// const path = require("path");
import mysql from 'mysql';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: './.env'});


const connection = mysql.createConnection({
    host:       process.env.DATABASE_HOST,
    user:       process.env.DATABASE_USER,
    password:   process.env.DATABASE_PASSWORD,
});

connection.query(`CREATE DATABASE ${process.env.DATABASE}`, (err) => {
    if(err)
    console.log(err);
} );

connection.query(`CREATE TABLE ${process.env.DATABASE}.users(\
    id INT NOT NULL AUTO_INCREMENT,\
    username VARCHAR(255) NOT NULL,\
    password VARCHAR(255) NOT NULL,\
    PRIMARY KEY(id),\
    UNIQUE(username)\
)`);

connection.query(`CREATE TABLE ${process.env.DATABASE}.profile (\
    id INT NOT NULL AUTO_INCREMENT,\
    user_id INT NOT NULL,\
    name VARCHAR(255),\
    ph_no VARCHAR(10),\
    UNIQUE(ph_no),
    \
    PRIMARY KEY (id),\
    FOREIGN KEY (user_id) REFERENCES users(id)\
)`);

connection.query(`CREATE TABLE ${process.env.DATABASE}.leads (\
    id INT NOT NULL AUTO_INCREMENT,\
    user_id INT NOT NULL,\
    name VARCHAR(255),\
    email VARCHAR(255),\
    address VARCHAR(255),\
    reward INT,\
    status VARCHAR(255),\
    ph_no VARCHAR(10),\
    date DATE NOT NULL DEFAULT CURRENT_DATE(),\
    PRIMARY KEY (id),\
    FOREIGN KEY (user_id) REFERENCES users(id)\
)`);

console.log('Success: Database Created!')

connection.end();




