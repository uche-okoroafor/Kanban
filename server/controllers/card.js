const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const cloud = require("../config/cloudinaryConfig");
const ObjectID = require("mongodb").ObjectID;

exports.createCard = asyncHandler(async (req, res, next) => {
  const { cardTitle, tagColor, userId, columnId, boardId } = req.body;

  const card = await User.updateOne(
    { _id: userId, "boards.columns._id": columnId },
    {
      $push: {
        "boards.$[board].columns.$[column].cards": {
          _id: new ObjectID(),
          cardTitle: cardTitle,
          tagColor: tagColor,
        },
      },
    },
    {
      arrayFilters: [{ "board._id": boardId }, { "column._id": columnId }],
    }
  );

  res.status(200).json(card);
  res.status(500);
  throw new Error("Something went wrong");
});

exports.updateCardItems = asyncHandler(async (req, res, next) => {
  const { userId, cardItem, value, cardId, columnId, boardId } = req.body;

  const targetItem = `boards.$[board].columns.$[column].cards.$[card].${cardItem}`;

  const updateStatus = await User.updateOne(
    { _id: userId, "boards.columns.cards._id": cardId },
    {
      $set: {
        [targetItem]: value,
      },
    },
    {
      arrayFilters: [
        { "board._id": boardId },
        { "column._id": columnId },
        { "card._id": cardId },
      ],
    }
  );

  res.status(200).json(updateStatus);

  res.status(500);
  throw new Error("Something went wrong");
});

exports.removeCardItems = asyncHandler(async (req, res, next) => {
  const { cardItem, userId, cardId } = req.body;

  const getDocumentIndex = (document) => {
    for (const boardIndex in document[0].boards) {
      for (const columnIndex in document[0].boards[boardIndex].columns) {
        for (const cardIndex in document[0].boards[boardIndex].columns[
          columnIndex
        ].cards) {
          const documentCardId =
            document[0].boards[boardIndex].columns[columnIndex].cards[cardIndex]
              ._id;

          if (documentCardId === cardId) {
            return {
              boardIndex,
              columnIndex,
              cardIndex,
            };
          }
        }
      }
    }
  };

  const document = await User.find({
    _id: userId,
    "boards.columns.cards._id": cardId,
  });
  const { boardIndex, columnIndex, cardIndex } = getDocumentIndex(document);

  const targetItem = `boards.${boardIndex}.columns.${columnIndex}.cards.${cardIndex}.${cardItem}`;

  const removeStatus = await User.updateOne(
    { _id: userId, "boards.columns.cards._id": cardId },
    {
      $unset: { [targetItem]: "" },
    }
  );

  res.status(200).json(removeStatus);

  res.status(500);
  throw new Error("Something went wrong");
});

exports.createChecklist = asyncHandler(async (req, res, next) => {
  const { checklistItem, cardId, columnId, boardId, userId } = req.body;
  const createStatus = await User.updateOne(
    { _id: userId, "boards.columns.cards._id": cardId },
    {
      $push: {
        "boards.$[board].columns.$[column].cards.$[card].checklists": {
          [checklistItem]: false,
          _id: new ObjectID(),
        },
      },
    },
    {
      arrayFilters: [
        { "board._id": boardId },
        { "column._id": columnId },
        { "card._id": cardId },
      ],
    }
  );
  res.status(200).json(createStatus);

  res.status(500);
  throw new Error("Something went wrong");
});

exports.updateChecklist = asyncHandler(async (req, res, next) => {
  const {
    checklistItem,
    isChecked,
    cardId,
    columnId,
    boardId,
    checklistId,
    userId,
  } = req.body;

  const targetItem = `boards.$[board].columns.$[column].cards.$[card].checklists.$[checklist].${checklistItem}`;
  const updateStatus = await User.updateOne(
    {
      _id: userId,
      "boards.columns.cards.checklists._id": checklistId,
    },
    {
      $set: {
        [targetItem]: isChecked,
      },
    },
    {
      arrayFilters: [
        { "board._id": boardId },
        { "column._id": columnId },
        { "card._id": cardId },
        { "checklist._id": checklistId },
      ],
    }
  );
  res.status(200).json(updateStatus);

  res.status(500);
  throw new Error("Something went wrong");
});

exports.removeChecklist = asyncHandler(async (req, res, next) => {
  const { cardId, columnId, boardId, checklistId, userId } = req.body;

  const targetItem =
    "boards.$[board].columns.$[column].cards.$[card].checklists";
  const removeStatus = await User.updateOne(
    {
      _id: userId,
      "boards.columns.cards.checklists._id": checklistId,
    },

    {
      $pull: {
        [targetItem]: { checklistId: checklistId },
      },
    },
    {
      arrayFilters: [
        { "board._id": boardId },
        { "column._id": columnId },
        { "card._id": cardId },
      ],
    }
  );
  res.status(200).json(removeStatus);

  res.status(500);
  throw new Error("Something went wrong");
});

exports.addAttachment = (req, res, next) => {};
// exports.addAttachment = asyncHandler(async (req, res, next) => {
// //IMPORT CLOUDINARY CONFIG
//    const imageDetails = {
//       imageName: req.files[0].originalname
//     }
//     //USING MONGODB QUERY METHOD TO FIND IF IMAGE-NAME EXIST IN THE DB
//     imageModel.find({ imageName: imageDetails.imageName }, (err, callback) => {
//       //CHECKING IF ERROR OCCURRED.
//       if (err) {
//         res.json({
//           err: err,
//           message: `There was a problem creating the image because: ${err.message}`
//         })
//       } else {
//         let attempt = {
//           imageName: req.files[0].originalname,
//           imageUrl: req.files[0].path,
//           imageId: ''
//         }
//         cloud.uploads(attempt.imageUrl).then(result => {
//           let imageDetails = {
//             imageName: req.files[0].originalname,
//             imageUrl: result.url,
//             imageId: result.id,
//             clientId: req.body.clientId,
//             clientUsername: req.body.clientUsername
//           }
//           // Create image in the database
//           imageModel
//             .create(imageDetails)
//             .then(image => {
//               res.json({
//                 success: true,
//                 data: image
//               })
//             })
//             .catch(error => {
//               res.json({
//                 success: false,
//                 message: `Error creating image in the database: ${error.message}`
//               })
//             })
//         })
//       }
//     })
// )
