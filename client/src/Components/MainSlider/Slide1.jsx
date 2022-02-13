import styled from "@emotion/styled";
import { Image, Slide } from "pure-react-carousel";
import { TextCard, Title } from "../../Reusables/StyledParts";

const Container = styled.div`
  display: grid;
  padding-left: 1rem;
  align-items: center;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  height: 100%;
  width: 100%;
`;
const Logo = styled.img`
  display: block;
  width: 60%;
  height: auto;
  margin: 0 auto 2rem auto;
`;

const Img1 = styled(Image)`
  object-fit: cover;
  object-position: center center;
`;
const STitle = styled(Title)`
  margin: 1rem 0;
`;

const Slide1 = () => {
  return (
    <Slide index={1}>
      <Container>
        <div>
          <Logo src="./images/muslinove-logo-white.svg" />
          <STitle>O nas</STitle>
          <TextCard>
            <p>
              Własnoręcznie tworzymy boxy prezentowe dla waszych najmłodszych
              pociech.
            </p>
            <p>
              Głównym materiałem, który wykorzystujemy w naszym rękodziele jest
              <strong> muślin</strong> – magiczna tkanina o niezrównanej
              miękkości i przewiewności oraz wielu innych wspaniałych
              właściwościach.
            </p>
          </TextCard>
        </div>
        <Img1
          src="./Images/dziecko_na_poduszce.jpg"
          alt="dziecko na poduszce"
        />
      </Container>
    </Slide>
  );
};

export default Slide1;
