const mongoose = require("mongoose");
const Schema = mongoose.Schema;

imageSchema = new Schema({
  imageName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  cloudImageId: {
    type: String,
  },
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
