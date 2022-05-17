const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  _id: Number,
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

module.exports = Item = mongoose.model('item', ItemSchema);
