const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectID = require('mongodb').ObjectID

imageSchema = new Schema({
  imageName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
