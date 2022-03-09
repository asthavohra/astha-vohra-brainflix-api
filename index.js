//index.js is the entry point
//imported express to start the server
const express = require("express");
const videosRouter = require("./routes/videos");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
//parsing request body for post request
app.use(express.json());
app.use("/videos/", videosRouter);
app.use(express.static(__dirname + "/public"));
console.log(__dirname);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
