const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    bagColor: {
      type: String,
      required: true,
    },
    font: {
      type: String,
      required: true,
    },
    pattern: {
      type: String,
      required: true,
    },
    inspiration: {
      type: String,
      default: '',
    },
    keyFlavours: {
      type: [String],
      default: [],
    },
    user: {
      type: String,
      default: 'anonymous',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Bag', bagSchema);
