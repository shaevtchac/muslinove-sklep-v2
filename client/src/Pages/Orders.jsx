import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { mobile } from "../responsive";
import { Button, Title } from "../Reusables/StyledParts";
import * as templateColors from "../Reusables/Constants/Colors";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { Link } from "react-router-dom";

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
  const translateStatus = (status) => {
    switch (status) {
      case "paid":
        return "Zapłacone - w trakcie przygotowania";
      case "sent":
        return "Wysłane";
      case "pending":
        return "Oczekuje na płatność";
      case "chargeback":
        return "Płatność zwrócona";
      default:
        return status;
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      const res = await userRequest.get(`/orders/find/${user._id}`);
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
                Status: {translateStatus(order.status)}{" "}
                {order.status === "pending" && (
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
                  <Link to={`/produkt/${line.product._id}`}>
                    {line.product.title}
                  </Link>
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
