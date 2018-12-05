const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pixieSchema = new Schema({
  rows: Number,
  columns: Number,
  colors: [[String]]
});

module.exports = mongoose.model('Pixie', pixieSchema);
