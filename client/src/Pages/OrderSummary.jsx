import styled from "@emotion/styled";
import { Box, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import * as templateColors from "../Reusables/Constants/Colors";
import { Button, Title, Input } from "../Reusables/StyledParts";
import isEmail from "validator/es/lib/isEmail";
import { useForm, Form } from "../Components/useForm";
import { useEffect } from "react";
import { emptyCart } from "../redux/cartRedux";

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
  flex: 1;
  display: grid;
  gap: 1rem;
  height: min-content;
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
  height: 80px;
  background-color: ${templateColors.BODY_COLOR_DARK};
  border-radius: 10px 0 0 10px;
`;
const ProductDetail = styled.div`
  flex: 1;
  display: flex;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  border-radius: 10px 0 0 10px;
`;
const Details = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProductAmountPriceDesc = styled.div`
  font-size: 0.8rem;
  color: ${templateColors.BODY_COLOR_DARK};
`;
const ProductName = styled.span``;

const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  margin-right: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 200;
`;

const Summary = styled.div`
  flex: 2;
  display: flex;
  gap: 1.5rem;
  background-color: ${templateColors.WHITE_TRANSPARENT_70};
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 1.5rem;
  height: min-content;
`;

const SummaryTitle = styled.h1`
  font-weight: 400;
  color: ${templateColors.TEXT_COLOR_DARK};
`;

const SummaryPayment = styled.div`
  flex: 1;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  gap: 1rem;
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
  const user = useSelector((state) => state.user.currentUser);
  const inputsInitialState = {
    email: user?.email,
    name: user?.name,
    postalCode: user?.postalCode,
    city: user?.city,
    address: user?.address,
    phone: user?.phone,
    message: "",
  };

  const deliveryFee = 20;

  const formValidatedOk = (inputValues = inputs) => {
    let temp = { ...errors };
    if ("name" in inputValues)
      temp.name = inputValues.name ? "" : "Pole wymagane.";
    if ("email" in inputValues)
      temp.email = inputValues.email
        ? isEmail(inputValues.email)
          ? ""
          : "Nieprawidłowy adres e-mail."
        : "Pole wymagane.";
    if ("postalCode" in inputValues)
      temp.postalCode = inputValues.postalCode ? "" : "Pole wymagane.";
    if ("city" in inputValues)
      temp.city = inputValues.city ? "" : "Pole wymagane.";
    if ("address" in inputValues)
      temp.address = inputValues.address ? "" : "Pole wymagane.";
    setErrors({ ...temp });
    if (inputValues == inputs)
      return Object.values(temp).every((x) => x === "");
  };
  const { inputs, setInputs, errors, setErrors, handleInputChange, resetForm } =
    useForm(inputsInitialState, true, formValidatedOk);

  const handleCheckout = (e) => {
    e.preventDefault();
    let userId;
    if (user) {
      userId = user._id;
    } else {
      userId = "niezarejestrowany";
    }

    let order = {
      userId,
      amount: cart.total,
      ...(user?.address && { address: user.address }), //add address if it exists
      ...(user?.postalCode && { postalCode: user.postalCode }),
      ...(user?.city && { city: user.city }),
      products: cart.products,
    };
    const encodeGetParams = (p) =>
      Object.entries(p)
        .map((kv) => kv.map(encodeURIComponent).join("="))
        .join("&");
    const getOrderId = publicRequest.post("/orders", order); //promise
    if (!formValidatedOk()) return;
    getOrderId
      .then((dbRes) => {
        const getTpaySecData = publicRequest.post("/tpay/md5", {
          //promise
          amount: cart.total + deliveryFee,
          crc: dbRes.data._id,
        });
        getTpaySecData
          .then((tpayRes) => {
            let params = {
              id: tpayRes.data.tpayId,
              md5sum: tpayRes.data.md5Sum,
              amount: cart.total + deliveryFee,
              crc: dbRes.data._id,
              description: `zamówienie nr: ${dbRes.data._id} w sklepie muslinove.pl`,
              name: inputs.name,
              email: inputs.email,
              address: inputs.address,
              zip: inputs.postalCode,
              ...(inputs.phone && { phone: inputs.phone }),
            };
            console.log(params);
            dispatch(emptyCart());
            window.location.href =
              "https://secure.tpay.com?" + encodeGetParams(params);
          })
          .catch((tpayErr) => console.error(tpayErr));
      })
      .catch((dbErr) => console.error(dbErr));
  };
  useEffect(() => {
    if (user !== null) {
      //fill inputs when user logs in during the process
      setInputs({
        ...(user.name && { name: user.name }),
        ...(user.email && { email: user.email }),
        ...(user.city && { city: user.city }),
        ...(user.postalCode && { postalCode: user.postalCode }),
        ...(user.address && { address: user.address }),
      });
    }
  }, [user, setInputs]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <STitle>Dostawa i płatność</STitle>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <ImgContainer>
                    <Image src={product.images[0]} />
                  </ImgContainer>
                  <Details>
                    <ProductName>{product.title}</ProductName>

                    <ProductAmountPriceDesc>
                      {product.quantity} x {product.price} zł
                    </ProductAmountPriceDesc>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductPrice>
                    {product.price * product.quantity} zł
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryPayment>
              <SummaryTitle>Podsumowanie:</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Wartość przedmiotów</SummaryItemText>
                <SummaryItemPrice>{cart.total} zł</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Dostawa (kurier)</SummaryItemText>
                <SummaryItemPrice>{deliveryFee} zł</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Do zapłaty</SummaryItemText>
                <SummaryItemPrice>
                  {cart.total + deliveryFee} zł
                </SummaryItemPrice>
              </SummaryItem>
            </SummaryPayment>
            <Form sx={{ flex: 2 }} onSubmit={handleCheckout}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(25ch, 1fr))",
                  gridAutoFlow: "dense",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Input
                  name="name"
                  value={inputs.name}
                  label="imię i nazwisko"
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                />
                <Input
                  required
                  name="email"
                  value={inputs.email}
                  label="e-mail"
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </Box>

              <Divider textAlign="left">ADRES (do wysyłki)</Divider>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(25ch, 1fr))",
                  gridAutoFlow: "dense",
                  gap: 2,
                  mb: 2,
                  mt: 1,
                }}
              >
                <Input
                  required
                  name="postalCode"
                  value={inputs.postalCode}
                  label="kod pocztowy"
                  onChange={handleInputChange}
                  error={errors.postalCode}
                />
                <Input
                  required
                  name="city"
                  value={inputs.city}
                  label="miejscowość"
                  onChange={handleInputChange}
                  error={errors.city}
                />
                <Input
                  required
                  name="address"
                  value={inputs.address}
                  label="ulica, nr domu"
                  onChange={handleInputChange}
                  error={errors.address}
                />
                <Input
                  name="phone"
                  value={inputs.phone}
                  label="nr telefonu"
                  onChange={handleInputChange}
                  helperText="nie musisz podawać, ale przyda się dla kuriera"
                />
              </Box>
              <Button
                type="submit"
                filled
                style={{ width: "100%" }}
                disabled={cart.total === 0}
              >
                DO KASY
              </Button>
            </Form>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
