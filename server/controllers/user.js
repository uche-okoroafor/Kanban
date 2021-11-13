const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const pkg = require("cloudinary");
const { v2: cloudinary } = pkg;
const mongoose = require("mongoose");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: "i" },
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({ users: users });
});

exports.uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    throw new Error("No file provided!");
  }

  const user = await User.findById(mongoose.Types.ObjectId(req.user.id));

  if (!user) {
    res.status(404);
    throw new Error("No users found!");
  }

  if (user.imagePublicId !== "") {
    await cloudinary.uploader.destroy(user.imagePublicId);
  }

  const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
    folder: "kanban",
    resource_type: "auto",
  });

  const { secure_url, public_id } = uploadedImage;
  user.imageUrl = secure_url;
  user.imagePublicId = public_id;

  const savedUser = await user.save();

  res.status(200).json({
    success: {
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        imageUrl: savedUser.imageUrl,
      },
    },
  });
});
