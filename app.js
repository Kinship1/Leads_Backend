// const express = require("express");
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const connection = require("./database/connection.js");
// const authRoutes = require('./routes/auth');
// const leadsRoutes = require('./routes/leads');
import express from 'express';
import authRoutes from "./routes/auth.js";
import connection from "./database/connection.js";
import leadsRoutes from "./routes/leads.js";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

export const db = connection();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/leads', leadsRoutes);


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
