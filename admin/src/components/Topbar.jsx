import { Badge } from "@material-ui/core";
import { NotificationsNone } from "@material-ui/icons";
import Avatar from "@mui/material/Avatar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { reset as productReset } from "../redux/productRedux";
import { reset as transactionReset } from "../redux/transactionRedux";
import { reset as userReset } from "../redux/userRedux";
import * as templateColors from "./Constants/Colors";
import { SLink } from "./Reusables";

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
`;

const AvatarMenuItem = styled.div`
  margin: 0;
  text-align: center;
  width: 100%;
  color: white;
  cursor: pointer;
`;
const AvatarMenu = styled.div`
  width: 100px;
  background-color: ${templateColors.BODY_COLOR_LIGHT};
  border-radius: 5px;
  position: absolute;
  top: 47px;
  right: 5px;
  padding: 0.5rem;
  z-index: 1;
  opacity: ${(props) => (props.avatarMenuVisible ? 1 : 0)};
`;

const Topbar = () => {
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userReset());
    dispatch(productReset());
    dispatch(transactionReset());
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
            <Logo>Admin</Logo>
          </SLink>
        </Left>
        <Right>
          <ClickAwayListener onClickAway={() => setAvatarMenuVisible(false)}>
            <div>
              {user && (
                <Avatar
                  {...stringAvatar(user.name)}
                  onClick={() => setAvatarMenuVisible((prev) => !prev)}
                  sx={{
                    cursor: "pointer",
                    marginTop: "-7px",
                    bgcolor: stringToColor(user.name),
                  }}
                />
              )}
              <AvatarMenu avatarMenuVisible={avatarMenuVisible}>
                <AvatarMenuItem onClick={handleLogout}>Wyloguj</AvatarMenuItem>
              </AvatarMenu>
            </div>
          </ClickAwayListener>
          <Badge badgeContent={0} color="primary">
            <NotificationsNone />
          </Badge>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Topbar;
