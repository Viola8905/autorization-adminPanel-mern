import React from 'react';
import { useState, useEffect } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import {
  Paper,
  Typography,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import PostCard from "../components/PostsCard";
import { useLocation, useNavigate } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginBottom: "1rem",
    padding: 20,
  },
  filters: {
    padding: " 0 1.5rem",
  },
  priceRangeInputs: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const MainPage = () => {
	 const dispatch = useDispatch();
   const classes = useStyles();

   //Component state
   const [posts, setPosts] = useState([]);

   const [filter, setFilter] = useState("");

   const location = useLocation();

   const params = location.search ? location.search : null;

   //Side effects(loaded data to frontend network)
   useEffect(() => {
     const Posts = () => {
       return async (dispatch) => {
         try {
           let query;
           if (params && !filter) {
             query = params;
           } else {
             query = filter;
           }
           const response = await axios.get(
             `http://localhost:5000/api/posts${query}`,
             {
               headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
             }
           );
           //console.log(response.data.data);
           setPosts(response.data.data);
         } catch (e) {
           console.log(e.response.data);
           localStorage.removeItem("token");
         }
       };
     };
     dispatch(Posts());
   }, [params, filter]);

   //Posts filtering

   const navigate = useNavigate();

   const [level, setLevel] = useState("");
   const [title, setTitle] = useState("");
   const [danger, setDanger] = useState("");

   const handleChange1 = (event) => {
     setLevel(event.target.value);
   };
   const handleChange2 = (event) => {
     setTitle(event.target.value);
   };
   const handleChange3 = (event) => {
     setDanger(event.target.value);
   };
  
   
   function f4() {
     navigate(``);
   }


	  function Filtering() {
      navigate(
        `?complexity[regex]=${level}&&name[regex]=${title}&&danger[regex]=${danger}`
      ); 
    }


  
  
	return (
    <div>
      <Container className={classes.root}>
        {/* //Filtering and sorting section */}
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Filters</Typography>

              <input
                type="text"
                onInput={handleChange1}
                placeholder="type level of complexity"
              />
              <button onClick={Filtering}> Push</button>
              <br />
              <input
                type="text"
                onInput={handleChange2}
                placeholder="type title"
              />
              <button onClick={Filtering}> Push</button>
              <br />
              <input
                type="text"
                onInput={handleChange3}
                placeholder="type level of danger"
              />
              <button onClick={Filtering}> Push</button>
              <br />

              <button onClick={f4}> Show All</button>
            </Grid>
          </Grid>
        </Paper>

        {/* //Posts listening */}
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} lg={3}>
              <PostCard post={post} posts={posts} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default MainPage;
