import STT from 'ibm-watson/speech-to-text/v1';
import fs from 'fs';
import path from 'path';

import { IBM_WATSON_STT_API_KEY } from '../conf';

export class SpeechToText {
  constructor() {
    this.client = new STT({
      iam_apikey: IBM_WATSON_STT_API_KEY,
      url: 'https://gateway-lon.watsonplatform.net/speech-to-text/api',
      headers: {
        'X-Watson-Learning-Opt-Out': 'true',
      },
    });

    this._defaultParams = {
      content_type: 'audio/mp3',
      model: 'fr-FR_NarrowbandModel',
      word_confidence: true,
    };

    this.recognize = this.recognize.bind(this);
  }

  async recognize({ fileName }) {
    const filePath = path.resolve('.', 'public', `${fileName}.mp3`);
    const params = {
      audio: fs.createReadStream(filePath),
      ...this._defaultParams,
    };

    return this.client.recognize(params)
      .then(({ results }) => {
        const [{ alternatives }] = results || [];
        const [{ transcript }] = alternatives || [{ transcript: '' }];
        return transcript;
      });
  }
}
