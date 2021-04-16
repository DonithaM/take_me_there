const fetch = require("isomorphic-fetch");
require("dotenv").config();

//coordinates for Toronto
const center = {
  lat: 43.653225,
  lng: -79.383186,
};

const radius = 7000;

const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

const getNearbyRestaurants = async (req, res) => {
  const response = await fetch(
    `${baseUrl}?location=${center.lat},${center.lng}&radius=${radius}&type=restaurant&keyword=cruise&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    // const response2 = fetch(
    //   `${baseUrl}?`
    // )
    // Promise.all([])
    .then((res) => {
      return res.json();
    })
    .then((jsonData) => {
      res.status(200).json({
        status: 200,
        message: "Nearby restaurants",
        data: jsonData.results,
      });
    });
  // console.log(response.results[0].photos);
  // const photoInfo = await fetch(
  //   `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  // ).then((res) => {
  //   // console.log("data**", res[Symbol(Response internals)]);
  //   // console.log("data**", res.headers.get("content-type"));
  //   res.headers.forEach((header) => console.log(header));
  // });
  // console.log(photoInfo);
  // .then((jsonData) => {
  // res.status(200).json({
  //   status: 200,
  //   message: "Nearby restaurants",
  //   data: jsonData.results,
  // });
  // });
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
      res.status(200).json({
        status: 200,
        message: "Nearby Night Clubs",
        data: jsonData.results,
      });
    });
};

module.exports = {
  getNearbyRestaurants,
  getNearbyCafes,
  getNearbyAttractions,
  getNearbyMuseums,
  getNearbyNightClubs,
};
