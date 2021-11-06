const User = require("../models/User");
const Image = require("../models/Image");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const cloud = require("../config/cloudinaryConfig");

exports.uploadImage = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const imageObject = {
    imageName: req.files[0].originalname,
    imageUrl: req.files[0].path,
  };

  const uploadStatus = await cloud.uploads(imageObject.imageUrl);
  const imageDetails = {
    imageName: req.files[0].originalname,
    imageUrl: uploadStatus.url,
    cloudImageId: uploadStatus.id,
  };
  const newImage = await Image.create(imageDetails);
  const updateStatus = await User.updateOne(
    {
      _id: userId,
    },
    {
      $set: {
        userImage: newImage,
      },
    }
  );
  await unlinkFile(req.files[0].path);
  if (updateStatus.nModified === 1) {
    return res.status(200).json({
      success: true,
      data: { newImage },
    });
  }

  res.status(500);
  throw new Error("something went wrong");
});
