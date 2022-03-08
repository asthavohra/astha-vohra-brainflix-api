//imported express because we have to define api
const express = require("express");
//to define express routes we have imported express router
const router = express.Router();
//importing uuid,followed npm.com
const { v4: uuidv4 } = require("uuid");
//import filesystem
const filesystem = require("fs");
//reading json using filesystem
const videosFile = filesystem.readFileSync("./data/videos.json");
//parse file as json
const videosData = JSON.parse(videosFile);

router.get("/", (request, response) => {
  //console.log("taking the request");
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
  //console.log(request.params.id);
  //console.log(request.query);
  //response.status(200).send(`hello ${request.params.name}`);
  response.status(200).send(
    videoData
    //`hello${request.params.name}${request.query.lastname}${request.query.gender}`
  );
});

router.post("/upload", (request, response) => {
  console.log(request.body);
  const requestBody = request.body;
  const newVideo = {
    id: uuidv4(),
    title: requestBody.title,
    channel: "BrainStation-WebDevs",
    image: "",
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
        comment: "Very nice course",
        likes: 0,
        timestamp: new Date().getTime(),
      },
    ],
  };
  //requestBody.timestamp = new Date().getTime();
  //requestBody.description = "she is a dog";
  //requestBody.uuid = uuidv4();
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
module.exports = router;
