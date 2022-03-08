const express = require("express");
const app = express();

app.get("/videos", (request, response) => {
  console.log("getting request");
  response.send("Hello world");
});
