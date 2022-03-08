const express = require("express");
const app = express();

const SERVER_PORT = 8080;

app.listen(SERVER_PORT, () => {
  console.log(`Listening for incoming request on port ${SERVER_PORT}`);
});

app.get("/videos", (request, response) => {
  console.log("getting request");
  response.send("Hello world");
});
