import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Button from "./Button";
import Header from "./Header";

const HomePage = () => {
  const history = useHistory();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    history.push("/map");
  };
  return (
    <>
      <Header />
      <Wrapper></Wrapper>
      <Content>
        <H1>Toronto's Top Hangout Spots</H1>
        <P>
          Explore top restaurants, cafes, bars, movies and tourist attractions
          in Toronto's most popular spots
        </P>
        <BtnWrapper>
          <Button handleSubmit={handleSubmit} text={"TAKE ME THERE"} />
        </BtnWrapper>
      </Content>
    </>
  );
};

const Wrapper = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
  height: 92vh;
  background-size: cover;
  background-position: center;
  filter: blur(1px);
  -webkit-filter: blur(1px);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  //color: var(--orange-shade);
`;

const H1 = styled.h1`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  color: #fff;
  text-shadow: 2px 2px 9px rgba(206, 89, 55, 0.85);
  font-size: 40px;
`;

const P = styled.p`
  color: #fff;
  text-shadow: 2px 2px 9px rgba(206, 89, 55, 0.85);
`;

const BtnWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;

export default HomePage;
