import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import MainSlider from "../Components/MainSlider/MainSlider";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products";

const Home = () => {
  return (
    <>
      <Navbar />
      <MainSlider />;
      <Categories />
      <Products />
      <Footer />
    </>
  );
};

export default Home;
