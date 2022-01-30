import React from 'react';
import { useState, useEffect } from "react";

import axios from "axios";
import { useDispatch} from "react-redux";
import { createPost, deletePost } from "../actions/apiRequests";
import {
  Paper,
 
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import PostCard from "./PostsCard";
import { useLocation,  } from "react-router-dom";
import Input from "./input/Input";

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

 
const Admin = () => {
  const classes = useStyles(); //for css styling

  //Side effects(loaded posts to frontend network)
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState("");

  const location = useLocation();

  const params = location.search ? location.search : null;

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




	//For adding new post
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [dangerLevel, setDangerLevel] = useState("");
  const [description, setDescription] = useState("");
  const [complexity, setComplexity] = useState("");
  const [links, setLinks] = useState("");
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const mainId = getRandomInt(10, 100);

  let arr = {
    name: name,
    danger: dangerLevel,
    description: description,
    complexity: complexity,
    links: links,
    mainId: mainId,
  };

  const addPost = (arr) => {
    let posts1 = posts.find((item) => item.name === arr.name);

    if (!posts1) {
      setPosts([...posts, arr]);

      dispatch(createPost(arr));
      //alert("post was added");
    } else {
      //alert("post already exists");
    }
  };



//removing post function
  const removePost = (id) => {
    dispatch(deletePost(id));

    setPosts([...posts.filter((post) => post._id !== id)]);
  };

  return (
    <div>
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Input
                value={name}
                setValue={setName}
                type="text"
                placeholder="enter name"
              />
              <br />
              <Input
                value={dangerLevel}
                setValue={setDangerLevel}
                type="text"
                placeholder="enter danger level"
              />
              <br />
              <Input
                value={description}
                setValue={setDescription}
                type="text"
                placeholder="enter description"
              />
              <br />
              <Input
                value={complexity}
                setValue={setComplexity}
                type="text"
                placeholder="enter complexity"
              />
              <br />
              <Input
                value={links}
                setValue={setLinks}
                type="text"
                placeholder="enter links"
              />
              <br />

              <button onClick={() => addPost(arr)}>Push</button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} lg={3}>
              <PostCard post={post} posts={posts} />
              <button onClick={() => removePost(post._id)}>Delete</button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Admin;
