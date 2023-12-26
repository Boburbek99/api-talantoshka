import express from "express";
import cors from "cors"

import bodyParser from "body-parser"
import http from "http";

import {mongoConnect} from './services/mongoose.js';
mongoConnect();

import dotenv from "dotenv";
dotenv.config();
const app=express()

app.use(
    cors({
      origin: "*",
      methods: "*",
    })
  );
  
  app.use(bodyParser.json());
  import { initializeRoutes } from "./services/expressRoutes.js";
initializeRoutes(app);

  app.use(bodyParser.json());
  const server = http.createServer(app);

  const appPort = process.env.APP_PORT;
  server.listen(appPort, () => {
    console.log(`Example app listening on port ${appPort}`);
  });
