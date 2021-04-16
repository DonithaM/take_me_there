import React from "react";
import styled from "styled-components";

const HomePage = () => {
  return (
    <>
      <Wrapper></Wrapper>
      <Content>
        <H1>Toronto's Top Hangout Spots</H1>
        <p>
          Explore top restaurants, cafes, bars, movies and tourist attractions
          in Toronto's most popular spots
        </p>
        <BtnWrapper>
          <Button>TAKE ME THERE</Button>
        </BtnWrapper>
      </Content>
    </>
  );
};

const Wrapper = styled.div`
  background-image: url("https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
  height: 100vh;
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  -webkit-filter: blur(2px);
`;

const Content = styled.div`
  /* display: flex;
  justify-content: center;
   */

  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: #ffcc00;
`;

const H1 = styled.h1`
  padding: 10px 0;
`;

const Button = styled.button`
  width: 200px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default HomePage;
