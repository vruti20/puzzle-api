const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const puzzleschema = new Schema({
    categorie: { type: Schema.Types.ObjectId, ref: 'newone' },
    image:String,
    ans:String
  });

  const PUZZLE = mongoose.model('puzzle', puzzleschema);

  module.exports = PUZZLE;