const router = require("express").Router();
const errorRoutes = require("./middleware/errorRoute");
const imageRoutes = require("./routes/image");

router
  .get("/server", (req, res) => {
    res.send("Server seems to be working");
  })
  .use("/images", imageRoutes)
  .use(errorRoutes);

module.exports = router;
