//index.js is the entry point
//imported express to start the server
const express = require("express");
const videosRouter = require("./routes/videos");

const app = express();
const port = 8080;
app.use(express.json());
app.use("/videos/", videosRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
