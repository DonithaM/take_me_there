import React from "react";
import styled from "styled-components";
import { HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Wrapper>
      <Div>
        <Logo>
          <HiLocationMarker />
        </Logo>
        <Title>Take Me There</Title>
      </Div>
      <NavItems>
        <Link to="/signup">
          <NavBtn>Sign up</NavBtn>
        </Link>
        <Link to="/login">
          <NavBtn>Login</NavBtn>
        </Link>
      </NavItems>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  height: 50px;
  background: #1f1f1f;
  border-bottom: 2.5px solid var(--dark-orange);
`;

const NavBtn = styled.button`
  color: var(--orange-shade);
  font-size: 17px;
  padding-top: 14px;
  background: #1f1f1f;
  border: none;
  cursor: pointer;
  padding-right: 30px;
  outline: none;
`;

const Div = styled.div`
  display: flex;
`;

const NavItems = styled.div``;

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
