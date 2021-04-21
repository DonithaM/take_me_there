import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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
        body: JSON.stringify({ ...formData, timeStamp: new Date() }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((jsonData) => {
          console.log(jsonData);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <Wrapper>
        <H1>Create Your Review</H1>
        <Form onSubmit={handleImageUpload}>
          <Div>
            <Label htmlFor="place_visited">Name of Place Visited :</Label>
            <input
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
            // value={formData.photoUrl || ""}
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
          </SubmitDiv>
        </Form>

        <button onClick={handleReviewSubmit}>Submit Review</button>
        {/* onclick - post review - endpoint-req.body should contain formData */}

        <div>
          <p>Reviews and Images shared by Members</p>
          {/* button clicked - takes to Album page - for now, app.js route*/}
          <button onClick={handleSubmit}>View Album</button>
        </div>
      </Wrapper>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 150px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  border-radius: 15px;
  background: var(--secondary-color);
  margin-top: 60px;
  padding: 40px;
`;

const H1 = styled.h1`
  color: var(--orange-shade);
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
`;

const TextArea = styled.textarea`
  width: 165px;
`;

const Input = styled.input`
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 25%;
`;

const SubmitDiv = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;
export default UploadForm;
