import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { mobile } from "../../responsive";
import { NiceButtonBack, NiceButtonNext } from "../../Reusables/StyledParts";
import Slide0 from "./Slide0";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
const Container = styled.div`
  position: relative;
`;
const navButtonStyle = css`
  background-color: hsla(0, 0%, 100%, 0.5);
  border: 0;
  border-radius: 50%;
  display: block;
  width: 44px;
  height: 44px;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.3s;
  ${mobile({ width: "30px", height: "30px" })}
`;

export const SButtonBack = styled(ButtonBack)`
  ${navButtonStyle}
  left: 5px;
`;
export const SButtonNext = styled(ButtonNext)`
  ${navButtonStyle}
  right: 5px;
`;
const SDotGroup = styled(DotGroup)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  display: flex;
  gap: 3px;
`;

const MainSlider = () => {
  return (
    <Container>
      <CarouselProvider
        naturalSlideWidth={window.innerWidth > 600 ? 16 : 8}
        naturalSlideHeight={window.innerWidth > 600 ? 8 : 12}
        totalSlides={4}
        infinite={true}
        // isPlaying={true}
      >
        <Slider>
          <Slide0 />
          <Slide1 />
          <Slide2 />
          <Slide3 />
        </Slider>
        <SDotGroup dotNumbers />
        <NiceButtonBack />
        <NiceButtonNext />
      </CarouselProvider>
    </Container>
  );
};

export default MainSlider;
