//import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { BiRestaurant } from "react-icons/bi";
import MapStyles from "./MapStyles";

const libraries = ["places"];

const mapContainerStyle = {
  //dimensions of the map
  width: "98vw",
  height: "95vh",
  screenLeft: 10,
};
const center = {
  lat: 43.653225,
  lng: -79.383186,
};

const options = {
  styles: MapStyles,
};

const Map = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [clubsList, setClubsList] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null); //state for clicked marker

  useEffect(() => {
    fetch("/getRestaurants")
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        setRestaurantList(jsonData.data);
      });

    fetch("/getNightClubs") //Clubs or bars
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        console.log("night clubs", jsonData);
        setClubsList(jsonData.data);
      });

    //fetch others
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error Loading maps";
  if (!isLoaded) {
    return "Loading Maps";
  }

  return (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
      >
        {console.log(restaurantList)}
        {restaurantList &&
          restaurantList.map((restaurant) => {
            return (
              <>
                <Marker
                  key={restaurant.place_id}
                  position={{
                    lat: restaurant.geometry.location.lat,
                    lng: restaurant.geometry.location.lng,
                  }}
                  onClick={() => {
                    setSelectedSpot(restaurant);
                  }}
                  icon={{
                    url: "/restaurant.svg",
                    scaledSize: new window.google.maps.Size(25, 25),
                    color: "black",
                  }}
                />
              </>
            );
          })}

        {clubsList &&
          clubsList.map((club) => {
            return (
              <>
                <Marker
                  key={club.place_id}
                  position={{
                    lat: club.geometry.location.lat,
                    lng: club.geometry.location.lng,
                  }}
                  onClick={() => {
                    setSelectedSpot(club);
                  }}
                  icon={{
                    url: "/night_club.svg",
                    scaledSize: new window.google.maps.Size(24, 24),
                    color: "black",
                  }}
                />
              </>
            );
          })}
        <Marker
          position={{ lat: center.lat, lng: center.lng }}
          key={center.lat}
        />

        {selectedSpot && (
          <InfoWindow
            position={{
              lat: selectedSpot.geometry.location.lat,
              lng: selectedSpot.geometry.location.lng,
            }}
            onCloseClick={() => {
              setSelectedSpot(null);
            }}
          >
            <div>
              <h4>{selectedSpot.name}</h4>
              <img src={selectedSpot.icon} />
              <p>Price level: {selectedSpot.price_level}/5</p>
              <p>Rating: {selectedSpot.rating}</p>
              {selectedSpot.opening_hours ? <p>Open Now</p> : <p>Closed :(</p>}
              <p></p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0;
`;

export default Map;
