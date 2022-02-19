import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useStyles } from "../styles/global";
import { Container, Grid, Button } from "@material-ui/core";

const ItemPage = () => {
  // Material ui styles
  const dispatch = useDispatch();
  const classes = useStyles();

  const role = useSelector((state) => state.user.role);
  const isAuth = useSelector((state) => state.user.isAuth);
  const location = useParams();

  let params = parseInt(location.mainId);

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
      {!isAuth ? (
        <Link to="/">
          <Button variant="outlined" size="small">
            Back
          </Button>
        </Link>
      ) : (
        <Link to="/user">
          <Button variant="outlined" size="small">
            Back
          </Button>
        </Link>
      )}

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
