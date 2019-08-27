import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import ip from 'ip';

import { APP_PORT } from './conf';

import play from './services/play';
import getSound from './services/getSound';

import connectMongo from './clients/mongo';

// ensure public directory exists
const publicPath = path.resolve(__dirname, '..', 'public');
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true }); // recusive flag only avialable since node 10.12
}

const App = express();

// Body Parser setup
App.use(bodyParser.urlencoded({
  extended: true,
}));
App.use(bodyParser.json());

// Cookie Parser setup
App.use(cookieParser());

// Morgan setup
App.use(morgan('dev'));

// CORS setup
App.use(cors());

App.get('/play', play);
App.get('/sound', getSound);

App.get('/ping', (req, res) => res.send('pong'));

connectMongo()
  .then(() => App.listen(APP_PORT, () => {
    console.log(`[INFO] Server is listening on port ${APP_PORT}!`);
    console.log(`[INFO] IP on local network id : ${ip.address()}`);
  }))
  .catch((err) => {
    throw err;
  });
