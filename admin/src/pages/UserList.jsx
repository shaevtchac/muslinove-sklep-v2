import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteUser, getUsers } from "../redux/apiCalls";

const Container = styled.div`
  flex: 4;
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
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const handleDeleteUser = (id) => {
    deleteUser(id, dispatch);
  };
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "name",
      headerName: "Nazwa użytkownika",
      width: 200,
    },
    { field: "email", headerName: "E-mail", width: 200 },
    {
      field: "adres",
      headerName: "Adres",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            {params.row.address}, <br />
            {params.row.postalCode} {params.row.city}
          </>
        );
      },
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
            {/* disable delete option for admin and "unregistered user" accounts */}
            {!params.row.isAdmin
              ? params.row.id !== "6228682b4ab3a9d1ab3b1a03" && (
                  <DeleteOutline
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDeleteUser(params.row.id)}
                  />
                )
              : null}
          </>
        );
      },
    },
  ];
  return (
    <Container>
      <DataGrid
        rows={users}
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
