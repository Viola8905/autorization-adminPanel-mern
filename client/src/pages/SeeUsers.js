import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Paper,
  Typography,
  Container,
  Grid,
  Card,
  CardHeader,
  Button,
} from "@material-ui/core";
import { deleteUser } from "../api/apiRequests";
import BackBtn from "../components/backBtn/BackBtn";

const SeeUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const [filter, setFilter] = useState("");

  const location = useLocation();

  const params = location.search ? location.search : null;

  const dispatch = useDispatch();

  useEffect(() => {
    function Users() {
      return async (dispatch) => {
        try {
          let query;
          if (params && !filter) {
            query = params;
          } else {
            query = filter;
          }
          const response = await axios.get(
            `http://localhost:5000/api/users${query}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setAllUsers(response.data);
        } catch (e) {
          console.log(e.response.data);
          localStorage.removeItem("token");
        }
      };
    }
    dispatch(Users());
  }, [params, filter]);

  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const handleChange = (event) => {
    setUserName(event.target.value);
  };
  function Filtering() {
    navigate(`?username[regex]=${username}`);
  }
  function showAllUsers() {
    navigate(``);
  }

  function deleteChosenUser(user) {
    dispatch(
      deleteUser(
        user._id,
        () =>
          setAllUsers([...allUsers.filter((user1) => user1._id !== user._id)]),
        () => alert("Error")
      )
    );
  }
  //For adding new post

  return (
    <div className="">
      <Container>
        <BackBtn />
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            padding: "20px 0",
            backgroundColor: "#d0dbdb",
            fontWeight: "700",
          }}
        >
          Усі користувачі
        </div>

        <Paper className="">
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom style={{ marginTop: "20px" }}>
                Знайти користувача
              </Typography>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  padding: "0 10px 0 10px",
                }}
              >
                <input
                  type="text"
                  onInput={handleChange}
                  placeholder="введіть ім'я користувача"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={Filtering}
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                >
                  Шукати
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={showAllUsers}
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                >
                  Показати Всіх
                </Button>
              </div>

              <br />
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={2} style={{ marginTop: "30px" }}>
          {allUsers.map((user) => (
            <Grid item key={user._id} xs={12} sm={6} lg={3}>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardHeader
                  title={<Typography variant="h6">{user.username}</Typography>}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteChosenUser(user)}
                  style={{}}
                >
                  Видалити Користувача
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default SeeUsers;
