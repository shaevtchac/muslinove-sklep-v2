import styled from "styled-components";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { SLink } from "./Reusables";
import { useDispatch } from "react-redux";
import { reset as userReset } from "../redux/userRedux";
import { reset as productReset } from "../redux/productRedux";
const Container = styled.nav`
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 999;
`;
const Wrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div``;
const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: darkblue;
  cursor: pointer;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #555;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
`;
const MenuItem = styled.span`
  font-weight: 400;
  font-size: 0.8rem;
  cursor: pointer;
`;

const Topbar = () => {
  const dispatch = useDispatch();
  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch(userReset());
    dispatch(productReset());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <SLink to="/">
            <Logo>Admin</Logo>
          </SLink>
        </Left>
        <Right>
          <MenuItem onClick={(e) => handleLogoutClick(e)}>Wyloguj</MenuItem>
          <Language />
          <Settings />
          <Badge badgeContent={3} color="primary">
            <NotificationsNone />
          </Badge>
          <Avatar src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg" />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Topbar;
