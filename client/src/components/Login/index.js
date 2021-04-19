import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Input from "../SignUp/Input";
import ErrorMsg from "../ErrorMsg";

const LoginForm = () => {
  const [formData, setFormData] = useState({});
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
        console.log("from login: ", data); //has id - store it to local storage
        //set id - localstorage in  FE
        localStorage.setItem("user_id", data.id);
        //data will include the id of the user as well - use it to link to the right user in the db
        if (status === 201) {
          console.log("CONFIRMED", message);
          setSubStatus("confirmed");
          history.push("/");
        } else {
          console.log("ERROR", message);
          setSubStatus("error");
          setErrMessage(message);
        }
      });
  };

  return (
    <>
      <div>Login Form</div>
      <Input
        name="username"
        required="required"
        placeholder="username"
        type="text"
        handleChange={handleChange}
        value={formData.username}
      />
      <Input
        required="required"
        name="password"
        placeholder="Password"
        type="password"
        handleChange={handleChange}
        value={formData.password}
      />
      <button onClick={handleSubmit}>Submit</button>
      {subStatus === "error" && <ErrorMsg>{errMessage}</ErrorMsg>}
    </>
  );
};

export default LoginForm;
