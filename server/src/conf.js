import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

export const { IBM_WATSON_TTS_API_KEY, IBM_WATSON_STT_API_KEY, APP_PORT } = result.parsed;
