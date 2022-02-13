import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { logout } from "../redux/userRedux";
import { SLink } from "../Reusables/StyledParts";

const Container = styled.nav`
  height: 60px;
  background-color: white;
  ${mobile({
    height: "50px",
  })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px" })}
`;
const Left = styled.div``;
const Logo = styled.div`
  width: 17vw;
  max-width: 7rem;
`;
const Center = styled.div``;
const Right = styled.div`
  display: flex;
  align-items: center;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
// const Language = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   margin-left: 25px;
//   ${mobile({ display: "none" })}
// `;
// const SearchContainer = styled.div`
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
// `;
// const Input = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })}
// `;
const Navbar = () => {
  const itemsInCart = useSelector((state) => state.cart.itemsInCart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <SLink to="/">
            <Logo>
              <img src="/images/muslinove-logo.svg" alt="logo Muślinove" />
            </Logo>
          </SLink>
        </Left>
        <Center></Center>
        <Right>
          {!user && (
            <SLink to="/rejestracja">
              <MenuItem>Rejestracja</MenuItem>
            </SLink>
          )}
          {!user && (
            <SLink to="/logowanie">
              <MenuItem>Logowanie</MenuItem>
            </SLink>
          )}
          {user && <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>}
          <SLink to="/koszyk">
            <MenuItem>
              <Badge badgeContent={itemsInCart} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </SLink>
          {/* <Language>PL</Language>
          <SearchContainer>
            <Input placeholder="Szukaj" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
