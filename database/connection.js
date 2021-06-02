// const mysql = require("mysql");
// const dotenv = require("dotenv");
// const path = require("path");
import mysql from 'mysql';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: './.env'});



const connection = () => {
    const connection = mysql.createConnection({
        host:       process.env.DATABASE_HOST,
        user:       process.env.DATABASE_USER,
        password:   process.env.DATABASE_PASSWORD,
        database:   process.env.DATABASE,
    });

    connection.connect( (error) => {
        if(error) {
            throw error
        }
        console.log("MYSQL Connected...")
    });
    return connection;
}

// module.exports = connection;
export default connection;