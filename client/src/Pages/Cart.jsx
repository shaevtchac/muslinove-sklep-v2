import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Add, Delete, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../data";
import { publicRequest, tPayRequest } from "../requestMethods";
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

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const STitle = styled(Title)`
  text-align: center;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  border-radius: 10px;
  background-color: ${templateColors.WHITE_TRANSPARENT_50};
  border-bottom: 1px solid ${templateColors.BODY_COLOR_LIGHT};
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
  background-color: ${templateColors.WHITE_TRANSPARENT_50};
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: min-content;
`;

const SummaryTitle = styled.h1`
  font-weight: 400;
  color: ${templateColors.TEXT_COLOR_DARK};
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "600"};
  font-size: ${(props) => props.type === "total" && "1.5rem"};
  color: ${templateColors.TEXT_COLOR_DARK};
`;

const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const handleCheckout = () => {
    const startPayment = async () => {
      let tpaySecData;
      try {
        tpaySecData = await publicRequest.post("/tpay/md5", {
          amount: cart.total,
        }).data;
      } catch (error) {
        console.log(error);
      }

      // window.location.href =
      //   "https://secure.tpay.com?id=" +
      //   tpaySecData.tpayId +
      //   "&amount=" +
      //   cart.total +
      //   "&description=transakcja testowa&group=110&name=Nazwa Klienta&email=email@klienta.com&accept_tos=1&md5sum=" +
      //   tpaySecData.md5Sum;
    };
    startPayment();
  };
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
        <Top>
          <Link to="/">
            <Button>KONTYNUUJ ZAKUPY</Button>
          </Link>
          <TopTexts>
            <TopText>Koszyk {cart.itemsInCart}</TopText>
            {/* <TopText>Ulubione (0)</TopText> */}
          </TopTexts>
          <Button onClick={handleEmpty}>OPRÓŻNIJ KOSZYK</Button>
        </Top>
        <Bottom>
          <Info>
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
                      {product.price * product.quantity} zł
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
            <SummaryTitle>Podsumowanie:</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Wartość przedmiotów</SummaryItemText>
              <SummaryItemPrice>{cart.total} zł</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Dostawa</SummaryItemText>
              <SummaryItemPrice>12 zł</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Promocja na dostawę</SummaryItemText>
              <SummaryItemPrice>-12 zł</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Do zapłaty</SummaryItemText>
              <SummaryItemPrice>{cart.total} zł</SummaryItemPrice>
            </SummaryItem>
            <Button
              onClick={handleCheckout}
              type="filled"
              style={{ width: "100%" }}
            >
              DO KASY
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
