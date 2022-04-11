import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import { Button, SLink, Title } from "../Reusables/StyledParts";
import * as templateColors from "../Reusables/Constants/Colors";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";

const STitle = styled(Title)`
  text-align: center;
  margin-block: 1.5rem;
`;
const Orders = styled.div`
  display: grid;
  gap: 1.5rem;
  max-width: 800px;
  margin: 1.5rem auto;
  padding: 1rem;
  ${mobile({ padding: "0.5rem" })}
`;
const Order = styled.div`
  padding: 1rem;
  display: grid;
  gap: 1rem;
  background-color: ${templateColors.BODY_COLOR_DARK};
  border-radius: 10px;
  ${mobile({ padding: "0.5rem", gap: "0.5rem" })}
`;
const DateStatusInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${templateColors.TEXT_COLOR_LIGHT};
  font-size: 0.8rem;
  ${mobile({ flexDirection: "column" })}
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
  ${mobile({ width: "70px" })}
`;

const ProductName = styled.div`
  color: ${templateColors.TEXT_COLOR_DARK};
  flex: 2;
  font-weight: 600;
  font-size: calc(0.7rem + 0.5vw);
  margin-inline: 1rem;
  ${mobile({ marginInline: "0.5rem" })}
`;
const QtyPrice = styled.div`
  color: ${templateColors.TEXT_COLOR_MEDIUM};
  font-size: 0.8rem;
  text-align: center;
  flex: 1;
`;
const LineTotal = styled.div`
  color: ${templateColors.TEXT_COLOR_DARK};
  margin-right: 1rem;
  flex: 1;
  text-align: right;
  ${mobile({ marginRight: "0.5rem" })}
`;
const OrderTotal = styled.p`
  color: ${templateColors.TEXT_COLOR_LIGHT};
  font-weight: 600;
  font-size: 1.4rem;
  text-align: right;
`;

const formatDate = (DBdate) => {
  const date = new window.Date(DBdate);
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Intl.DateTimeFormat("pl-PL", options).format(date);
};

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const encodeGetParams = (params) =>
    Object.entries(params)
      .map((kv) => kv.map(encodeURIComponent).join("="))
      .join("&");
  const handlePayment = async (order) => {
    try {
      const tpayRes = await publicRequest.post("/tpay/md5", {
        amount: order.amount,
        crc: order._id,
      });

      let params = {
        id: tpayRes.data.tpayId,
        md5sum: tpayRes.data.md5Sum,
        amount: order.amount,
        crc: order._id,
        description: `zamówienie nr: ${order._id} w sklepie muslinove.pl`,
        name: order.name,
        email: order.email,
        address: order.address,
        return_url:
          process.env.NODE_ENV === "production"
            ? "https://sklep.muslinove.pl/platnosc_ok"
            : "http://localhost:3000/platnosc_ok",
        zip: order.postalCode,
      };

      window.location.href =
        "https://secure.tpay.com?" + encodeGetParams(params);
    } catch (tpayResError) {
      console.error("Problem z uzyskaniem sumy kontrolnej");
      console.error(tpayResError);
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      const res = await publicRequest.get(`/orders/find/${user._id}`, {
        headers: { token: `Bearer ${user.accessToken}` },
      });
      // console.log(res.data);
      setOrders(res.data);
    };
    user && getOrders();
  }, [user]);

  return (
    <>
      <Navbar />
      <STitle>Moje zamówienia</STitle>
      <Orders>
        {orders.map((order) => (
          <Order key={order.id}>
            <DateStatusInfo>
              <Date>{formatDate(order.createdAt)}</Date>
              <OrderId>Id: {order.id}</OrderId>
              <Status>
                Status: {order.status}
                {order.status === "Nie zapłacone" && (
                  <Button
                    onClick={() => handlePayment(order)}
                    style={{ marginLeft: "1rem" }}
                  >
                    Zapłać
                  </Button>
                )}
              </Status>
            </DateStatusInfo>
            {order.products.map((line) => (
              <OrderLine key={line.product._id}>
                <Image src={line.product.images[1]} />
                <ProductName>
                  <SLink to={`/produkt/${line.product._id}`}>
                    {line.product.title}
                  </SLink>
                </ProductName>
                <QtyPrice>
                  {line.quantity} x {line.product.price} zł
                </QtyPrice>
                <LineTotal>
                  {(line.quantity * line.product.price).toFixed(2)} zł
                </LineTotal>
              </OrderLine>
            ))}

            <OrderTotal>{order.amount} zł</OrderTotal>
          </Order>
        ))}
      </Orders>

      <Footer />
    </>
  );
};

export default Cart;
