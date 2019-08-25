import fs from 'fs';
import path from 'path';

import slug from 'slug';
import levenshtien from 'damerau-levenshtein';

import { TextToSpeech } from '../clients/TextToSpeech';
import { SpeechToText } from '../clients/SpeechToText';

import { MISSING_PARAMETERS } from '../utils/httpErrors';

import Game from '../models/game';
import Turn from '../models/turn';

const playTurn = async ({
  game, text, TTS, STT, nbTurn,
}) => {
  console.log('playing turn', nbTurn);
  const fileName = `${game._id.toString()}/${nbTurn}-${slug(text)}`;

  const params = { fileName, text };
  console.log('phrase :', params.text);

  let voice = '';
  return TTS.synthesize(params)
    .then((result) => { ({ voice } = result); })
    .then(async () => await STT.recognize(params))
    .then(async (result) => {
      const turn = await Turn.create({
        game: game._id.toString(),
        audio_file: path.resolve(__dirname, '..', '..', 'public', `${fileName}.mp3`),
        sentence: result,
        voice,
        note: levenshtien(text, result).similarity,
      });
      await game.updateOne({ $push: { turns: turn._id } });
      return turn;
    });
};

const playGame = async ({
  turns, game, STT, TTS, prevTurn = null, nbTurns = 0,
}) => {
  const turnParams = { game, TTS, STT };
  if (nbTurns < turns) {
    const turn = await playTurn({
      text: (prevTurn && prevTurn.sentence) || game.sentence,
      nbTurn: nbTurns + 1,
      ...turnParams,
    });
    return await playGame({
      turns,
      game,
      STT,
      TTS,
      prevTurn: turn,
      nbTurns: nbTurns + 1,
    });
  }

  const finalNote = await Turn.find({
    game: game._id,
  }).then(results => results.reduce((acc, turn) => acc * turn.note, 1));

  await game.updateOne({
    final_sentence: prevTurn.sentence,
    final_note: finalNote,
  });
  return await Game.findById(game._id).populate('turns');
};

export default async (req, res, next) => {
  const { text, turns = 1 } = req.query;

  if (!text) {
    return next(MISSING_PARAMETERS);
  }

  const game = await Game.create({ sentence: text });

  fs.mkdirSync(path.resolve(__dirname, '..', '..', 'public', game._id.toString()));

  const TTS = new TextToSpeech();
  const STT = new SpeechToText();

  const result = await playGame({
    turns,
    game,
    STT,
    TTS,
  });

  return res.send(result);
};
