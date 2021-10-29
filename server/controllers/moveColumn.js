const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.moveColumn = asyncHandler(async (req, res, next) => {
  const { userId, columnId, boardId, targetPosition, columnObject } = req.body;

  if (!userId || !columnId || !boardId) {
    res.status(400);
    throw new Error(
      `${!boardId ? "boardId" : ""}  ${!columnId ? "columnId" : ""}  ${
        !userId ? "userId" : ""
      }  is undefined`
    );
  }

  try {
    const removeCard = await User.updateOne(
      {
        _id: userId,
        "boards.columns.columnId": columnId,
      },

      {
        $pull: {
          "boards.$[board].columns": { columnId: columnId },
        },
      },
      {
        arrayFilters: [{ "board.boardId": boardId }],
      }
    ).catch((error) => {
      res.status(500).json({ error: "Something went wrong" });
    });

    if (removeCard.nModified === 1) {
      const moveStatus = await User.updateOne(
        { _id: userId, "boards.boardId": boardId },
        {
          $push: {
            "boards.$[board].columns": {
              $each: [columnObject],
              $position: targetPosition,
            },
          },
        },
        {
          arrayFilters: [{ "board.boardId": boardId }],
        }
      ).catch((error) => {
        res.status(500).json({ error: "Something went wrong" });
      });
      res.status(200).json(moveStatus);
    } else {
      res.status(400);
      throw new Error("card not moved");
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
