import {
  CarouselProvider,
  Slider,
  // ImageWithZoom,
  Image,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  //   Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

const SDotGroup = styled(DotGroup)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  display: flex;
  gap: 3px;
`;

const navButtonStyle = css`
  background-color: hsla(0, 0%, 100%, 0.5);
  border: 0;
  border-radius: 50%;
  display: block;
  height: 44px;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.3s;
  width: 44px;
`;

export const SButtonBack = styled(ButtonBack)`
  ${navButtonStyle}
  left: 5px;
`;
export const SButtonNext = styled(ButtonNext)`
  ${navButtonStyle}
  right: 5px;
`;
const ProductSlider = ({ imgSrcArray }) => {
  return (
    <CarouselProvider
      naturalSlideWidth={3}
      naturalSlideHeight={2}
      totalSlides={imgSrcArray.length}
      infinite={false}
    >
      <Slider>
        {imgSrcArray.map((imgSrc, index) => (
          <Slide index={index} key={index}>
            <Image style={{ objectFit: "contain" }} src={imgSrc} />
          </Slide>
        ))}
      </Slider>
      <SDotGroup dotNumbers />
      <SButtonBack>
        <ArrowBackIos />
      </SButtonBack>
      <SButtonNext>
        <ArrowForwardIos />
      </SButtonNext>
    </CarouselProvider>
  );
};

export default ProductSlider;
