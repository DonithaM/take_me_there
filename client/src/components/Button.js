import React from "react";
import styled from "styled-components";

const Button = ({ text, handleSubmit }) => {
  return <Btn onClick={(ev) => handleSubmit(ev)}>{text}</Btn>;
};

const Btn = styled.button`
  padding: 12px;
  width: auto;
  border-radius: 8px;
  border: none;
  font-size: 17px;
  background: var(--orange-shade);
  background: linear-gradient(
    180deg,
    rgba(244, 140, 6, 1) 34%,
    rgba(255, 172, 18, 1) 73%
  );
  -webkit-box-shadow: 0px -1px 14px 6px rgba(252, 163, 17, 0.3);
  box-shadow: 0px -1px 14px 6px rgba(252, 163, 17, 0.3);
  color: #fff;
  font-weight: bold;
  margin: 10px;
  outline: none;
  cursor: pointer;
`;

export default Button;
