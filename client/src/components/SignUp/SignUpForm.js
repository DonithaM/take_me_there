import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Input from "./Input";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
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

    //email validation
    const emailParts = formData.email.split("@");
    console.log(emailParts);
    if (
      emailParts.length < 2 ||
      emailParts[0].length === 0 ||
      emailParts[1].length === 0 ||
      formData.email.includes(".com") === false
    ) {
      errorMsg.current.style.display = "block";
      errorMsg.current.innerHTML = "Not a valid email format";
      email.current.style.border = "2px solid red";
      email.current.focus();
    } //check if username is atleast 3 characters
    else if (formData.username.length < 3) {
      errorMsg.current.style.display = "block";
      errorMsg.current.innerHTML =
        "Please enter a username that is at least 3 characters long";
      email.current.style.border = "2px solid red";
      email.current.focus();
    } //check if password is atleast 5 characters long
    else if (formData.password.length < 5) {
      errorMsg.current.style.display = "block";
      errorMsg.current.innerHTML =
        "Please enter a password that is at least 5 characters long";
      email.current.style.border = "2px solid red";
      email.current.focus();
    } //check if password and confirm password fields match
    else if (formData.password !== formData.confirmPassword) {
      errorMsg.current.style.display = "block";
      errorMsg.current.innerHTML =
        "Your passwords didn't match! Please provide the same passwords in each field";
      confirmPassword.current.style.border = "2px solid red";
      confirmPassword.current.focus();
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
          } else if (status === 500) {
            console.log("ERROR", message);
          }
        });
    }
  };

  return (
    <>
      <form>
        <Input
          refProp={username}
          required="required"
          name="username"
          placeholder="Username"
          type="text"
          handleChange={handleChange}
          value={formData.username}
        />
        <Input
          refProp={email}
          required="required"
          name="email"
          placeholder="Email"
          type="text"
          handleChange={handleChange}
          value={formData.email}
        />
        <Input
          refProp={password}
          required="required"
          name="password"
          placeholder="Password"
          type="password"
          handleChange={handleChange}
          value={formData.password}
        />
        <Input
          refProp={confirmPassword}
          required="required"
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          handleChange={handleChange}
          value={formData.confirmPassword}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <div ref={errorMsg} id="error" name="error"></div>
    </>
  );
};

export default SignUpForm;
