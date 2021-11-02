const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const cloud = require("../config/cloudinaryConfig");
const ObjectID = require("mongodb").ObjectID;

exports.uploadImage = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const imageObject = {
    imageName: req.files[0].originalname,
    imageUrl: req.files[0].path,
  };

  const uploadStatus = await cloud.uploads(imageObject.imageUrl);
  const imageDetails = {
    imageName: req.files[0].originalname,
    imageUrl: uploadStatus.url,
    id: new ObjectID(),
  };
  await unlinkFile(req.files[0].path);
  const updateStatus = await User.updateOne(
    {
      _id: userId,
    },
    {
      $set: {
        userImage: imageDetails,
      },
    }
  );
  res.status(200).json({
    success: true,
    data: { updateStatus, imageDetails },
  });
});
