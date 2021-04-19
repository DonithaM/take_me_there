import React, { useState } from "react";
import styled from "styled-components";

const UploadForm = () => {
  const [formData, setFormData] = useState({});
  const [fileInput, setFileInput] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState();

  //   const handleChange = (value, name) => {
  //     setFormData({ ...formData, [name]: value });
  //   };

  const handleChange = (value) => {
    setFormData({ ...formData });
  };

  console.log(formData);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileInput(e.target.value);
    previewFile(file);
  };

  //function that shows user a preview of uploaded image //?
  const previewFile = (file) => {
    const reader = new FileReader(); //FileReader -a built-in JS API
    reader.readAsDataURL(file); //converts image to a string
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    //FileReader -a built-in JS API to read file contenst
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile); //converts image to a string
    reader.onloadend = () => {
      //triggered after reading is done
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("error");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      await fetch("/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      setFileInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <Wrapper>
        <H1>Create Your Review</H1>

        <Form onSubmit={handleSubmitFile}>
          <Div>
            <Label htmlFor="place_visited">Name of Place Visited :</Label>
            <input
              name="place_visited"
              type="text"
              placeholder="Enter name of place"
              required
              onChange={(ev) => handleChange(ev.target.value)}
              value={formData.place_visited}
            />
          </Div>

          <Div>
            <Label htmlFor="experience">Share your experience :</Label>
            <TextArea
              placeholder=""
              name="experience"
              onChange={(ev) => handleChange(ev.target.value)}
              value={formData.experience}
            />
          </Div>

          <h3>Upload Image</h3>
          <Input
            type="file"
            name="image"
            onChange={(e) => handleFileInput(e)}
            value={fileInput} //?formData
          />

          {previewSource && (
            <img
              src={previewSource}
              alt="chosen-image"
              style={{ height: "300px" }}
            />
          )}
          <SubmitDiv>
            <button type="submit">Submit Review</button>
            {/* Show success message on submit */}
          </SubmitDiv>
        </Form>

        <div>
          <p>Reviews and Images shared by Members</p>
          {/* button clicked - takes to Album page - for now, app.js route*/}
          <button>View Album</button>
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
  color: var(--tertiary-color);
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
