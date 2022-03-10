//imported express because we have to define api
const express = require("express");
//to define express routes we have imported express router
const router = express.Router();
//importing uuid,followed npm.com
const { v4: uuidv4 } = require("uuid");
//import filesystem
const filesystem = require("fs");
//import dotenv
require("dotenv").config();
//reading json using filesystem
const videosFile = filesystem.readFileSync("./data/videos.json");
//parse file as json
const videosData = JSON.parse(videosFile);

router.get("/", (request, response) => {
  const mappedVideoData = videosData.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });

  response.status(200).send(mappedVideoData);
});

router.get("/:id", (request, response) => {
  const videoId = request.params.id;
  const videoData = videosData.find((video) => video.id == videoId);
  response.status(200).send(videoData);
});

router.post("/", (request, response) => {
  const requestBody = request.body;
  const newVideo = {
    id: uuidv4(),
    title: requestBody.title,
    channel: "BrainStation-WebDevs",
    image: "http://localhost:8080/images/Upload-video-preview.jpg",
    description: requestBody.description,
    views: "0",
    likes: "0",
    duration: "04:00",
    video: "",
    timestamp: new Date().getTime(),
    comments: [
      {
        id: uuidv4(),
        name: "Astha Vohra",
        comment: "Very nice course. Amazing Content",
        likes: 0,
        timestamp: new Date().getTime(),
      },
    ],
  };
  videosData.push(newVideo);
  filesystem.writeFile(
    "./data/videos.json",
    //the videosData is json object so used stringify to convert json to string
    JSON.stringify(videosData),
    (error) => {
      if (error) {
        response.status(500).send({ error: "Unable to upload video" });
      }
      response.status(200).send(newVideo);
    }
  );
});

router.post("/:id/comments", (request, response) => {
  const { id } = request.params;
  const video = videosData.find((video) => video.id === id);

  const videoComments = video.comments;
  const newComment = {
    id: uuidv4(),
    name: request.body.name,
    comment: request.body.comment,
    likes: 0,
    timestamp: new Date().getTime(),
  };
  videoComments.push(newComment);

  filesystem.writeFile(
    "./data/videos.json",
    JSON.stringify(videosData),
    (error) => {
      if (error) {
        response.status(500).send({ error: "Unable to upload video" });
      }
      response.status(200).send(newComment);
    }
  );
});
module.exports = router;
