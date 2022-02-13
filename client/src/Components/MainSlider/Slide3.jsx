import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Image, Slide } from "pure-react-carousel";
import { TextCard, Title } from "../../Reusables/StyledParts";

const Container = styled.div`
  display: grid;
  padding-left: 1rem;
  grid-template-columns: 2fr 1fr;
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

const Slide3 = () => {
  return (
    <Slide index={3}>
      <Container>
        <div>
          <STitle>Rękodzieło</STitle>
          <TextCard>
            <p>
              Boxy prezentowane przeze mnie to bez wątpienia rękodzieło, więc
              nie zapominajmy o jego cechach.
            </p>
            <p>
              Rękodzieło zapewne kojarzy się nam dosyć jednoznacznie - z dziełem
              naszych rąk, czymś, co sami wytwarzamy, używając do tego różnych
              materiałów. Rękodzieło jest wyrobem nieprzemysłowym i będącym pod
              wieloma względami dziełem o walorach estetycznych. Żeby tworzyć
              dzieła handmade, trzeba posiadać jakieś zacięcie artystyczne, mieć
              zdolności manualne oraz wyrobioną wyobraźnię i kreatywność.
              Odbiorcami zaś tych produktów są osoby bardziej świadome pod
              względem artystycznym, potrafią docenić kunszt i wysiłek twórcy.
              Rękodzieło jest również dla tych, którzy pragną czegoś
              oryginalnego i niepowtarzalnego, czego nie kupi się w pierwszym
              lepszym sklepie. Moje boxy muślinove bez wątpienia są takim
              produktem.
            </p>
            <p>
              Jednak trzeba pamiętać o najważniejszej rzeczy, mianowicie nie da
              się wykonać dwóch identycznych rzeczy. Nie jest to możliwe w
              przypadku rękodzieła. Wykonam podobne ale nigdy identyczne. Mogą
              się one różnić nieznacznie, minimalnie ale zawsze będą. Na pewno
              mogę zapewnić, że dołożę wszelkich starań aby klient kupujący moje
              produkty był zadowolony.
            </p>
          </TextCard>
        </div>
        <Img1 src="./Images/box_prezent.jpg" />
      </Container>
    </Slide>
  );
};

export default Slide3;
