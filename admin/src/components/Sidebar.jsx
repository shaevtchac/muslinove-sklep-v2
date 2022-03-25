import {
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
  DynamicFeed,
  LineStyle,
  MailOutline,
  PermIdentity,
  Report,
  Storefront,
  Timeline,
  TrendingUp,
  WorkOutline,
} from "@material-ui/icons";
import { SLink } from "./Reusables";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  height: calc(100vh-50px);
  position: sticky;
  top: 50px;
  background-color: #f8f8f8;
`;
const Wrapper = styled.div`
  padding: 20px;
  color: #555;
`;
const Menu = styled.div`
  margin-bottom: 10px;
`;
const Title = styled.h3`
  font-size: 1rem;
  color: #bdbdbd;
`;
const ItemsWrapper = styled.ul`
  list-style: none;
  padding: 5px;
`;
const MenuItem = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 10px;
  &.active,
  :hover {
    background-color: #ffffff;
  }
`;

const Sidebar = () => {
  return (
    <Container>
      <Wrapper>
        <Menu>
          <Title>Panel zarządzania</Title>
          <ItemsWrapper>
            <SLink to="/">
              <MenuItem>
                <LineStyle fontSize="small" /> Główna
              </MenuItem>
            </SLink>

            <MenuItem>
              <TrendingUp fontSize="small" /> Sprzedaż
            </MenuItem>
          </ItemsWrapper>
          <Title>Menu podręczne</Title>
          <ItemsWrapper>
            <SLink to="/uzytkownicy">
              <MenuItem>
                <PermIdentity fontSize="small" /> Użytkownicy
              </MenuItem>
            </SLink>
            <SLink to="/produkty">
              <MenuItem>
                <Storefront fontSize="small" /> Produkty
              </MenuItem>
            </SLink>
            <MenuItem>
              <SLink to={"/transakcje"}>
                <AttachMoney fontSize="small" /> Transakcje
              </SLink>
            </MenuItem>
          </ItemsWrapper>
        </Menu>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
