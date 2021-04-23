import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../Header";
import Button from "../Button";

const UploadForm = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    id: localStorage.getItem("user_id"),
    //add username in local storage for it to show up in the reviews.
  });
  //images
  const [fileInput, setFileInput] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [success, setSuccess] = useState("null");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    history.push("/album");
  };

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const handleFileInput = (ev) => {
    const file = ev.target.files[0];
    setSelectedFile(file);
    setFileInput(ev.target.value);
    previewFile(file);
  };

  //function that shows user a preview of uploaded image
  const previewFile = (file) => {
    const reader = new FileReader(); //FileReader -a built-in JS API
    reader.readAsDataURL(file); //converts image to a string
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleImageUpload = (ev) => {
    ev.preventDefault();
    if (!selectedFile) return;
    //FileReader -a built-in JS API to read file contenst
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile); //converts image to a string
    // console.log("photo url", reader.readAsDataURL(selectedFile));
    reader.onloadend = () => {
      //triggered after reading is done
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("error");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    //console.log(base64EncodedImage);
    try {
      await fetch("/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("from inside fetch of Upload", data);
          console.log("data url", data.url);
          setFormData({ ...formData, photoUrl: data.url });
          setSuccess("uploaded");
        });
      setFileInput("");
    } catch (error) {
      console.log(error);
    }
  };

  //handleReview - fetch post with all form data to BE
  const handleReviewSubmit = (ev) => {
    ev.preventDefault();
    try {
      fetch("/submitReview", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          timeStamp: new Date().toDateString(),
        }),
        // body: JSON.stringify({ ...formData, timeStamp: new Date() }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((jsonData) => {
          console.log(jsonData);
          setSuccess("submitted");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Main>
        <Wrapper>
          <H1>Create Your Review</H1>
          <Form onSubmit={handleImageUpload}>
            <Div>
              <Label htmlFor="place_visited">Name of Place Visited :</Label>
              <input
                style={InputStyles}
                name="place_visited"
                type="text"
                placeholder="Enter name of place"
                required
                onChange={(ev) => handleChange(ev)}
                value={formData.place_visited || ""}
              />
            </Div>

            <Div>
              <Label htmlFor="experience">Share your experience :</Label>
              <TextArea
                // style={InputStyles}
                placeholder=""
                name="experience"
                onChange={(ev) => handleChange(ev)}
                value={formData.experience || ""}
              />
            </Div>

            <h3>Upload Image</h3>
            <Input
              type="file"
              name="photoUrl"
              onChange={(ev) => handleFileInput(ev)}
              value={fileInput || ""}
            />

            {previewSource && (
              <img
                src={previewSource}
                alt="chosen-image"
                style={{ height: "300px" }}
              />
            )}
            <SubmitDiv>
              <button type="submit">Upload Image</button>
              {/* Show success message on submit */}
              {success === "uploaded" ? (
                <SuccessMsg>"Uploaded Successfully"</SuccessMsg>
              ) : (
                <></>
              )}
            </SubmitDiv>
          </Form>

          <SubmitDiv>
            <BtnWrapper>
              <Button
                handleSubmit={handleReviewSubmit}
                text={"Submit Review"}
              />
            </BtnWrapper>

            {success === "submitted" ? (
              <SuccessMsg>"Review submitted Successfully!"</SuccessMsg>
            ) : (
              <></>
            )}
          </SubmitDiv>

          <SeeReview>
            <p>See Reviews and Images shared by Members</p>
            <BtnWrapper>
              <Button handleSubmit={handleSubmit} text={"View Album"} />
            </BtnWrapper>
          </SeeReview>
        </Wrapper>
      </Main>
    </>
  );
};

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

const Main = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 160px;
  padding-top: 40px;
  height: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  border-radius: 15px;
  background: white;
  padding: 30px 40px 40px 40px;
`;

const H1 = styled.h1`
  color: var(--text-orange);
`;

const Form = styled.form`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Div = styled.div`
  margin-bottom: 10px;
  vertical-align: middle;
`;

const TextArea = styled.textarea`
  width: 220px;
  border: none;
  background: #f0f0f0;
  border-radius: 5px;
  outline: none;
  font-size: 17px;
  padding-left: 10px;
`;

const Input = styled.input`
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 25%;
`;

const SubmitDiv = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SuccessMsg = styled.div`
  margin-top: 10px;
  color: green;
`;
const SeeReview = styled.div`
  margin-top: 10px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default UploadForm;
