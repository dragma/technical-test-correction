import { TextToSpeech } from '../clients/TextToSpeech';
import { SpeechToText } from '../clients/SpeechToText';

export default (req, res) => {
  const { text } = req.query;

  if (!text) {
    res.send('KO');
  }

  const TTS = new TextToSpeech();
  const STT = new SpeechToText();

  const params = { fileName: 'test', text };
  TTS.synthesize(params)
    .then(async () => await STT.recognize(params))
    .then(result => res.send(result));
};
