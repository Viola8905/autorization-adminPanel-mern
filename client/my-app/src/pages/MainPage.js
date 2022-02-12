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
import Filter from '../components/Filter';


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

   
  
  
	return (
    <div>
      <Container className={classes.root}>
        {/* //Filtering and sorting section */}
        <Filter/>

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
