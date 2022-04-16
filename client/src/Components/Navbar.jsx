import styled from "@emotion/styled";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { SLink } from "../Reusables/StyledParts";
import MyAvatar from "./MyAvatar";

const Container = styled.nav`
  height: 60px;
  background-color: white;
  ${mobile({
    height: "50px",
  })}
`;
const Wrapper = styled.div`
  padding: 2px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "12px 18px" })}
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
  position: relative;
`;

const Navbar = () => {
  const numberOfItemsInCart = useSelector((state) => state.cart.itemsInCart);
  const [anchorEl, setAnchorEl] = useState(null);
  const cartProducts = useSelector((state) =>
    state.cart.products.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }))
  );
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logOut(dispatch, user, { products: cartProducts });
  };
  const handleClose = () => {
    setAnchorEl(null);
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

          {user && (
            <div>
              <IconButton color="inherit" onClick={handleMenu}>
                <MyAvatar username={user.name ? user.name : "N N"} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
                <SLink to={"/zamowienia"}>
                  <MenuItem>Moje zamówienia</MenuItem>
                </SLink>
                <SLink to={"/ustawienia_konta"}>
                  <MenuItem>Ustawienia konta</MenuItem>
                </SLink>
              </Menu>
            </div>
          )}

          <SLink to="/koszyk">
            <MenuItem>
              <Badge badgeContent={numberOfItemsInCart} color="primary">
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
