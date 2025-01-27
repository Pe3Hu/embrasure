import React from "react";
import { Carousel } from "antd";
import { FOOTER_HEIGHT } from "../../config/constants";

const contentStyle = {
  padding: 20,
  height: "40px", //"100vh", //`calc(100vh - ${FOOTER_HEIGHT})`,
  width: "40px", //"100vh", //"00px",
  background: "#364d79",
};

export default function RoomCarousel() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <Carousel
      afterChange={onChange}
      dotPosition={"bottom"}
      autoplay
      dosts={true}
      pauseOnHover={true}
      pauseOnDotsHover={true}
      draggable
    >
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
}
