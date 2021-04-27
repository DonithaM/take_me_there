import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Input from "../SignUp/Input";
import ErrorMsg from "../ErrorMsg";
import Header from "../Header";
import Button from "../Button";

const LoginForm = () => {
  const [formData, setFormData] = useState({}); //user info
  const [subStatus, setSubStatus] = useState("idle");
  const [errMessage, setErrMessage] = useState("");
  const history = useHistory();

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    setErrMessage("");
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSubStatus("pending");

    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((jsonData) => {
        const { data, status, message } = jsonData;
        //console.log("from login: ", data); //has id - store it to local storage
        //set id - localstorage in  FE
        if (data) {
          localStorage.setItem("user_id", data.id);
          localStorage.setItem("username", data.username);
        }

        //data will include the id of the user as well - use it to link to the right user in the db
        if (status === 201) {
          //console.log("CONFIRMED", message);
          setSubStatus("confirmed");
          history.push("/");
        } else {
          //console.log("ERROR", message);
          setSubStatus("error");
          setErrMessage("Please enter the right credentials to log in");
        }
      });
  };

  const handleLogOut = (ev) => {
    localStorage.setItem("user_id", "");
    localStorage.setItem("username", "");
    history.push("/");
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Content>
          <Title>Login</Title>
          <Form>
            <Input
              name="username"
              required="required"
              placeholder="username"
              type="text"
              handleChange={handleChange}
              value={formData.username || ""}
            />
            <Input
              required="required"
              name="password"
              placeholder="Password"
              type="password"
              handleChange={handleChange}
              value={formData.password || ""}
            />
            {/* <button onClick={handleSubmit}>Submit</button> */}
            <BtnWrapper>
              <Button handleSubmit={handleSubmit} text={"Log In"} />
              <Button handleSubmit={handleLogOut} text={"Log Out"} />
            </BtnWrapper>
          </Form>

          {subStatus === "error" && <ErrorMsg>{errMessage}</ErrorMsg>}
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
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  color: var(--text-orange);
  display: flex;
  justify-content: center;
  margin-top: 15px;
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
  margin-top: 10px;
`;

export default LoginForm;
