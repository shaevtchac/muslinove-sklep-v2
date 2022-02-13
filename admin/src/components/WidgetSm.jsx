import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Img } from "./Reusables";
import { userRequest } from "../requestMethods";

const Container = styled(Card)`
  flex: 1;
`;
const Title = styled.h3`
  font-size: 1.2rem;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 10px 0;
`;
const User = styled.div``;
const UserName = styled.div`
  font-weight: 600;
`;
const UserTitle = styled.div`
  font-weight: 300;
  font-size: small;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  background: #eeeef7;
  gap: 4px;
  color: #555;
  cursor: pointer;
`;

const WidgetSm = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <Container>
      <Title>Nowi użytkownicy</Title>
      <List>
        {users.map((user) => (
          <ListItem key={user._id}>
            <Img
              src={
                user.img ||
                "https://smart-be.pl/wp-content/uploads/2016/07/no-avatar-300x300.jpg"
              }
            />
            <User>
              <UserName>{user.userName}</UserName>
            </User>
            <Button>
              Pokaż
              <Visibility fontSize="small" />
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default WidgetSm;
