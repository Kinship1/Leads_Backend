import express from 'express';
import { validToken }  from "../controllers/user.controller.js";
import  { add, show } from"../controllers/leads.controller.js";

const router = express.Router();
router.post('/add', validToken, add, (err)=>{
    console.log(err);
});

router.get('/show', validToken, show, (err)=>{
    console.log(err);
});


// module.exports = router;
export default router;