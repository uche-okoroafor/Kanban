const { Schema, model } = require("mongoose");
const BasePlugin = require("./BasePlugin");
const { v2: cloudinary } = require("cloudinary");

const CardCoverPluginSchema = BasePlugin.discriminator("CardCoverPlugin", new Schema({
  imageUrl: {
    type: String,
    required: true
  },
  imagePublicId: {
    type: String,
    required: true
  }
}, { timestamps: true }));

CardCoverPluginSchema.methods.get = async function ({ params }) {
  if (!params) {
    const err = new Error("Not a valid request!");
    err.statusCode = 400;
    throw err;
  }
  const data = await this.model("CardCoverPlugin").findById(params.coverId);
  return {
    status: 200,
    data
  };
};

CardCoverPluginSchema.methods.create = async function ({ file, body }) {
  if (!file && !body) {
    const err = new Error("Invalid data!");
    err.statusCode = 400;
    throw err;
  }

  const cover = await cloudinary.uploader.upload(file.path, {
    folder: "kanban_cover_plugins",
    resource_type: "image"
  });

  if (!cover) {
    const err = new Error("File upload failed!");
    err.statusCode = 400;
    throw err;
  }
  const { secure_url, public_id } = cover;
  const { name, description, resourceId } = body;

  const data = await this.model("CardCoverPlugin").create({
    name,
    description,
    resourceId,
    imageUrl: secure_url,
    imagePublicId: public_id
  });

  return {
    status: 201,
    data
  };
};

CardCoverPluginSchema.methods.update = async function ({ file, body, params }) {

  if (!params) {
    const err = new Error("No cover id!");
    err.statusCode = 400;
    throw err;
  }
  const cover = await this.model("CardCoverPlugin").findById(params.coverId);

  if (!cover) {
    const err = new Error("No cover found!");
    err.statusCode = 400;
    throw err;
  }
  if (file) {
    await cloudinary.uploader.destroy(cover.imagePublicId);

    const newCover = await cloudinary.uploader.upload(file.path, {
      folder: "kanban_cover_plugins",
      resource_type: "image"
    });

    const { secure_url, public_id } = newCover;

    cover.imageUrl = secure_url;
    cover.imagePublicId = public_id;
  }

  cover.name = body.name;
  cover.description = body.description;
  cover.resourceId = body.resourceId;

  const data = await cover.save();

  return {
    status: 200,
    data
  };
};

CardCoverPluginSchema.methods.delete = async function ({ params }) {
  if (!params) {
    const err = new Error("No cover id!");
    err.statusCode = 400;
    throw err;
  }
  await this.model("CardCoverPlugin").findByIdAndDelete(params.coverId);

  return {
    status: 200,
    message: "card cover deleted successfully"
  };
};

module.exports = model("CardCoverPlugin", CardCoverPluginSchema);

