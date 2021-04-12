// //import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";

// const libraries = ["places"];
// const mapContainerStyle = {
//   width: "100vw",
//   height: "100vh",
// };
// const center = {
//   lat: 43.653225,
//   lng: -79.383186,
// };

// const Map = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries,
//   });

//   if (loadError) return "Error Loading maps";
//   if (!isLoaded) {
//     return "Maps is loading";
//   }

//   return (
//     <div>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={8}
//         center={center}
//       ></GoogleMap>
//     </div>
//   );
// };
import React from "react";
import { Legend, DataLabel, MapsTooltip } from "@syncfusion/ej2-maps";
import styled from "styled-components";
import { countries_data } from "../assets/data";
import { canada_data } from "../assets/canada";

import {
  MapsComponent,
  LayerDirective,
  LayersDirective,
  MarkerDirective,
  MarkersDirective,
  Inject,
  Marker,
  Zoom,
} from "@syncfusion/ej2-react-maps";

const Map = () => {
  return (
    <Wrapper>
      <MapsComponent
        zoomSettings={{
          enable: true,
          horizontalAlignment: "Near",
          shouldZoomInitially: true,
        }}
      >
        <Inject services={[DataLabel, Legend, MapsTooltip, Marker, Zoom]} />
        <LayersDirective>
          <LayerDirective shapeData={canada_data}>
            <MarkersDirective>
              <MarkerDirective
                shape={"Circle"}
                visible={true}
                shapeValuePath={"shape"}
                colorValuePath={"color"}
                // template='<div id="marker1">Toronto</div>'
                dataSource={[
                  {
                    latitude: 43.65107,
                    longitude: -79.347015,
                    name: "Toronto, ON",
                    color: "red",
                    // shape: "Triangle",
                  },
                ]}
              ></MarkerDirective>

              <MarkerDirective
                visible={true}
                height={30}
                width={30}
                template='<div id="marker1">Montreal</div>'
                dataSource={[{ latitude: 45.5017, longitude: -45.5017 }]}
              ></MarkerDirective>
            </MarkersDirective>
          </LayerDirective>
        </LayersDirective>
      </MapsComponent>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Map;
