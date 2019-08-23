import TTS from 'ibm-watson/text-to-speech/v1';
import fs from 'fs';
import path from 'path';

import { IBM_WATSON_TTS_API_KEY } from '../conf';

export class TextToSpeech {
  constructor() {
    this.client = new TTS({
      iam_apikey: IBM_WATSON_TTS_API_KEY,
      url: 'https://gateway-lon.watsonplatform.net/text-to-speech/api',
    });

    this._defaultParams = {
      accept: 'audio/mp3',
    };

    this.voices = [
      'de-DE_BirgitVoice',
      'de-DE_BirgitV3Voice',
      'de-DE_DieterVoice',
      'de-DE_DieterV3Voice',
      'en-GB_KateVoice',
      'en-GB_KateV3Voice',
      'en-US_AllisonVoice',
      'en-US_AllisonV3Voice',
      'en-US_LisaVoice',
      'en-US_LisaV3Voice',
      'en-US_MichaelVoice',
      'en-US_MichaelV3Voice',
      'es-ES_EnriqueVoice',
      'es-ES_EnriqueV3Voice',
      'es-ES_LauraVoice',
      'es-ES_LauraV3Voice',
      'es-LA_SofiaVoice',
      'es-LA_SofiaV3Voice',
      'es-US_SofiaVoice',
      'es-US_SofiaV3Voice',
      'fr-FR_ReneeVoice',
      'fr-FR_ReneeV3Voice',
      'it-IT_FrancescaVoice',
      'it-IT_FrancescaV3Voice',
      'pt-BR_IsabelaVoice',
      'pt-BR_IsabelaV3Voice',
    ];

    this.synthesize = this.synthesize.bind(this);
  }

  async synthesize({ fileName, text }) {
    return await new Promise((async (resolve, reject) => {
      const params = {
        // voice: this.getVoice(language),
        text,
        voice: this.getRandomVoice(),
        ...this._defaultParams,
      };

      console.log('Speaking with', params.voice);
      const filePath = path.resolve('.', 'public', `${fileName}.mp3`);
      const file = fs.createWriteStream(filePath);

      const response = await this.client.synthesize(params);
      response.pipe(file);
      response.on('end', () => resolve(response));
      response.on('error', reject);
    }));
  }

  getRandomVoice() {
    return this.voices[Math.floor(Math.random() * this.voices.length)];
  }
}
