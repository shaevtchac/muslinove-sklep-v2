import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Image, Slide } from "pure-react-carousel";
import { mobile } from "../../responsive";
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
  ${mobile({ width: "100%", height: "60%" })}
`;
const Img2 = styled(Image)`
  position: absolute;
  width: 30%;
  height: auto;
  right: 5%;
  top: 5%;
  ${mobile({ right: "60%", top: "66%" })}
  animation: ${obrot} 5s linear alternate infinite;
`;

const STitle = styled(Title)`
  position: absolute;
  text-align: right;
  right: 4%;
  bottom: 15%;
  width: 30%;
  ${mobile({ right: "4%", width: "66%", bottom: "20%" })}
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
