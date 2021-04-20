import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    history.push("/map");
  };
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
          <Button onClick={handleSubmit}>TAKE ME THERE</Button>
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
  filter: blur(3px);
  -webkit-filter: blur(2px);
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
  color: var(--orange-shade);
`;

const H1 = styled.h1`
  padding: 10px 0;
`;

const Button = styled.button`
  width: auto;
  margin-top: 30px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  color: white;
  font-weight: bold;
  background: var(--orange-shade);
  background: linear-gradient(
    180deg,
    rgba(251, 155, 31, 1) 20%,
    rgba(255, 186, 8, 1) 73%
  );
  cursor: pointer;
  -webkit-box-shadow: 0px -1px 14px 6px rgba(252, 163, 17, 0.56);
  box-shadow: 0px -1px 14px 6px rgba(252, 163, 17, 0.56);
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default HomePage;
