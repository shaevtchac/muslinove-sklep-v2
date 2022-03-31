import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { DrawerHeader, drawerWidth } from "../App";
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AttachMoney,
  ChevronLeft,
  ChevronRight,
  LineStyle,
  PermIdentity,
  Storefront,
  TrendingUp,
} from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Drawer = ({ open, handleDrawerClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <StyledDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItemButton
          onClick={() => navigate("/")}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <LineStyle />
          </ListItemIcon>
          <ListItemText primary={"Główna"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/uzytkownicy")}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <PermIdentity />
          </ListItemIcon>
          <ListItemText
            primary={"Użytkownicy"}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/produkty")}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <Storefront />
          </ListItemIcon>
          <ListItemText primary={"Produkty"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => navigate("/transakcje")}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <AttachMoney />
          </ListItemIcon>
          <ListItemText primary={"Transakcje"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <TrendingUp />
          </ListItemIcon>
          <ListItemText primary={"Sprzedaż"} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </List>
      <Divider />
    </StyledDrawer>
  );
};

export default Drawer;
