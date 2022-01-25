const { Schema, model } = require("mongoose");

const Bootcamp = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name to the bootcamp"],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, "Please provide a rating to the bootcamp"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description to the bootcamp"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price to the bootcamp"],
  },
  mainId: {
    type: Number,
    required: [true, "Please provide a mainId to the bootcamp"],
  },
});



module.exports = model('Bootcamp',Bootcamp);
