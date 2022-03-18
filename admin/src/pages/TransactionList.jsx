import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  plPL,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getTransactions, updateTransaction } from "../redux/apiCalls";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#92bea3",
      },
      secondary: {
        main: "#97be92",
      },
    },
  },
  plPL
);

const Container = styled.div`
  flex: 4;
`;

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.transactions);

  const handleUpdateOrder = (params) => {
    updateTransaction(
      { id: params.id, [params.field]: params.value },
      dispatch
    );
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    getTransactions(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "name", headerName: "Imię i nazwisko klienta", width: 200 },
    {
      field: "adres",
      headerName: "Adres do wysyłki",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.row.address}, <br />
            {params.row.postalCode} {params.row.city}
          </>
        );
      },
    },
    { field: "message", headerName: "Wiadomość od klienta", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "Nie zapłacone",
        "Zapłacone",
        "Płatność zwrócona",
        "W trakcie przygotowania",
        "Wysłane",
      ],
    },
    {
      field: "kwota",
      headerName: "Kwota",
      type: "number",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.amount} {" zł"}
          </>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Data",
      type: "dateTime",
      width: 200,
      valueGetter: ({ value }) => value && new Date(value),
      // renderCell: (params) => {
      //   return {};
      // },
    },
    { field: "id", headerName: "ID", width: 200 },
  ];
  const transformStatusToClassName = (status) => {
    switch (status) {
      case "Zapłacone":
        return "paid";
      case "Nie zapłacone":
        return "pending";
      case "Płatność zwrócona":
        return "chargeback";
      case "W trakcie przygotowania":
        return "in-preparation";
      default:
        return;
    }
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: "calc(100vh - 60px)",
            "& .paid": {
              bgcolor: "#f0fff0",
            },
            "& .pending": {
              bgcolor: "#fff0f0",
            },

            "& .chargeback": {
              bgcolor: "#f0f5ff",
            },
            "& .in-preparation": {
              bgcolor: "#fffff0",
            },
          }}
        >
          <DataGrid
            rows={transactions}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            checkboxSelection
            getRowClassName={(params) =>
              transformStatusToClassName(params.row.status)
            }
            onSelectionModelChange={(selection) => {
              console.log(selection);
            }}
            components={{
              Toolbar: CustomToolbar,
            }}
            onCellEditCommit={(params) => handleUpdateOrder(params)}
          />
        </Box>
      </ThemeProvider>
    </Container>
  );
};

export default TransactionList;
