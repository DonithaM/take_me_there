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

// const options = {
//   styles: MapStyles,
// };

const Map = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null); //state for clicked marker

  useEffect(() => {
    fetch("/getRestaurants")
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        setRestaurantList(jsonData.data);
      });

    // fetch("/getNightClubs") //Clubs or bars
    // .then((res) => {
    //   return res.json();
    // })
    // .then((jsonData) => {
    //   console.log(jsonData);
    // });

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
        zoom={14}
        center={center}
        // options={options}
      >
        {console.log(restaurantList)}
        {restaurantList.map((restaurant) => {
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
                  scaledSize: new window.google.maps.Size(24, 24),
                  color: "black",
                }}
              />
            </>
          );
        })}
        <Marker position={{ lat: center.lat, lng: center.lng }} />

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

// import React from "react";
// import { Legend, DataLabel, MapsTooltip } from "@syncfusion/ej2-maps";
// import styled from "styled-components";
// //import { countries_data } from "../assets/data";
// import { canada_data } from "../assets/canada";

// import {
//   MapsComponent,
//   LayerDirective,
//   LayersDirective,
//   MarkerDirective,
//   MarkersDirective,
//   Inject,
//   Marker,
//   Zoom,
// } from "@syncfusion/ej2-react-maps";

// const Map = () => {
//   return (
//     <Wrapper>
//       <MapsComponent
//         zoomSettings={{
//           enable: true,
//           horizontalAlignment: "Near",
//           shouldZoomInitially: true,
//         }}
//       >
//         <Inject services={[DataLabel, Legend, MapsTooltip, Marker, Zoom]} />
//         <LayersDirective>
//           <LayerDirective shapeData={canada_data}>
//             <MarkersDirective>
//               <MarkerDirective
//                 shape={"Circle"}
//                 visible={true}
//                 shapeValuePath={"shape"}
//                 colorValuePath={"color"}
//                 // template='<div id="marker1">Toronto</div>'
//                 dataSource={[
//                   {
//                     latitude: 43.65107,
//                     longitude: -79.347015,
//                     name: "Toronto, ON",
//                     color: "red",
//                     // shape: "Triangle",
//                   },
//                 ]}
//               ></MarkerDirective>

//               <MarkerDirective
//                 visible={true}
//                 height={30}
//                 width={30}
//                 template='<div id="marker1">Montreal</div>'
//                 dataSource={[{ latitude: 45.5017, longitude: -45.5017 }]}
//               ></MarkerDirective>
//             </MarkersDirective>
//           </LayerDirective>
//         </LayersDirective>
//       </MapsComponent>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.div``;
