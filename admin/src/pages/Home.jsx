import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import WidgetLg from "../components/WidgetLg";
import WidgetSm from "../components/WidgetSm";
import { userData } from "../dummyData";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  flex: 4;
  padding: 0 20px;
`;
const HomeWidgets = styled.div`
  display: flex;
  gap: 20px;
`;

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Sty",
      "Lut",
      "Mar",
      "Kwi",
      "Maj",
      "Cze",
      "Lip",
      "Sie",
      "Wrz",
      "Paz",
      "Lis",
      "Gru",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);
  return (
    <Container>
      <FeaturedInfo />
      <Chart data={userStats} title="Użytkownicy" dataKey="Active User" grid />
      <HomeWidgets>
        <WidgetSm />
        <WidgetLg />
      </HomeWidgets>
    </Container>
  );
};

export default Home;
