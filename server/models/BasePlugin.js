const { Schema, model, Model } = require("mongoose");

const BasePluginSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true, collection: "plugins", discriminatorKey: "type" }
);

/**
 * Attaches a plugin to the card.
 * @method
 * @param {typeof Model} Model
 * @param {string} pluginName
 * @returns
 */
BasePluginSchema.methods.attach = async (Model, pluginName) => {
  const cardId = this.resourceId;
  const plugin = this.model.find({ name: pluginName });
  if (!plugin) {
    return {
      status: 400,
      data: "Plugin does not exist.",
    };
  }
  return await Model.findByIdAndUpdate(cardId, {
    $push: { plugins: plugin._id },
  });
};

/**
 * Dettaches a plugin from the card.
 * @method
 * @param {typeof Model} Model
 * @param {string} pluginId
 * @returns
 */
BasePluginSchema.methods.detach = async (Model, pluginId) => {
  const cardId = this.resourceId;
  return await Model.findByIdAndUpdate(cardId, {
    $pull: { plugins: pluginId },
  });
};

const BasePlugin = model("BasePlugin", BasePluginSchema);

module.exports = BasePlugin;
