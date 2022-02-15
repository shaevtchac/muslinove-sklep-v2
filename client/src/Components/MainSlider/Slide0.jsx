import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Image, Slide } from "pure-react-carousel";
import { Title } from "../../Reusables/StyledParts";

const obrot = keyframes`
  from {
    transform: rotate(-20deg);
  }
  to {
    transform: rotate(8deg);
  }
`;

const Img1 = styled(Image)`
  width: 65%;
  object-fit: cover;
  object-position: right center;
`;
const Img2 = styled(Image)`
  position: absolute;
  width: 30%;
  height: auto;
  right: 5%;
  top: 5%;
  animation: ${obrot} 5s linear alternate infinite;
`;

const STitle = styled(Title)`
  position: absolute;
  text-align: right;
  right: 6%;
  bottom: 10%;
  width: 30%;
`;

const Slide0 = () => {
  return (
    <Slide index={0}>
      <Img1 src="./images/dziecko_usmiech.jpg" />
      <Img2 src="./images/box-start.png" />
      <STitle> Boxy prezentowe dla najmłodszych</STitle>
    </Slide>
  );
};

export default Slide0;
