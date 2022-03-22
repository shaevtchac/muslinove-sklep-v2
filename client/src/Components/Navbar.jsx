import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { SLink } from "../Reusables/StyledParts";
import Avatar from "@mui/material/Avatar";
import * as templateColors from "../Reusables/Constants/Colors";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { logOut } from "../redux/apiCalls";

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
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const AvatarMenuItem = styled(MenuItem)`
  margin: 0;
  text-align: center;
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

const Navbar = () => {
  const numberOfItemsInCart = useSelector((state) => state.cart.itemsInCart);
  const cartProducts = useSelector((state) =>
    state.cart.products.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }))
  );
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);

  const AvatarMenu = styled.div`
    width: 150px;
    background-color: ${templateColors.WHITE_TRANSPARENT_70};
    border-radius: 5px;
    position: absolute;
    top: 47px;
    right: -17px;
    padding: 0.5rem;
    z-index: 1;
    opacity: ${avatarMenuVisible ? 1 : 0};
  `;

  const handleLogout = (e) => {
    e.preventDefault();
    setAvatarMenuVisible(false);
    logOut(dispatch, user, { products: cartProducts });
  };
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
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

          <ClickAwayListener onClickAway={() => setAvatarMenuVisible(false)}>
            <div>
              {user && (
                <Avatar
                  {...stringAvatar(user.name)}
                  onClick={() => setAvatarMenuVisible((prev) => !prev)}
                  sx={{ cursor: "pointer", marginTop: "-7px" }}
                />
              )}
              <AvatarMenu>
                <AvatarMenuItem onClick={handleLogout}>Wyloguj</AvatarMenuItem>
                <SLink to={"/zamowienia"}>
                  <AvatarMenuItem onClick={() => setAvatarMenuVisible(false)}>
                    Moje zamówienia
                  </AvatarMenuItem>
                </SLink>
              </AvatarMenu>
            </div>
          </ClickAwayListener>

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
