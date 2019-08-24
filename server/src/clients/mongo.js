import mongoose from 'mongoose';

import { MONGO_URI } from '../conf';

const connectMongo = () => new Promise((resolve, reject) => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  const db = mongoose.connection;

  db.on('error', (error) => {
    console.error('connection error');
    reject(error);
  });
  db.once('open', () => {
    console.log('[INFO] Connected to Mongo');
    resolve();
  });
});

export default connectMongo;
