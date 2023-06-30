const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const newoneschema = new Schema({
    name:String,
    image:String
  });

  const NEWONE = mongoose.model('newone', newoneschema);

  module.exports = NEWONE;