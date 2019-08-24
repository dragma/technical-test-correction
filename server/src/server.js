import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import { APP_PORT } from './conf';

import play from './services/play';
import connectMongo from './clients/mongo';

// ensure public directory exists
const publicPath = path.resolve('.', 'public');
const dirname = path.dirname(publicPath);
if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname, { recursive: true }); // recusive flag only avialable since node 10.12
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

App.use('/', (req, res) => res.send('hello world'));

connectMongo()
  .then(() => App.listen(APP_PORT, () => {
    console.log(`[INFO] Server is listening on port ${APP_PORT}!`);
  }))
  .catch((err) => {
    throw err;
  });
