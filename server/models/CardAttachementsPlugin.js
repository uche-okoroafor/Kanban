const { Schema, model } = require("mongoose");
const BasePlugin = require("./BasePlugin");
const { v2: cloudinary } = require("cloudinary");

const CardAttachementsSchema = new Schema({
  imageUrl: {
    type: String,
    required: true
  },
  imagePublicId: {
    type: String,
    required: true
  }
}, { timestamps: true });

const CardAttachementsPluginSchema = BasePlugin.discriminator("CardAttachementsPlugin", new Schema({
  attachements: [{
    type: Schema.Types.ObjectId,
    ref: "CardAttachements"
  }]
}, { timestamps: true }));

CardAttachementsPluginSchema.methods.get = async function ({ params }) {
  if (!params) {
    const err = new Error("Not a valid request!");
    err.statusCode = 400;
    throw err;
  }
  const { cardAttachementsPluginId } = params
  const data = await this.model("CardAttachementsPlugin").findById(cardAttachementsPluginId).populate("attachements");
  return {
    status: 200,
    data
  };
};

CardAttachementsPluginSchema.methods.create = async function ({ files, body }) {
  if (!files && !body) {
    const err = new Error("Invalid data!");
    err.statusCode = 400;
    throw err;
  }
  const imagePaths = files.map(file => file.path);

  for (const imagePath of imagePaths) {
    const attachement = await cloudinary.uploader.upload(imagePath.path, {
      folder: "kanban_attachements_plugin",
      resource_type: "image"
    });
    const { secure_url, public_id } = attachement;

    const cardAttachement = await CardAttachements.create({
      imageUrl: secure_url,
      imagePublicId: public_id
    });

    this.attachements.push(cardAttachement);

  }
  const { name, description, resouceId } = body;
  const data = await this.model("CardAttachementsPlugin").create({
    name,
    description,
    resouceId
  });

  return {
    status: 201,
    data
  };
};

CardAttachementsPluginSchema.methods.update = async function ({ files, body, params }) {
  if (!params) {
    const err = new Error("Invalid request!");
    err.statusCode = 400;
    throw err;
  }
  const { cardAttachementsPluginId } = params
  const cardAttachementPlugin = await this.model("CardAttachementsPlugin").findById(cardAttachementsPluginId);
  if (files) {
    const imagePaths = files.map(file => file.path);

    for (const imagePath of imagePaths) {
      const attachement = await cloudinary.uploader.upload(imagePath.path, {
        folder: "kanban_attachements_plugin",
        resource_type: "image"
      });
      const { secure_url, public_id } = attachement;

      const cardAttachement = await CardAttachements.create({
        imageUrl: secure_url,
        imagePublicId: public_id
      });

      this.attachements.push(cardAttachement);
    }
  }
  const { name, description, resourceId } = body;

  cardAttachementPlugin.name = name;
  cardAttachementPlugin.description = description;
  cardAttachementPlugin.resourceId = resourceId;

  const data = await cardAttachementPlugin.save();

  return {
    status: 200,
    data
  };

};

CardAttachementsPluginSchema.methods.delete = async function ({ params }) {
  if (!params) {
    const err = new Error("Invalid request!");
    err.statusCode = 400;
    throw err;
  }
  const { cardAttachementsPluginId } = params
  const cardAttachementPlugin = await this.model("CardAttachementsPlugin").findById(cardAttachementsPluginId);

  const attachedImages = cardAttachementPlugin.attachements;

  attachedImages.forEach(id => {
    const image = await CardAttachements.findById(id);
    await cloudinary.uploader.destroy(image.imagePublicId);
  });

  await this.model("CardAttachementsPlugin").findByIdAndDelete(cardAttachementsPluginId);

  return {
    status: 200,
    message: "attachement deleted successfully"
  };
};

const CardAttachements = model("CardAttachements", CardAttachementsSchema);
const CardAttachementsPlugin = model("CardAttachementsPlugin", CardAttachementsPluginSchema);

module.exports = { CardAttachementsPlugin, CardAttachements };