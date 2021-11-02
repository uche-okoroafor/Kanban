const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const cloud = require("../config/cloudinaryConfig");

exports.uploadImage = async (req, res, next) => {
  const { userId } = req.body;
  const imageObject = {
    imageName: req.files[0].originalname,
    imageUrl: req.files[0].path,
    imageId: "",
  };

  User.find(
    { _id: userId, "userImage.imageName": imageObject.imageName },
    (err, callback) => {
      if (err) {
        res.status(400).json({
          err: err,
          message: `There was a problem creating the image because: ${err.message}`,
        });
      } else {
        cloud.uploads(imageObject.imageUrl).then((response) => {
          const imageDetails = {
            imageName: req.files[0].originalname,
            imageUrl: response.url,
            imageId: response.id,
          };

          User.updateOne(
            {
              _id: userId,
            },
            {
              $set: {
                userImage: imageDetails,
              },
            }
          )
            .then((uploadStatus) => {
              res.status(200).json({
                success: true,
                data: { uploadStatus, imageDetails },
              });
            })
            .catch((error) => {
              res.status(500).json({
                success: false,
                message: `Error creating image in the database: ${error.message}`,
              });
            });
        });
      }
    }
  );
};
