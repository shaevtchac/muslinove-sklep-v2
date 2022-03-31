import styled from "styled-components";
import { Card, Img, TimeAgoDate } from "./Reusables";
import { userRequest } from "../requestMethods";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled(Card)`
  flex: 2;
`;
const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;
const Table = styled.table`
  width: 100%;
`;
const Header = styled.td`
  font-weight: 900;
`;

const DataCustomer = styled.td`
  font-weight: 600;
`;
const TableRow = styled.tr``;
const DataDate = styled.td`
  color: gray;
`;
const DataAmount = styled.td`
  color: gray;
`;
const Button = styled.button`
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  padding: 2px 5px;
  background: ${(props) =>
    props.type === "Zapłacone"
      ? "#c0ffc0"
      : props.type === "Nie zapłacone"
      ? "#ffbbbb"
      : props.type === "Płatność zwrócona"
      ? "#9ec3ff"
      : "lightgray"};
  color: ${(props) =>
    props.type === "Zapłacone"
      ? "green"
      : props.type === "Nie zapłacone"
      ? "red"
      : props.type === "Płatność zwrócona"
      ? "blue"
      : "black"};
`;

const CellWrapper = styled.td``;

const WidgetLg = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);
  return (
    <Container>
      <Title>Ostatnie Transakcje</Title>
      <Table>
        <tbody>
          <TableRow>
            <Header>Klient</Header>
            <Header>Data</Header>
            <Header>Wartość</Header>
            <Header>Status</Header>
          </TableRow>
          {orders.map((order) => (
            <TableRow key={order._id}>
              {/* <CellWrapper>
                <Img src="data:image/jpeg;base64,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" />
              </CellWrapper> */}
              <DataCustomer>{order.name}</DataCustomer>
              <DataDate>
                <TimeAgoDate dbDate={order.createdAt} />{" "}
              </DataDate>
              <DataAmount>{order.amount}</DataAmount>
              <CellWrapper>
                <Button
                  type={order.status}
                  onClick={() => navigate(`/transakcja/${order._id}`)}
                >
                  {order.status}
                </Button>
              </CellWrapper>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default WidgetLg;
