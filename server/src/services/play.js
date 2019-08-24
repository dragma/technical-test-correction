import { TextToSpeech } from '../clients/TextToSpeech';
import { SpeechToText } from '../clients/SpeechToText';

import { MISSING_PARAMETERS } from '../utils/httpErrors';

export default (req, res, next) => {
  const { text } = req.query;

  if (!text) {
    return next(MISSING_PARAMETERS);
  }

  const TTS = new TextToSpeech();
  const STT = new SpeechToText();

  const params = { fileName: 'test', text };
  return TTS.synthesize(params)
    .then(async () => await STT.recognize(params))
    .then(result => res.send(result));
};
