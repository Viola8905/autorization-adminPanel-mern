import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  Paper,
  Typography,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { deleteUser } from "../api/apiRequests";

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
          const response = await axios.get(`http://localhost:5000/api/users${query}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          //console.log(response.data.data);
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
     navigate(
       `?username[regex]=${username}`
     );
   }
		function showAllUsers() {
			navigate(``);
		}



		function deleteChosenUser(user) {
      dispatch(
        deleteUser(
          user._id,
          () =>
            setAllUsers([
              ...allUsers.filter((user1) => user1._id !== user._id),
            ]),
          () => alert("ERRRROOOR")
        )
      );
    }
  //For adding new post

  return (
    <div className="">
      <Container>
        <Link to="/user">
          <Button variant={"outline-dark"} size="small">
            Back
          </Button>
        </Link>
        <div
          style={{ textAlign: "center", fontSize: "20px", padding: "20px 0" }}
        >
          All Users
        </div>

        <Paper className="">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Find user</Typography>

              <input
                type="text"
                onInput={handleChange}
                placeholder="type username"
              />
              <button onClick={Filtering}> Push</button>
              <br />

              <button onClick={showAllUsers}> Show All</button>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={2}>
          {allUsers.map((user) => (
            <Grid item key={user._id} xs={12} sm={6} lg={3}>
              <div>{user.username}</div>

              <button className="button" onClick={() => deleteChosenUser(user)}>
              
                delete user
              </button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default SeeUsers;
