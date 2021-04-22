import React from "react";
import styled from "styled-components";

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
  padding-top: 20px;
`;

export default Input;
