import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GlobalStyles from "../GlobalStyles";
import Header from "./Header";
import HomePage from "./HomePage";

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
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
};

const Wrapper = styled.div``;

export default App;
