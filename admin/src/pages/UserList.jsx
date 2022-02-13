import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Img } from "../components/Reusables";

const Container = styled.div`
  flex: 4;
`;
const UserName = styled.div`
  display: flex;
  align-items: center;
`;
const UserImg = styled(Img)`
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

const UserList = () => {
  const [data, setData] = useState(userRows);
  const handleDeleteUser = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const rows = data;
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "Nazwa użytkownika",
      width: 200,
      renderCell: (params) => {
        return (
          <UserName>
            <UserImg src={params.row.avatar} alt="" />
            {params.row.username}
          </UserName>
        );
      },
    },
    { field: "email", headerName: "E-mail", width: 200 },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transakcje",
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
            <Link to={"/uzytkownik/" + params.row.id}>
              <ActionButtonEdit>Edycja</ActionButtonEdit>
            </Link>
            <DeleteOutline
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDeleteUser(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <Container>
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Container>
  );
};

export default UserList;
