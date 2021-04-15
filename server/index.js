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
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
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

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
