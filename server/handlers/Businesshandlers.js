const fetch = require("isomorphic-fetch");
require("dotenv").config();

//coordinates for Toronto
const center = {
  lat: 43.653225,
  lng: -79.383186,
};

const radius = 7000;

const getNearbyRestaurants = async (req, res) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=${radius}&type=restaurant&keyword=cruise&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((jsonData) => {
      //console.log(jsonData);
      res.status(200).json({
        status: 200,
        message: "Nearby restaurants",
        data: jsonData.results,
      });
      //res.send(jsonData.results);
    });
};

const getNearbyCafes = async (req, res) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=${radius}&type=cafe&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((jsonData) => {
      //console.log(jsonData);
      res.send(jsonData.results);
    });
};

const getNearbyAttractions = async (req, res) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=${radius}&type=tourist_attraction&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((jsonData) => {
      //console.log(jsonData);
      res.send(jsonData.results);
    });
};

const getNearbyMuseums = async (req, res) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=${radius}&type=museum&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((jsonData) => {
      //console.log(jsonData);
      res.send(jsonData.results);
    });
};

const getNearbyNightClubs = async (req, res) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=${radius}&type=night_club&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((jsonData) => {
      //console.log(jsonData);
      res.send(jsonData.results);
    });
};

module.exports = {
  getNearbyRestaurants,
  getNearbyCafes,
  getNearbyAttractions,
  getNearbyMuseums,
  getNearbyNightClubs,
};
