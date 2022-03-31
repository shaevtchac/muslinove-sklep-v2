import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import {
  Button,
  Card,
  TimeAgoDate,
  DateTimeFormatted,
  Input,
} from "../components/Reusables";
import MenuItem from "@mui/material/MenuItem";
import { statusOptions } from "../components/Constants/StatusOptions";
import { updateTransaction } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const Container = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;
const Details = styled(Card)`
  flex-grow: 1;
`;
const Products = styled(Card)`
  flex-grow: 3;
`;
const ProductLine = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 210px 1fr 50px 100px;
`;
const ProductHeaders = styled(ProductLine)`
  font-weight: 700;
`;

const TransactionDetails = () => {
  const location = useLocation();
  const transactionId = location.pathname.split("/")[2];
  const [transaction, setTransaction] = useState({});
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    updateTransaction({ id: transactionId, status: e.target.value }, dispatch);
  };
  useEffect(() => {
    const getTransaction = async () => {
      try {
        const res = await userRequest.get(`orders/${transactionId}`);
        setTransaction(res.data);
        setStatus(res.data.status);
      } catch (error) {
        console.error(error);
        console.error(error.response.data);
      }
    };
    getTransaction();
  }, [transactionId]);

  return (
    <Container>
      <Details>
        <Button filled onClick={() => navigate(-1)}>
          Powrót
        </Button>
        <br />
        <br />
        <b>Szczegóły transakcji:</b> <br />
        <p>
          <b>id: </b>
          {transaction.id}
        </p>
        <p>
          <b>Wartość zamówienia: </b>
          {transaction.amount} zł
        </p>
        <p>
          <b>Status: </b>
          <br />
        </p>
        {transaction.status && (
          <Input select value={status} onChange={handleStatusChange}>
            {statusOptions.map((status) => {
              return (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              );
            })}
          </Input>
        )}
        <p>
          <b>Data zamówienia: </b>
          <TimeAgoDate dbDate={transaction.createdAt} />{" "}
          {transaction.createdAt && (
            <DateTimeFormatted dbDate={transaction.createdAt} />
          )}
        </p>
        <p>
          <b>Adres do wysyłki</b>
        </p>
        <p>{transaction.name}</p>
        <p>{transaction.address}</p>
        <p>{transaction.postalCode}</p>
        <p>{transaction.city}</p>
        <p>
          <b>Wiadomość od kupującego:</b>
        </p>
        <p>{transaction.message ? transaction.message : "brak"}</p>
      </Details>
      <Products>
        <h3>Produkty</h3>
        <ProductHeaders>
          <span>id produktu</span>
          <span>Nazwa produktu</span>
          <span>ilość</span>
          <span>kolor</span>
        </ProductHeaders>
        {transaction.products &&
          transaction.products.map((item, index) => (
            <ProductLine key={item.product ? item.product._id : index}>
              <span>{item.product && item.product._id} </span>
              <span>{item.product && item.product.title} </span>
              <span>{item.quantity}</span>
              <span>{item.product && item.product.color}</span>
            </ProductLine>
          ))}
      </Products>
    </Container>
  );
};

export default TransactionDetails;
