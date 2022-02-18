import styled from "@emotion/styled/macro";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  Close,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as colors from "../Reusables/Constants/Colors";
import { addProduct, decreaseQuantity } from "../redux/cartRedux";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

const Info = styled.div`
  cursor: pointer;
  opacity: 0;
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
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleClick = () => {
    navigate(`/produkt/${item._id}`);
  };
  const handleAddOneToCart = (e) => {
    e.stopPropagation();
    dispatch(addProduct({ ...item, quantity: 1 }));
    setOpenSnackBar(true);
  };

  const handleRemoveOneFromCart = (e) => {
    e.stopPropagation();
    dispatch(decreaseQuantity(item));
    handleCloseSnackBar();
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const action = (
    <>
      <Button
        color="secondary"
        size="small"
        onClick={(e) => handleRemoveOneFromCart(e)}
      >
        COFNIJ
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Container>
      <Circle />
      <Image src={item.images[0]} />
      <Info onClick={handleClick}>
        <Icon>
          <ShoppingCartOutlined onClick={(e) => handleAddOneToCart(e)} />
        </Icon>
        {/* <Link to={`/produkt/${item._id}`}> */}
        <Icon>
          <SearchOutlined />
        </Icon>
        {/* </Link> */}
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
        <TitlePriceContainer>
          <ProductTitle>{item.title}</ProductTitle>{" "}
          <ProductPrice>{item.price} zł</ProductPrice>
        </TitlePriceContainer>
      </Info>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Dodano 1 sztukę do koszyka."
        action={action}
      />
    </Container>
  );
};

export default Product;
