import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Image, Slide } from "pure-react-carousel";
import { TextCard, Title } from "../../Reusables/StyledParts";

const Container = styled.div`
  display: grid;
  padding-right: 1rem;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  gap: 1rem;
  height: 100%;
  width: 100%;
`;
const bgShift = keyframes`
  from {
    object-position: left;
  }
  
  to {
    object-position: right;
  }
`;

const Img1 = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${bgShift} 25s linear alternate infinite;
`;
const STitle = styled(Title)`
  margin: 1rem 0;
`;

const Slide2 = () => {
  return (
    <Slide index={2}>
      <Container>
        <Img1 src="./Images/muslin_bawelniany.jpg" />
        <div>
          <STitle> Muślin Bawełniany</STitle>
          <TextCard>
            <p>
              Posiada gamę pewnych właściwości, które wyróżniają tę tkaninę na
              tle innych.
            </p>
            <p>
              Charakterystyczną jego cechą jest tzw.{" "}
              <strong>otwarty splot i lekkość</strong>, jego włókna wyróżniają
              się doskonałymi właściwościami termoizolacyjnym. Muślin bawełniany
              jest materiałem niezwykle trwałym, a jednocześnie praktycznie nie
              odczuwalnym na skórze. To co wyróżnia te tkaninę to z pewnością
              <strong> miękkość</strong>.
            </p>
            <p>
              Muślin bawełniany na szeroką skalę stosuje się w produkcji
              <strong> artykułów dziecięcych</strong>. Doskonały do produkcji{" "}
              <strong>pieluszek, kołderek, poduszek, czy akcesoriów</strong>.
              Rodzice małych dzieci doceniają muślin i zwracają uwagę na jego
              zalety. To materiał miękki, co ma znaczenie w przypadku miękkiej
              skóry dziecka. Jest lekki i przewiewny, co zapewnia właściwą
              termoregulację a co za tym idzie, chroni przed przegrzaniem. Nie
              bez znaczenia jest także fakt elastyczności i czystości tej
              tkaniny. Odporność na zabrudzenia sprowadza się do eliminacji
              zagrożenia alergicznego i grzybiczego. Wytrzymałość daje gwarancję
              odporności podczas procesu prania. I wreszcie ekologia – zero
              chemii, pestycydów, tylko{" "}
              <strong>
                naturalna, miękka tkanina, stworzona do pielęgnacji i ochrony
                skóry maluszka
              </strong>
              .
            </p>
          </TextCard>
        </div>
      </Container>
    </Slide>
  );
};

export default Slide2;
