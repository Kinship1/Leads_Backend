import express from 'express';
import {register, login, profile, validToken} from "../controllers/user.controller.js"

const router = express.Router();
// const {register, login, profile, validToken}  = require("../controllers/user.controller");

router.post('/register', register, (err)=>{
    console.log(err);
});

router.post('/login', login, (err)=>{
    console.log(err);
});

router.post('/profile', validToken, profile, (err)=>{
    console.log(err);
});


// module.exports = router;
export default router;