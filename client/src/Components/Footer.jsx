import styled from "@emotion/styled";
import { Facebook, MailOutline, Phone, Room } from "@mui/icons-material";
import { mobile } from "../responsive";
import * as colors from "../Reusables/Constants/Colors";

const Container = styled.footer`
  display: flex;
  ${mobile({ flexDirection: "column" })}
  background-color: ${colors.TEXT_COLOR_DARK};
  color: ${colors.TEXT_COLOR_LIGHT};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.img`
  width: 17vw;
  max-width: 7rem;
`;
const Desc = styled.p`
  margin: 20px 0;
  line-height: 1.7;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  color: ${colors.TEXT_COLOR_LIGHT};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3b5999;
  display: grid;
  place-items: center;
  margin-right: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
  margin-bottom: 20px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  line-height: 1.7;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#f1f1f1" })}
`;
const ContactItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo src="/images/muslinove-logo.svg" />
        <Desc>
          Własnoręcznie tworzymy boxy prezentowe dla waszych najmłodszych
          pociech. Głównym materiałem, który wykorzystujemy w naszym rękodziele
          jest muślin – magiczna tkanina o niezrównanej miękkości i
          przewiewności oraz wielu innych wspaniałych właściwościach.
        </Desc>
        <SocialContainer>
          <SocialIcon>
            <Facebook />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Użyteczne linki</Title>
        <List>
          <ListItem>Główna</ListItem>
          <ListItem>Koszyk</ListItem>
          <ListItem>Dla chłopców</ListItem>
          <ListItem>Dla dziewczynek</ListItem>
          <ListItem>Moje konto</ListItem>
          <ListItem>Order tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Kontakt</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          Ul. Kwiatowa 17 A, 06-323 STEGNA
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> 726-814-676
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />{" "}
          muslinove.drewno@interia.eu
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
