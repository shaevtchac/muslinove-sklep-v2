import { Publish } from "@material-ui/icons";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { DefaultEditor } from "react-simple-wysiwyg";
import sanitizeHtml from "sanitize-html";
import styled from "styled-components";
import Chart from "../components/Chart";
import ProductSlider from "../components/ProductSlider";
import { Button, Card, ColorDot, Img, Label } from "../components/Reusables";
import { categories, colors } from "../data";
import {
  addProduct,
  removeProductPicture,
  updateProduct,
  uploadProductPicture,
} from "../redux/apiCalls";
import { resetNewProductId } from "../redux/productRedux";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  flex: 4;
  padding: 20px;
`;
const Title = styled.h1``;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Top = styled.div`
  display: flex;
  gap: 20px;
`;
const TopLeft = styled.div`
  flex: 1;
`;
const TopRight = styled(Card)`
  flex: 1;
  margin: 20px 0;
`;
const Bottom = styled.div`
  margin-top: 10px;
`;
const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;
`;
const ProductName = styled.div`
  font-weight: 600;
  margin-left: 1rem;
`;
const ProductInfoBottom = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProductInfoKey = styled.div`
  font-weight: 300;
`;
const ProductInfoValue = styled.div``;
const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
`;
const ProductFormLeft = styled.div`
  width: 45%;
  display: grid;
  align-items: flex-start;
  gap: 5px;
  > Label {
    margin-top: 5px;
  }
`;

const ColorPicker = styled.div`
  display: none;
  gap: 2px;
  flex-wrap: wrap;
`;
const ColorPickerWrapper = styled.div`
  display: flex;
  gap: 1rem;
  &:hover ${ColorPicker} {
    display: flex;
  }
`;

const ProductFormRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
const ProductSliderContainer = styled.div`
  position: relative;
  width: 100%;
`;
const ProductUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ImgageList = styled.ol`
  margin-top: 1rem;
`;
const ImageListItem = styled.li``;
const ImagelistButton = styled.button`
  border: none;
  background: teal;
  color: white;
  float: right;
  margin-left: 1rem;
`;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
//-------------------------------------------------------------------------------------------------------------------------------
const Product = () => {
  const [pStats, setPStats] = useState([]);
  const [html, setHtml] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const newProductId = useSelector((state) => state.product.newProductId);
  const error = useSelector((state) => state.product.error);
  const isFetching = useSelector((state) => state.product.isFetching);
  const [inputs, setInputs] = useState(product);
  const dispatch = useDispatch();
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
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  const handleChangeInputs = (e) => {
    setInputs((prev) => {
      // console.log(e.target.name, e.target.value);
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleChangeCategories = (event, value, reason) => {
    // console.log(value, reason);
    setInputs((prev) => {
      return { ...prev, categories: value.map((item) => item.cat) };
    });
  };
  const handleChangeInStock = (e) => {
    setInputs((prev) => {
      return { ...prev, inStock: e.target.checked };
    });
  };

  const handleColorPickerClick = (color) => {
    setInputs((prev) => {
      return { ...prev, color };
    });
  };
  const handleDescChange = (e) => {
    setHtml(e.target.value);
  };
  const handleUpdateButtonClick = (e) => {
    e.preventDefault();
    const desc = sanitizeHtml(html);
    const product = { ...inputs, desc };
    updateProduct(productId, product, dispatch);
    setOpenSnackBar(true);
  };
  const handleRemoveImageButtonClick = (e, imgNo) => {
    e.preventDefault();
    removeProductPicture(productId, product.images, imgNo, dispatch);
  };
  const handleFileUpload = (e) => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("id", productId);
    uploadProductPicture(productId, formData, product.images, dispatch);
  };
  const handleCreateNewButtonClick = (e) => {
    e.preventDefault();
    addProduct({}, dispatch);
  };

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  useEffect(() => {
    setHtml(product.desc);
  }, [product.desc, product]);

  useEffect(() => {
    if (newProductId) {
      navigate("/edytuj_produkt/" + newProductId);
      dispatch(resetNewProductId());
      window.location.reload();
    }
  }, [newProductId, navigate, dispatch]);

  return (
    <Container>
      <TitleWrapper>
        <Title>Produkt</Title>
        <Button filled onClick={handleCreateNewButtonClick}>
          Nowy
        </Button>
      </TitleWrapper>
      <Top>
        <TopLeft>
          <Chart data={pStats} dataKey="Sales" title="Sprzedaż" />
        </TopLeft>
        <TopRight>
          <ProductInfoTop>
            <Img src={product.images[0]} />
            <ProductName>{product.title}</ProductName>
          </ProductInfoTop>
          <ProductInfoBottom>
            <ProductInfoKey>id: </ProductInfoKey>
            <ProductInfoValue>{product._id}</ProductInfoValue>
          </ProductInfoBottom>
          <ProductInfoBottom>
            <ProductInfoKey>Sprzedaż:</ProductInfoKey>
            <ProductInfoValue>5123 zł</ProductInfoValue>
          </ProductInfoBottom>

          <ProductInfoBottom>
            <ProductInfoKey>Dostępny:</ProductInfoKey>
            <ProductInfoValue>{product.inStock}</ProductInfoValue>
          </ProductInfoBottom>
        </TopRight>
      </Top>
      <Bottom>
        <ProductForm>
          <ProductFormLeft>
            <TextField
              label="Nazwa Produktu:"
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleChangeInputs}
            />
            <TextField
              label="Cena"
              type="number"
              name="price"
              value={inputs.price}
              onChange={handleChangeInputs}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">zł</InputAdornment>
                ),
              }}
              sx={{ width: "7rem", marginTop: "1rem" }}
            />
            <Autocomplete
              multiple
              id="tags-outlined"
              options={categories}
              getOptionLabel={(option) => option.title}
              value={categories.filter((cat) =>
                inputs.categories?.includes(cat.cat)
              )}
              onChange={handleChangeCategories}
              sx={{ marginTop: "1rem" }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Kategorie:"
                  placeholder="Wybierz kategorie produktu"
                />
              )}
            />
            <Label>Kolor:</Label>{" "}
            <ColorPickerWrapper>
              <ColorDot
                color={colors.find((item) => item.id == inputs.color)?.colorCSS}
              />
              <ColorPicker>
                {colors.map((item) => (
                  <Tooltip key={item.id} title={item.name}>
                    <ColorDot
                      style={{ margin: "0" }}
                      color={item.colorCSS}
                      onClick={() => handleColorPickerClick(item.id)}
                    />
                  </Tooltip>
                ))}
              </ColorPicker>
            </ColorPickerWrapper>
            <Label>Dostępny:</Label>
            <Switch
              onChange={handleChangeInStock}
              defaultChecked={product.inStock}
            />
            <Label>Opis:</Label>
            <DefaultEditor
              value={html}
              name="desc"
              onChange={handleDescChange}
            />
            <Button
              onClick={handleUpdateButtonClick}
              style={{ cursor: isFetching && "not-allowed" }}
            >
              Zapisz
            </Button>
          </ProductFormLeft>
          <ProductFormRight>
            <ProductSliderContainer>
              <ProductSlider imgSrcArray={product.images} />
            </ProductSliderContainer>
            <ImgageList>
              {product.images.map((imgSrc, index) => (
                <ImageListItem key={imgSrc}>
                  {imgSrc}

                  <ImagelistButton
                    onClick={(e) => handleRemoveImageButtonClick(e, index)}
                  >
                    usuń
                  </ImagelistButton>
                </ImageListItem>
              ))}
            </ImgageList>
            <ProductUpload>
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => handleFileUpload(e)}
              />
            </ProductUpload>
          </ProductFormRight>
        </ProductForm>
      </Bottom>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error ? "Nie udało się zapisać :(" : "Zapisane :)"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Product;
