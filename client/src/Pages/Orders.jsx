import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import { Button, Title } from "../Reusables/StyledParts";
import * as templateColors from "../Reusables/Constants/Colors";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

const STitle = styled(Title)`
  text-align: center;
  margin-block: 1.5rem;
`;
const Orders = styled.div`
  display: grid;
  gap: 1.5rem;
  max-width: 800px;
  margin: 1.5rem auto;
`;
const Order = styled.div`
  padding: 1rem;
  display: grid;
  gap: 1rem;
  background-color: ${templateColors.BODY_COLOR_DARK};
  border-radius: 10px;
`;
const DateStatusInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${templateColors.TEXT_COLOR_LIGHT};
  font-size: 0.8rem;
`;
const Date = styled.p``;
const Status = styled.p`
  align-self: right;
`;
const OrderId = styled.p`
  color: ${templateColors.WHITE_TRANSPARENT_70};
`;

const OrderLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${templateColors.WHITE_TRANSPARENT_70};
  border-radius: 10px;
`;
const Image = styled.img`
  width: 120px;
  object-fit: contain;
  object-position: center center;
  border-radius: 10px 0 0 10px;
`;

const ProductName = styled.div`
  color: ${templateColors.TEXT_COLOR_DARK};
  flex: 4;
  font-weight: 600;
  margin-inline: 1rem;
`;
const QtyPrice = styled.div`
  color: ${templateColors.TEXT_COLOR_MEDIUM};
  font-size: 0.8rem;
  flex: 1;
`;
const LineTotal = styled.div`
  color: ${templateColors.TEXT_COLOR_DARK};
  margin-right: 1rem;
`;
const OrderTotal = styled.p`
  color: ${templateColors.TEXT_COLOR_LIGHT};
  font-weight: 600;
  font-size: 1.4rem;
  text-align: right;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    const res = await userRequest.get(`/orders/find/${user._id}`);
    console.log(res.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Navbar />
      <STitle>Moje zamówienia</STitle>
      <Orders>
        <Order>
          <DateStatusInfo>
            <Date>12 lut 2022 18:44</Date>
            <OrderId>Id: 343fdfskdkjkj5kjfdjfsk4k453</OrderId>
            <Status>Status: W trakcie realizacji</Status>
          </DateStatusInfo>
          <OrderLine>
            <Image src="images/box120-1.jpg" />
            <ProductName>Box średni zielony</ProductName>
            <QtyPrice>2 x 80 zł</QtyPrice>
            <LineTotal>160 zł</LineTotal>
          </OrderLine>
          <OrderLine>
            <Image src="images/box120-1.jpg" />
            <ProductName>Box mały zielony</ProductName>
            <QtyPrice>1 x 40 zł</QtyPrice>
            <LineTotal>40 zł</LineTotal>
          </OrderLine>
          <OrderTotal>200 zł</OrderTotal>
        </Order>
        <Order>
          <DateStatusInfo>
            <Date>12 lut 2022 18:44</Date>
            <OrderId>Id: 343fdfskd3432432djfsk4k453</OrderId>
            <Status>Status: Oczekuje na płatność</Status>
            <Button onClick={getOrders}>Zapłać</Button>
          </DateStatusInfo>
          <OrderLine>
            <Image src="images/box120-1.jpg" />
            <ProductName>Box średni zielony</ProductName>
            <QtyPrice>2 x 80 zł</QtyPrice>
            <LineTotal>160 zł</LineTotal>
          </OrderLine>
          <OrderLine>
            <Image src="images/box120-1.jpg" />
            <ProductName>Box mały zielony</ProductName>
            <QtyPrice>1 x 40 zł</QtyPrice>
            <LineTotal>40 zł</LineTotal>
          </OrderLine>
          <OrderTotal>200 zł</OrderTotal>
        </Order>
      </Orders>

      <Footer />
    </>
  );
};

export default Cart;
