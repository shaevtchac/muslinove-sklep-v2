import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Menu as Hamburger } from "@material-ui/icons";
import { drawerWidth } from "../App";
import { IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MyAvatar from "./MyAvatar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reset as userReset } from "../redux/userRedux";
import { reset as productReset } from "../redux/productRedux";
import { reset as transactionReset } from "../redux/transactionRedux";

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = ({ username, handleDrawerOpen, open, ...other }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(userReset());
    dispatch(productReset());
    dispatch(transactionReset());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <StyledAppBar position="fixed" open={open} {...other}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <Hamburger />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Admin
        </Typography>

        {username && (
          <div>
            <IconButton color="inherit" onClick={handleMenu}>
              <MyAvatar username={username} />
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
            </Menu>
          </div>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
