const mongoose, { Schema } = require("mongoose")
const BasePlugin = require("./BasePlugin")

const CardCoverPlugin = BasePlugin.discriminator("CardCoverPlugin", new Schema({
  imageUrl: String,
  imagePublicId: String
}, {timestamps: true}))

module.exports = mongoose.model("CardCoverPlugin", CardCoverPlugin)
