import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import styled from "styled-components";
// import { Image, CloudinaryContext, Transformation } from "cloudinary-react";

const Album = () => {
  const [imageIds, setImageIds] = useState();

  const loadImages = async () => {
    try {
      const res = await fetch("/getImages");
      const data = await res.json();
      console.log(data);
      setImageIds(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  //console.log(imageIds);

  return (
    <Wrapper>
      <h2>Album of Reviews and Experiences</h2>
      {imageIds &&
        imageIds.map((image, index) => {
          return (
            <Image
              key={index}
              cloudName="djxqiq1y3"
              publicId={image}
              width="300"
              crop="scale"
            />
          );

          //   <CloudinaryContext cloudName="djxqiq1y3">
          //     <Image publicId={image}>
          //       <Transformation width="200" crop="scale" angle="10" />
          //     </Image>
          //   </CloudinaryContext>;
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

export default Album;
