import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Input from "./Input";
import Button from "../Button";
import Header from "../Header";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  //Submit button is disabled until all form fields are filled
  const [disabled, setDisabled] = useState(true);

  //Error box that displays a message
  const errorMsg = useRef(null);
  //Username, email, password and confirm password fields
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  useEffect(() => {
    //The useEffect is listening to state changes. If all input fields are filled, button is made active
    Object.values(formData).includes("")
      ? setDisabled(true)
      : setDisabled(false);
  }, [formData, setDisabled]);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const emailParts = formData.email.split("@");
    console.log(emailParts);
    //check if username is atleast 3 characters
    if (formData.username.length < 3) {
      errorMsg.current.style.display = "block";
      errorMsg.current.innerHTML =
        "Please enter a username that is at least 3 characters long";
      // username.current.style.border = "2px solid red";
      // username.current.focus();
    }
    //email validation
    else if (
      emailParts.length < 2 ||
      emailParts[0].length === 0 ||
      emailParts[1].length === 0 ||
      formData.email.includes(".com") === false
    ) {
      errorMsg.current.style.display = "block";
      errorMsg.current.innerHTML = "Please enter a valid email";
      // email.current.style.border = "2px solid red";
      // email.current.focus();
    }
    //check if password is atleast 5 characters long
    else if (formData.password.length < 5) {
      errorMsg.current.style.display = "block";
      errorMsg.current.innerHTML =
        "Please enter a password that is at least 5 characters long";
      // password.current.style.border = "2px solid red";
      // password.current.focus();
    } //check if password and confirm password fields match
    else if (formData.password !== formData.confirmPassword) {
      errorMsg.current.style.display = "block";
      errorMsg.current.innerHTML =
        "Your passwords didn't match! Please provide the same passwords in each field";
      // confirmPassword.current.style.border = "2px solid red";
      // confirmPassword.current.focus();
    } else {
      //fetch POST to signup endpoint if all fields are filled out correctly
      fetch("/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((jsonData) => {
          console.log(jsonData);
          const { status, message } = jsonData;
          if (status === 201) {
            console.log("CONFIRMED", message);
            history.push("/login");
          } else if (status === 500) {
            console.log("ERROR", message);
          }
        });
    }
  };

  return (
    <>
      <Header />

      <Wrapper>
        <Content>
          <H2>Sign Up</H2>
          <Form>
            <Input
              refProp={username}
              required="required"
              name="username"
              placeholder="Username"
              type="text"
              handleChange={handleChange}
              value={formData.username || ""}
            />
            <Input
              refProp={email}
              required="required"
              name="email"
              placeholder="Email"
              type="text"
              handleChange={handleChange}
              value={formData.email || ""}
            />
            <Input
              refProp={password}
              required="required"
              name="password"
              placeholder="Password"
              type="password"
              handleChange={handleChange}
              value={formData.password || ""}
            />
            <Input
              refProp={confirmPassword}
              required="required"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              handleChange={handleChange}
              value={formData.confirmPassword || ""}
            />
            <BtnWrapper>
              <Button handleSubmit={handleSubmit} text={"Submit"} />
            </BtnWrapper>
          </Form>
          <ErrDiv>
            <ErrorMsg ref={errorMsg} id="error" name="error"></ErrorMsg>
          </ErrDiv>
        </Content>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
  background-size: cover;
  background-position: center;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: white;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.h2`
  color: var(--text-orange);
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 50px;
  width: fit-content;
`;

const BtnWrapper = styled.div`
  padding-top: 18px;
`;

const ErrorMsg = styled.div`
  color: var(--text-orange);
  font-size: 17px;
`;

const ErrDiv = styled.div`
  width: 230px;
  padding-bottom: 30px;
`;

export default SignUpForm;
