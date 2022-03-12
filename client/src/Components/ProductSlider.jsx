import {
  CarouselProvider,
  Slider,
  ImageWithZoom,
  Image,
  Slide,
  DotGroup,
  //   Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { SButtonNext, SButtonBack } from "./MainSlider/MainSlider";
import styled from "@emotion/styled";
import { NiceButtonBack, NiceButtonNext } from "../Reusables/StyledParts";

const SDotGroup = styled(DotGroup)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  display: flex;
  gap: 3px;
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
      <NiceButtonBack />

      <NiceButtonNext />
    </CarouselProvider>
  );
};

export default ProductSlider;
