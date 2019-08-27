import { MISSING_PARAMETERS } from '../utils/httpErrors';
import Turn from '../models/turn';

export default async (req, res, next) => {
  const { turnId } = req.query;
  if (!turnId) {
    next(MISSING_PARAMETERS);
  }

  const turn = await Turn.findById(turnId);

  return res.sendFile(turn.audio_file);
};
