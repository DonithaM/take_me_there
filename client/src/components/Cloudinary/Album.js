import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../Header";
import Loading from "../Loading";
import Button from "../Button";

const Album = () => {
  const history = useHistory();
  const [imageIds, setImageIds] = useState();
  const [reviewData, setReviewData] = useState();

  const handleSubmit = (ev) => {
    ev.preventDefault();
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
          //console.log(data.data);
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

  //console.log(reviewData);

  return (
    <>
      <Header />
      <Wrapper>
        <H1>Album of Reviews and Experiences</H1>
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

          {reviewData ? (
            reviewData.map((item, index) => {
              const dateStr = item.timeStamp.slice(0, 10);
              const yearStr = item.timeStamp.slice(11, 19);
              return (
                <Review key={index}>
                  <ImgWrapper>
                    <Img src={item.photoUrl} />
                  </ImgWrapper>

                  <H2>Reviews</H2>

                  <Event>Name of place/event : {item.place_visited}</Event>
                  <Event>Experience: {item.experience}</Event>
                  <Event>
                    Date posted: {dateStr}, {yearStr}
                  </Event>
                  <Event>Posted by: {item.username}</Event>
                </Review>
              );
            })
          ) : (
            <Loading />
          )}
        </Content>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding-top: 25px;
  padding-bottom: 180px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url("https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=653&q=80");
  background-size: cover;
`;

const H1 = styled.h1`
  display: flex;
  justify-content: center;
  padding: 10px;
  color: var(--text-orange);
`;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  padding: 10px;
  color: var(--text-orange);
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Review = styled.div`
  margin-top: 30px;
`;

const Event = styled.p`
  display: flex;
  justify-content: center;
  padding: 3px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: 350px;
  height: 300px;
  border-radius: 8%;
`;

const ImgWrapper = styled.div`
  padding: 12px 10px 9px 10px;
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.6);
  border-radius: 8%;
`;

export default Album;
