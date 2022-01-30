import { useState, useEffect } from "react";
import {
 
  Container,
  Grid,
  makeStyles,
	Button
} from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router-dom";

import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
 

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
const ItemPage = () => {
  // Material ui styles
  const dispatch = useDispatch();
  const classes = useStyles();


  const location = useParams();
  //console.log(location);

  let params = parseInt(location.mainId);
  //console.log(typeof params);

  //Component state
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState("");

  //Side effects(loaded data to frontend network)
  useEffect(() => {
    const fetchData = () => {
      return async (dispatch) => {
        try {
          let query;
          if (params && !filter) {
            query = params;
          } else {
            query = filter;
          }

      
          const response = await axios.get(
            `http://localhost:5000/api/posts/${query}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
   
          setPosts(response.data.data);
        } catch (error) {
          console.log(error.response.data);
          localStorage.removeItem("token");
        }
      };
    };

    dispatch(fetchData());
  }, [filter, params]);

  return (
    <Container className={classes.root}>
      {/* //go to main page button */}
      <Link to="/login">
        <Button variant="outlined" size="small">
          Back
        </Button>
      </Link>
     
      {/* //Chosen bootcamp listening */}
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} lg={3}>
            Post number {post.mainId}
            <div className="p"> name: {post.name}</div>
            <div className="p"> description: {post.description}</div>
            <div className="p"> danger: {post.danger}</div>
            <div className="p"> complexity: {post.complexity}</div>
            <div className="p"> links: {post.links}</div>
            <div className="">hello</div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemPage;
