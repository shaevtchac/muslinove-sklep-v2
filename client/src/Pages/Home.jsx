import styled from "@emotion/styled";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import MainSlider from "../Components/MainSlider/MainSlider";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products";
import { Title } from "../Reusables/StyledParts";
const STitle = styled(Title)`
  text-align: center;
  margin-block: 1rem;
`;

const Home = () => {
  return (
    <>
      <Navbar />
      <MainSlider />;
      <Categories />
      <STitle>Popularne produkty</STitle>
      <Products />
      <Footer />
    </>
  );
};

export default Home;
