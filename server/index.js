"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

const { signup, login } = require("./handlers/Userhandlers");
const {
  getNearbyRestaurants,
  getNearbyCafes,
  getNearbyAttractions,
  getNearbyMuseums,
  getNearbyNightClubs,
} = require("./handlers/Businesshandlers");
const { postUserReviews } = require("./handlers/Formhandlers");
const { cloudinary } = require("./utils/cloudinary");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  //.use(bodyParser.json())
  .use(express.json({ limit: "50mb" }))
  .use(express.urlencoded({ limit: "50mb", extended: true }))
  .use("/", express.static(__dirname + "/"))

  //test endpoint
  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  //auth endpoints
  .post("/signup", signup)
  .post("/login", login)

  //business endpoints
  .get("/getRestaurants", getNearbyRestaurants)
  .get("/getCafes", getNearbyCafes)
  .get("/getTouristAttractions", getNearbyAttractions)
  .get("/getMuseums", getNearbyMuseums)
  .get("/getNightClubs", getNearbyNightClubs)

  //cloudinary
  //get images uploaded to cloudinary
  .get("/getImages", async (req, res) => {
    const { resources } = await cloudinary.search
      .expression("folder:dev_setups")
      .sort_by("public_id", "desc")
      .max_results(50)
      .execute();
    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
  })

  //upload images to cloudinary
  .post("/upload", async (req, res) => {
    try {
      const fileStr = req.body.data;
      //console.log("image string :", fileStr);
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "dev_setups",
      });
      console.log("upload response :", uploadedResponse);
      //res.json({ msg: "Upload Successful" });
      res.status(201).json({
        status: 201,
        message: "Successfully uploaded",
        public_id: uploadedResponse.public_id,
        url: uploadedResponse.url,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: "Something went wrong" });
    }
  })

  .post("/submitReview", postUserReviews)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
