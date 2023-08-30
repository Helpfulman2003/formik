import { Image } from "antd";
import React from "react";
import { WrapperSliderStyle } from "./style";

export default function SliderComponent({ arrImage }) {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000
  };
  return (
    <WrapperSliderStyle {...settings}>
        {
            arrImage?.map((image, index) => {
                return <Image key={index} src={image} alt='Slider' width='100%' preview={false} height='274px'/>
            })
        }
    </WrapperSliderStyle>
  )
}
