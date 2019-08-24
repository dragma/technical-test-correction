import mongoose from 'mongoose';

const Game = mongoose.model('Game', {
  created_at: { type: Date, required: true, default: Date.now },
  turns: [{ type: mongoose.Types.ObjectId, ref: 'Turn' }],
  final_note: Number,
  sentence: String,
  final_sentence: String,
});

export default Game;
