import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { BiRestaurant } from "react-icons/bi";
import MapStyles from "./MapStyles";
import Button from "../Button";
import Header from "../Header";

const libraries = ["places"];

const mapContainerStyle = {
  //dimensions of the map
  width: "98.72vw",
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
  const history = useHistory();

  const [selectedSpot, setSelectedSpot] = useState(null); //state for clicked marker

  const [restaurantList, setRestaurantList] = useState([]);
  useEffect(() => {
    //get restaurant data from BE
    fetch("/getRestaurants")
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        setRestaurantList(jsonData.data);
      });
  }, []);

  const [clubsList, setClubsList] = useState([]);
  useEffect(() => {
    fetch("/getNightClubs") //Clubs or bars
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        console.log("night clubs", jsonData);
        setClubsList(jsonData.data);
      });
  }, []);

  const [touristAttractions, setTouristAttractions] = useState([]);
  useEffect(() => {
    fetch("/getTouristAttractions")
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        console.log("tourist attractions :", jsonData);
        setTouristAttractions(jsonData.data);
      });
  }, []);

  const [museumsList, setMuseumsList] = useState([]);
  useEffect(() => {
    fetch("/getMuseums")
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        setMuseumsList(jsonData.data);
      });
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    history.push("/album");
  };

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
      <Header />
      <BtnWrapper>
        <Button handleSubmit={handleSubmit} text={"See Reviews"} />
      </BtnWrapper>

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
                  scaledSize: new window.google.maps.Size(26, 26),
                }}
              />
            );
          })}

        {clubsList &&
          clubsList.map((club, index) => {
            return (
              <Marker
                key={index}
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
                }}
              />
            );
          })}

        {/* {touristAttractions &&
          touristAttractions.map((site, index) => {
            return (
              <Marker
                key={index}
                position={{
                  lat: site.geometry.location.lat,
                  lng: site.geometry.location.lng,
                }}
                onClick={() => {
                  setTouristAttractions(site);
                }}
                icon={{
                  url: "/tourist.svg",
                  scaledSize: new window.google.maps.Size(27, 27),
                }}
              />
            );
          })} */}

        {museumsList &&
          museumsList.map((museum, index) => {
            return (
              <Marker
                key={index}
                color="blue"
                position={{
                  lat: museum.geometry.location.lat,
                  lng: museum.geometry.location.lng,
                }}
                onClick={() => {
                  setSelectedSpot(museum);
                }}
                icon={{
                  url: "/museum.svg",
                  scaledSize: new window.google.maps.Size(25, 25),
                }}
              />
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
              <h4>
                {selectedSpot.name} ({selectedSpot.types[0].split("_")})
              </h4>
              <img src={selectedSpot.icon} />
              <p>{selectedSpot.vicinity}</p>
              <p>Price level: {selectedSpot.price_level}/5</p>
              <p>Rating: {selectedSpot.rating}</p>
              {selectedSpot.opening_hours ? <p>Open Now</p> : <p>Closed :(</p>}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0;
  position: relative;
`;

const BtnWrapper = styled.div`
  position: absolute;
  z-index: 2;
  top: 3rem;
  right: 5rem;
`;

export default Map;
