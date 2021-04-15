import React, { useEffect } from "react";
import styled from "styled-components";
import Markers from "./Markers";

const Business = () => {
  //coordinates of Toronto
  const center = {
    lat: 43.653225,
    lng: -79.383186,
  };

  useEffect(() => {
    fetch("/getRestaurants")
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
      });

    fetch("/getNightClubs") //Clubs or bars
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
      });
  }, []);

  return <div>Hello</div>;
};

export default Business;
