import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import Connection from './Database/db.js';
import Router from "./routes/route.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', Router)

const dbURL = process.env.DB_URL;
Connection(dbURL);

const PORT = 8000;
app.listen(PORT, () => console.log(`server is running successfully on PORT ${PORT}`))