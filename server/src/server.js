import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// process env configuration
dotenv.config();

const APP_PORT = 3000;

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

App.use('/', (req, res) => res.send('hello world'));

App.listen(APP_PORT, () => {
  console.log(`Server is listening on port ${APP_PORT}!`);
});
