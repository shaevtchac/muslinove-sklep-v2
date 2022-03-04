import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Add, Delete, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../data";
import styled from "@emotion/styled";
import * as templateColors from "../Reusables/Constants/Colors";
import {
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} from "../redux/cartRedux";
import { Title, Button, SLink } from "../Reusables/StyledParts";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Bottom = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
  display: grid;
  gap: 1rem;
`;
const STitle = styled(Title)`
  text-align: center;
  margin-block: 1.5rem;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  border-radius: 10px;
  background-color: ${templateColors.WHITE_TRANSPARENT_50};
  border-bottom: 1px solid ${templateColors.BODY_COLOR_LIGHT};
  height: min-content;
`;
const ImgContainer = styled.div`
  width: 120px;
  background-color: ${templateColors.BODY_COLOR_DARK};
  border-radius: 10px 0 0 10px;
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px 0 0 10px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span`
  color: ${templateColors.BODY_COLOR_DARK};
`;
const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 0.5px solid lightgray;
`;
// const ProductSize = styled.span``;
const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  padding: 2rem;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ProductAmount = styled.div`
  font-size: 1.5rem;
  margin: 5px;
  ${mobile({ margin: "5px 10px" })}
`;
const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: 200;
`;

const ProductPriceSmall = styled.div`
  font-size: 0.9rem;
  color: ${templateColors.BODY_COLOR_DARK};
  font-weight: 200;
  text-align: center;
`;
const Summary = styled.div`
  flex: 1;
  display: grid;
  gap: 1rem;

  background-color: ${templateColors.WHITE_TRANSPARENT_50};
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: min-content;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  gap: 1rem;
  color: ${templateColors.TEXT_COLOR_DARK};
`;

const SummaryItemText = styled.span`
  text-align: right;
`;
const SummaryItemPrice = styled.span`
  font-weight: 600;
  font-size: 2rem;
`;
const EmptyCartInfo = styled.div`
  font-size: 0.9rem;
  color: ${templateColors.WHITE_TRANSPARENT_70};
  text-align: center;
  margin-top: 4rem;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleDelete = (product) => {
    dispatch(removeProduct(product));
  };

  const handleAdd = (product) => {
    dispatch(increaseQuantity(product));
  };
  const handleRemove = (product) => {
    dispatch(decreaseQuantity(product));
  };
  const handleEmpty = () => {
    dispatch(emptyCart());
  };
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <STitle>Twój koszyk</STitle>
        <Bottom>
          <Info>
            {cart.itemsInCart === 0 && (
              <EmptyCartInfo>Twój koszyk jest pusty.</EmptyCartInfo>
            )}
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <ImgContainer>
                    <SLink to={"/produkt/" + product._id}>
                      <Image src={product.images[0]} />
                    </SLink>
                  </ImgContainer>
                  <Details>
                    <SLink to={"/produkt/" + product._id}>
                      <ProductName>
                        Produkt:{" "}
                        <b>
                          <u>{product.title}</u>
                        </b>
                      </ProductName>
                    </SLink>
                    <ProductId>ID Produktu: {product._id}</ProductId>

                    <ProductId>Kolor:</ProductId>
                    <ProductColor
                      color={
                        colors.find(
                          (colorItem) => colorItem.id == product.color
                        )?.colorCSS
                      }
                    />

                    {/* <ProductSize>
                      <b>Rozmiar:</b> {product.size}
                    </ProductSize> */}
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove
                      sx={{
                        cursor: "pointer",
                        color: templateColors.BODY_COLOR_DARK,
                      }}
                      onClick={() => handleRemove(product)}
                    />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Add
                      sx={{
                        cursor: "pointer",
                        color: templateColors.BODY_COLOR_DARK,
                      }}
                      onClick={() => handleAdd(product)}
                    />
                  </ProductAmountContainer>
                  <div style={{ display: "grid", placeItems: "center" }}>
                    <ProductPrice>
                      {(product.price * product.quantity).toFixed(2)} zł
                    </ProductPrice>
                    {product.quantity > 1 && (
                      <ProductPriceSmall>
                        Cena za sztukę: <strong>{product.price} zł</strong>
                      </ProductPriceSmall>
                    )}
                  </div>
                  <Delete
                    onClick={() => handleDelete(product)}
                    sx={{
                      cursor: "pointer",
                      color: templateColors.BODY_COLOR_DARK,
                    }}
                  />
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryItem>
              <SummaryItemText>Do zapłaty</SummaryItemText>
              <SummaryItemPrice>{cart.total.toFixed(2)} zł</SummaryItemPrice>
            </SummaryItem>

            <SummaryItemText style={{ marginTop: "-0.8rem" }}>
              + dostawa
            </SummaryItemText>

            <Link to="/podsumowanie">
              <Button
                filled
                style={{ width: "100%" }}
                disabled={cart.total === 0}
              >
                DOSTAWA I PŁATNOŚĆ
              </Button>
            </Link>
            <Link to="/">
              <Button style={{ width: "100%" }}>KONTYNUUJ ZAKUPY</Button>
            </Link>

            <Button onClick={handleEmpty} style={{ width: "100%" }}>
              OPRÓŻNIJ KOSZYK
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
