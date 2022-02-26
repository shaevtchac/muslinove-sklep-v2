import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { Card } from "./Reusables";

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;
const Item = styled(Card)`
  flex: 1;
  cursor: pointer;
`;
const Title = styled.span`
  font-size: 1.2rem;
`;
const MoneyContainer = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Money = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;
const MoneyRate = styled.span`
  display: flex;
  align-items: center;
`;
const Subtitle = styled.span`
  font-size: 0.8rem;
  color: gray;
`;

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest("orders/income");
        setIncome(res.data);
        setPerc((res.data[2].total * 100) / res.data[1].total - 100);
        //FIXME: callculation not correct on year chamge monts (dec - jan) correct it
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();
  }, []);

  return (
    <Container>
      <Item>
        <Title>Przychód</Title>
        <MoneyContainer>
          <Money>{income[2]?.total} zł</Money>
          <MoneyRate>
            {Math.round(perc)}%
            {perc < 0 ? (
              <ArrowDownward fontSize="small" htmlColor="red" />
            ) : (
              <ArrowUpward fontSize="small" htmlColor="green" />
            )}
          </MoneyRate>
        </MoneyContainer>
        <Subtitle>W porównaniu do poprzedniego miesiąca</Subtitle>
      </Item>
      <Item>
        <Title>Sprzedaż</Title>
        <MoneyContainer>
          <Money>8 578 zł</Money>
          <MoneyRate>
            - 6.22
            <ArrowDownward fontSize="small" htmlColor="red" />
          </MoneyRate>
        </MoneyContainer>
        <Subtitle>W porównaniu do poprzedniego miesiąca</Subtitle>
      </Item>
      <Item>
        <Title>Koszty</Title>
        <MoneyContainer>
          <Money>3 578 zł</Money>
          <MoneyRate>
            5.15
            <ArrowUpward fontSize="small" htmlColor="green" />
          </MoneyRate>
        </MoneyContainer>
        <Subtitle>W porównaniu do poprzedniego miesiąca</Subtitle>
      </Item>
    </Container>
  );
};

export default FeaturedInfo;
