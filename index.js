//index.js is the entry point
//imported express to start the server
const express = require("express");
const videosRouter = require("./routes/videos");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

app.use(cors());
//parsing request body for post request
app.use(express.json());
app.use("/videos/", videosRouter);
app.use(express.static(__dirname + process.env.IMAGE_PATH));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
