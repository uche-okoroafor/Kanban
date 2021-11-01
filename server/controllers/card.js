const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const cloud = require("../config/cloudinaryConfig");

exports.createCard = asyncHandler(async (req, res, next) => {
  const { cardTitle, tagColor, userId, columnId, boardId } = req.body;

  const card = await User.updateOne(
    { _id: userId, "boards.columns.columnId": columnId },
    {
      $push: {
        "boards.$[board].columns.$[column].cards": {
          cardId: uuidv4(),
          cardTitle: cardTitle,
          tagColor: tagColor,
        },
      },
    },
    {
      arrayFilters: [
        { "board.boardId": boardId },
        { "column.columnId": columnId },
      ],
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
    { _id: userId, "boards.columns.cards.cardId": cardId },
    {
      $set: {
        [targetItem]: value,
      },
    },
    {
      arrayFilters: [
        { "board.boardId": boardId },
        { "column.columnId": columnId },
        { "card.cardId": cardId },
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
              .cardId;

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
    "boards.columns.cards.cardId": cardId,
  });
  const { boardIndex, columnIndex, cardIndex } = getDocumentIndex(document);

  const targetItem = `boards.${boardIndex}.columns.${columnIndex}.cards.${cardIndex}.${cardItem}`;

  const removeStatus = await User.updateOne(
    { _id: userId, "boards.columns.cards.cardId": cardId },
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
    { _id: userId, "boards.columns.cards.cardId": cardId },
    {
      $push: {
        "boards.$[board].columns.$[column].cards.$[card].checklists": {
          [checklistItem]: false,
          checklistId: uuidv4(),
        },
      },
    },
    {
      arrayFilters: [
        { "board.boardId": boardId },
        { "column.columnId": columnId },
        { "card.cardId": cardId },
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
      "boards.columns.cards.checklists.checklistId": checklistId,
    },
    {
      $set: {
        [targetItem]: isChecked,
      },
    },
    {
      arrayFilters: [
        { "board.boardId": boardId },
        { "column.columnId": columnId },
        { "card.cardId": cardId },
        { "checklist.checklistId": checklistId },
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
      "boards.columns.cards.checklists.checklistId": checklistId,
    },

    {
      $pull: {
        [targetItem]: { checklistId: checklistId },
      },
    },
    {
      arrayFilters: [
        { "board.boardId": boardId },
        { "column.columnId": columnId },
        { "card.cardId": cardId },
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
