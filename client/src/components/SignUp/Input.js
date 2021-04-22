import React from "react";
import styled from "styled-components";

const InputStyles = {
  height: "30px",
  width: "220px",
  border: "none",
  background: "#f0f0f0",
  borderRadius: "5px",
  outline: "none",
  fontSize: "17px",
  paddingLeft: "10px",
};

const Input = ({
  refProp,
  required,
  name,
  placeholder,
  type,
  handleChange,
  value,
}) => {
  return (
    <Wrapper>
      {/* <label htmlFor={name}>{placeholder}</label> */}
      <input
        style={InputStyles}
        ref={refProp}
        required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(ev) => handleChange(ev.target.value, name)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 25px;
`;

export default Input;
