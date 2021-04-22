import React from "react";
import styled from "styled-components";
import { HiLocationMarker } from "react-icons/hi";

const Header = () => {
  return (
    <Wrapper>
      <Logo>
        <HiLocationMarker />
      </Logo>

      <Title>Take Me There</Title>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  height: 50px;
  background: #262626;
  border-bottom: 3px solid var(--dark-orange);
`;

const Logo = styled.div`
  color: var(--orange-shade);
  border-radius: 50%;
  font-size: 25px;
  margin: 10px;
`;

const Title = styled.p`
  color: var(--orange-shade);
  font-size: 20px;
  padding-top: 14px;
`;

export default Header;
