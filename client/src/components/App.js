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
import UploadForm from "./Cloudinary/UploadForm";
import Album from "./Cloudinary/Album";

const App = () => {
  const [bacon, setBacon] = useState(null);

  // useEffect(() => {
  //   fetch("/getImages")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setBacon(data);
  //     });
  // }, []);

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
            <Map />
          </Route>
          <Route exact path="/upload">
            <UploadForm />
          </Route>
          <Route exact path="/album">
            <Album />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
};

const Wrapper = styled.div`
  background: var(--primary-color);
  height: 100%;
`;

export default App;
