import express, { Express, Request, Response } from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

mongoose.connect(dotenv.config().parsed?.MONGO_URI as string);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const app: Express = express();

app.use(cors({
    origin: ['http://localhost:3000']
  }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

import articleController from './controllers/articleController';
app.use('/article', articleController);

app.listen(3006,() => {
  console.log(`[server]: Server is running at http://localhost:3006`);
});