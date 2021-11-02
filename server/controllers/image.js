const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const cloud = require("../config/cloudinaryConfig");

exports.uploadImage = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;
  const imageObject = {
    imageName: req.files[0].originalname,
    imageUrl: req.files[0].path,
    imageId: "",
  };

  const imageNameExist = await User.find(
    {
      _id: userId,
      "userImage.imageName": imageObject.imageName,
    },
    (err, callback) => {
      if (err) {
        res.status(500);
        throw new Error(
          `There was a problem creating the image because: ${err.message}`
        );
      } else {
        const response = await cloud.uploads(imageObject.imageUrl);
        const imageDetails = {
          imageName: req.files[0].originalname,
          imageUrl: response.url,
          imageId: response.id,
        };

        const addImage = await User.updateOne(
          {
            _id: "617abe11dfebcf80244d35f5",
            // userId
          },
          {
            $set: {
              userImage: { imageDetails },
            },
          }
        );
        res.status(200).json(addImage);
      }
    }
  );
  console.log(imageNameExist);

  res.status(500);
  throw new Error("something went wrong");
});
