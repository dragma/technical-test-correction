import mongoose from 'mongoose';

const Turn = mongoose.model('Turn', {
  created_at: { type: Date, required: true, default: Date.now },
  audio_file: String,
  voice: String,
  sentence: String,
  note: Number,
  game: { type: mongoose.Types.ObjectId, ref: 'Game', index: true },
});

export default Turn;
