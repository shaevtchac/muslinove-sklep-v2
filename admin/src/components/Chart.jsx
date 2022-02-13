import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Container = styled.div`
  margin: 20px 0;
  padding: 20px;
  box-shadow: 0 0 15px -5px gray;
  border-radius: 10px;
`;
const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 1.2rem;
`;

const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Chart;
