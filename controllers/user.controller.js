// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {db} from "../app.js";


export const register = (req, res) => {
    bcryptjs.genSalt(10, function(err, salt){
        bcryptjs.hash(req.body.password, salt, (err, hash) => {
            const user = {
                id: null,
                username: req.body.username,
                password: hash,
            }
            db.query(`INSERT INTO users (username, password ) VALUES ('${user.username}', '${user.password}')`, (err, result) => {
                if(err){
                    res.status(406).send(err.sqlMessage);
                } else {
                    user.id = result.insertId
                    console.log(user);
                    const token = jwt.sign(user, 'secret', (err, token) => {
                        if(!err){
                            res.status(200).send({
                                message: "User registered",
                                username: user.username,
                                token: token
                            })
                        } else {
                            res.status(404).send(err);
                        }
                    })
                }
            });
        });
    });  
};

export const login = (req, res) => {
    const user = {
        id: null,
        username: req.body.username,
        password: req.body.password,
    }
    db.query(`SELECT * FROM users WHERE username = '${user.username}'` , (err, rows) => {
        if(err){
            res.status(404).send("INVALID CREDENTIALS!!");
        }
        user.id = rows[0].id;
        console.log(user);
        bcryptjs.compare(user.password, rows[0].password, (err, result) => {
            if (result){
                const token = jwt.sign(user, 'secret', (err, token) => {
                    if(!err){
                        res.status(200).send({
                            message: "Login Successful",
                            username: user.username,
                            token: token
                        })
                    } else {
                        res.status(404).send(err);
                    }
                })
            } else {
                res.status(404).send("INVALID CREDENTIALS!!");
            }
        });
    });  
};

export const validToken = (req, res, next) => {
    const token = req.headers.token;
    let decoded;
    try {
        decoded = jwt.verify(token, "secret");
        const user_id = decoded.id;
        db.query(`\
            SELECT id
            FROM users
            WHERE users.id = '${user_id}'` , 
            (err, rows) => {
                if(err){
                    res.status(404).send("INVALID TOKEN!!");
                } else {
                        res.locals.user_id = user_id;
                        next();
                    }
        });
    } catch (e) {
        res.status(401).send('unauthorized');
    }
    
};  


export const profile = (req, res, next) => {

    const user_id = res.locals.user_id;
    console.log(username)

    db.query(`\
    SELECT users.username, profile.name, profile.email, profile.ph_no\
    FROM users\
    INNER JOIN profile ON users.id=profile.user_id\
    WHERE users.id = '${user_id}'` , 
    (err, rows) => {
        if(err){
            res.status(404).send("INVALID TOKEN!!");
        } else {
                res.status(200).send(rows[0]);
            }
        });
    };

// module.exports = {
//     register: register,
//     login: login,
//     profile: profile,
//     validToken: validToken
// }