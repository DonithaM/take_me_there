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

  // const loadImages = async () => {
  //   try {
  //     const res = await fetch("/getImages");
  //     const data = await res.json();
  //     //console.log(data);
  //     setImageIds(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
    //loadImages();
    loadReviews();
  }, []);

  console.log(reviewData);

  return (
    <Wrapper>
      <H2>Album of Reviews and Experiences</H2>
      <BtnWrapper>
        <Button handleSubmit={handleSubmit} text={"Create Review"} />
      </BtnWrapper>

      <Content>
        {/* {imageIds &&
          imageIds.map((image, index) => {
            return (
              <Review key={index}>
                <ImageTag
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
          })} */}

        {reviewData &&
          reviewData.map((item, index) => {
            const dateStr = item.timeStamp.slice(0, 10);
            const timeStr = item.timeStamp.slice(11, 19);
            return (
              <Review key={index}>
                <Img src={item.photoUrl} />
                <h2>Reviews</h2>
                <p>Name of place/event : {item.place_visited}</p>
                <p>Experience: {item.experience}</p>
                <p>
                  Date posted: {dateStr}, at {timeStr}
                </p>
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

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  padding: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Review = styled.div`
  margin-top: 30px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: 350px;
  height: 300px;
  border-radius: 8%;
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
`;

export default Album;
