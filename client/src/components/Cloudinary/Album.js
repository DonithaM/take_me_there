import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Button from "../Button";

const Album = () => {
  const history = useHistory();
  const [imageIds, setImageIds] = useState();
  const [reviewData, setReviewData] = useState();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log("hello");
    history.push("/upload");
  };

  const loadImages = async () => {
    try {
      const res = await fetch("/getImages");
      const data = await res.json();
      //console.log(data);
      setImageIds(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadReviews = () => {
    try {
      fetch("/getAllReviews")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setReviewData(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadImages();
    loadReviews();
  }, []);

  return (
    <Wrapper>
      <h2>Album of Reviews and Experiences</h2>
      <BtnWrapper>
        <Button handleSubmit={handleSubmit} text={"Create Review"} />
      </BtnWrapper>

      <Content>
        {imageIds &&
          imageIds.map((image, index) => {
            return (
              <Review key={index}>
                <Image
                  key={index}
                  cloudName="djxqiq1y3"
                  publicId={image}
                  width="320"
                  height="300"
                  crop="scale"
                />
                <div>
                  <h4>Reviews</h4>
                  {reviewData && <p>{reviewData[0].place_visited}</p>}
                </div>
              </Review>
            );
          })}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 180px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  /* justify-content: center;
  align-items: center; */
`;

const Review = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* 
  flex-wrap: wrap; */
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Album;
