import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}


export const IBM_WATSON_TTS_API_KEY = result.parsed.IBM_WATSON_TTS_API_KEY || '';
export const IBM_WATSON_STT_API_KEY = result.parsed.IBM_WATSON_STT_API_KEY || '';
export const APP_PORT = result.parsed.APP_PORT || 3000;

export const DB_NAME = result.parsed.DB_NAME || 'technical-test';
export const MONGO_HOST = result.parsed.MONGO_HOST || 'mongodb://localhost';
export const MONGO_URI = `${MONGO_HOST}/${DB_NAME}`;
