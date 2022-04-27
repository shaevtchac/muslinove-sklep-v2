import styled from "@emotion/styled/macro";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackBar } from "../Hooks/useSnackBar";
import {
  addProduct as addProductToCart,
  decreaseQuantity,
} from "../redux/cartRedux";
import {
  addProduct as addProductToFavorites,
  removeProduct as removeProductFromFavorites,
} from "../redux/favoritesRedux";
import { mobile } from "../responsive";
import * as colors from "../Reusables/Constants/Colors";
import Tooltip from "@mui/material/Tooltip";

const Info = styled.div`
  cursor: pointer;
  opacity: 0;
  ${mobile({ opacity: "1" })}
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  flex: 1;
  min-width: 280px;
  height: 380px;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  background-color: ${colors.BODY_COLOR_DARK};
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${colors.BODY_COLOR_LIGHT};
  position: absolute;
`;
const Image = styled.img`
  height: 100%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const TitlePriceContainer = styled.div`
  background: linear-gradient(#00000000, #00000084);
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const ProductTitle = styled.div`
  color: white;
  font-weight: 600;
  font-size: calc(0.9rem + 1vw);
`;
const ProductPrice = styled.div`
  color: white;
  font-size: calc(1rem + 1vw);
  font-weight: 200;
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    SnackBar: CartSnackBar,
    open: openCartSnackBar,
    close: closeCartSnackBar,
    opened: cartSnackBarOpened,
  } = useSnackBar();
  const {
    SnackBar: FavSnackBar,
    open: openFavSnackBar,
    close: closeFavSnackBar,
    opened: favSnackBarOpened,
  } = useSnackBar();

  const handleClick = () => {
    navigate(`/produkt/${item._id}`);
  };
  const handleAddOneToCart = (e) => {
    e.stopPropagation();
    dispatch(addProductToCart({ ...item, quantity: 1 }));
    openCartSnackBar();
  };

  const handleRemoveOneFromCart = (e) => {
    e.stopPropagation();
    dispatch(decreaseQuantity(item));
    handleCloseCartSnackBar();
  };

  const handleRemoveFromFavorites = (e) => {
    e.stopPropagation();
    dispatch(removeProductFromFavorites(item));
    handleCloseFavSnackBar();
  };
  const handleAddToFavorites = (e) => {
    e.stopPropagation();
    dispatch(addProductToFavorites(item));
    openFavSnackBar();
  };

  const handleCloseCartSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeCartSnackBar();
  };
  const handleCloseFavSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeFavSnackBar();
  };

  return (
    <Container>
      <Circle />
      <Image src={item.images[0]} />
      <Info onClick={handleClick}>
        <Icon>
          <Tooltip title="Dodaj 1szt. do koszyka">
            <ShoppingCartOutlined onClick={(e) => handleAddOneToCart(e)} />
          </Tooltip>
        </Icon>
        {/* <Link to={`/produkt/${item._id}`}> */}
        <Icon>
          <Tooltip title="Wyświetl szybki podgląd produktu (nie działa jeszcze)">
            <SearchOutlined />
          </Tooltip>
        </Icon>
        {/* </Link> */}
        <Icon>
          <Tooltip title="Dodaj do ulubionych">
            <FavoriteBorderOutlined onClick={(e) => handleAddToFavorites(e)} />
          </Tooltip>
        </Icon>
        <TitlePriceContainer>
          <ProductTitle>{item.title}</ProductTitle>{" "}
          <ProductPrice>{item.price} zł</ProductPrice>
        </TitlePriceContainer>
      </Info>
      <CartSnackBar
        message={"Dodano 1 szt. do koszyka"}
        opened={cartSnackBarOpened}
        type={"success"}
        close={handleCloseCartSnackBar}
        undoFunction={handleRemoveOneFromCart}
      />
      <FavSnackBar
        message={"Dodano do ulubionych"}
        opened={favSnackBarOpened}
        type={"success"}
        close={handleCloseFavSnackBar}
        undoFunction={handleRemoveFromFavorites}
      />
    </Container>
  );
};

export default Product;
