const mongoose = require("mongoose");
const BasePlugin = require("./BasePlugin");

const checklistItemSchema = new mongoose.Schema({
  checklistItem: {
    type: String,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});

const ChecklistPluginSchema = BasePlugin.discriminator(
  "ChecklistPlugin",
  new mongoose.Schema(
    {
      checklist: [checklistItemSchema],
    },
    { timestamps: true }
  )
);

ChecklistPluginSchema.methods.get = async ({ params }) => {
  const { checklistItemId } = params;
  if (!checklistItemId) {
    return {
      status: 400,
      message: "checklistItemId is not defined",
    };
  }
  const data = await this.model("ChecklistPlugin").findById(checklistItemId);
  if (data) {
    return { status: 200, data };
  }
  return { response: 500, message: "something went wrong" };
};

ChecklistPluginSchema.methods.create = async ({ body }) => {
  const { checklistItem } = body;
  if (!checklistItemId) {
    return {
      status: 400,
      message: "checklistItemId is not defined",
    };
  }

  const data = await mongoose.model("ChecklistPlugin").create({
    checklistItem,
    isChecked: false,
  });
  if (data) {
    return {
      status: 200,
      data,
    };
  }
  return { response: 500, message: "something went wrong" };
};

ChecklistPluginSchema.methods.update = async ({ body }) => {
  const { checklistItem, checklistItemId, isChecked } = body;
  if (!checklistItemId || !isChecked || !checklistItem) {
    return {
      status: 400,
      message: "required params is not defined",
    };
  }

  const data = await mongoose
    .model("ChecklistPlugin")
    .findByIdAndUpdate(
      { _id: checklistItemId },
      { $set: { checklistItem: checklistItem, isChecked: isChecked } }
    );
  if (data) {
    return {
      status: 200,
      data,
    };
  }
  return { response: 500, message: "something went wrong" };
};

ChecklistPluginSchema.methods.patch = async ({ body }) => {
  const { checklistItemId, isChecked } = body;
  if (!checklistItemId || !isChecked) {
    return {
      response: 400,
      message: "required params is not defined",
    };
  }

  const data = await mongoose
    .model("ChecklistPlugin")
    .findByIdAndUpdate(
      { _id: checklistItemId },
      { $set: { isChecked: isChecked } }
    );
  if (data) {
    return {
      status: 200,
      data,
    };
  }
  return { response: 500, message: "something went wrong" };
};

ChecklistPluginSchema.methods.delete = async ({ body }) => {
  const { checklistItemId } = body;
  if (!checklistItemId) {
    return {
      response: 400,
      message: "checklistItemId is not defined",
    };
  }

  const data = await mongoose
    .model("ChecklistPlugin")
    .findByIdAndUpdate(
      { _id: checklistItemId },
      { $pull: { isChecked: isChecked } }
    );
  if (data) {
    return {
      status: 200,
      data,
    };
  }
  return { response: 500, message: "something went wrong" };
};
