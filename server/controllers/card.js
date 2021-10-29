const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

exports.createCard = asyncHandler(async (req, res, next) => {
  const { cardTitle, tagColor, userId, columnId, boardId } = req.body;

  if (!columnId || !userId || !boardId) {
    res.status(400);
    throw new Error(
      `${!boardId ? "boardId" : ""} ${!columnId ? "columnId" : ""}  ${
        !userId ? "userId" : ""
      } is undefined`
    );
  }
  try {
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
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
