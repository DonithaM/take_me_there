import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GlobalStyles from "../GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";
import SignUpForm from "./SignUp";
import LoginForm from "./Login";
//import MapComponent from "./Map";
import Map from "./Map";
import Business from "./Map/Business";

const App = () => {
  const [bacon, setBacon] = useState(null);

  //   useEffect(() => {
  //     fetch("/bacon")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBacon(data);
  //       });
  //   }, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/signup">
            <SignUpForm />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/map">
            {/* <div styled={{ width: "100vw", height: "100vh" }}>
              <WrappedMap
                async
                defer
                googleMapURL={`"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}"`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div> */}
            <Map />
          </Route>
          <Route exact path="/business">
            <Business />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
};

const Wrapper = styled.div``;

export default App;
