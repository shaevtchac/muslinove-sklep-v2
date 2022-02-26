import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Img } from "../components/Reusables";
import { deleteProduct, getProducts } from "../redux/apiCalls";

const Container = styled.div`
  flex: 4;
`;
const ProdName = styled.div`
  display: flex;
  align-items: center;
`;
const ProdImg = styled(Img)`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;
const ActionButtonEdit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDeleteProduct = (id) => {
    deleteProduct(id, dispatch);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "product",
      headerName: "Nazwa ",
      width: 400,
      renderCell: (params) => {
        return (
          <ProdName>
            <ProdImg src={params.row.images[0]} alt="" />
            {params.row.title}
          </ProdName>
        );
      },
    },
    {
      field: "Stock",
      headerName: "Dostępny:",
      width: 100,
      renderCell: (params) => {
        return params.row.inStock ? "Tak" : "Nie";
      },
    },

    {
      field: "price",
      headerName: "Cena",
      type: "number",
      width: 160,
    },
    {
      field: "action",
      headerName: "Akcja",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/produkt/" + params.row._id}>
              <ActionButtonEdit>Edycja</ActionButtonEdit>
            </Link>
            <DeleteOutline
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDeleteProduct(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <Container>
      {products && (
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
    </Container>
  );
};

export default ProductList;
