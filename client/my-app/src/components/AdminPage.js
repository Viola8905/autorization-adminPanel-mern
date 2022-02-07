import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import { createPost, deletePost} from "../actions/apiRequests";
import { Paper, Container, Grid, makeStyles } from "@material-ui/core";
import PostCard from "./PostsCard";
import { useLocation } from "react-router-dom";
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
      function Posts() {
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
      }
      dispatch(Posts());
    }, [params, filter]);
  

  //For adding new post
  const dispatch = useDispatch();

  const [name1, setName1] = useState("");
  const [dangerLevel1, setDangerLevel1] = useState("");
  const [description1, setDescription1] = useState("");
  const [complexity1, setComplexity1] = useState("");
  const [links1, setLinks1] = useState("");
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const mainId = getRandomInt(10, 100);

  let arr = {
    name: name1,
    danger: dangerLevel1,
    description: description1,
    complexity: complexity1,
    links: links1,
    mainId: mainId,
  };

  const addPost = (arr) => {
    let posts1 = posts.find((item) => item.name === arr.name);

    if (!posts1) {
     

      dispatch(
        createPost(
          arr,
          () => setPosts([...posts, arr]),
          () => alert("ERRRROOOR")
        )
      );
      
    } else {
      alert("title must be unique");
    }
  };

	
  //removing post function
	
  const removePost = (id) => {
	
    dispatch(deletePost(id, () => setPosts([...posts.filter((post) => post._id !== id)]), () => alert('ERRRROOOR')));
		
  };

  const [name, setName] = useState("");
  const [danger, setDangerLevel] = useState("");
  const [description, setDescription] = useState("");
  const [complexity, setComplexity] = useState("");
  const [links, setLinks] = useState("");
  const [postId, setPostId] = useState("");

  const selectPost = (post) => {
    setName(post.name);
    setDangerLevel(post.danger);
    setDescription(post.description);
    setComplexity(post.complexity);
    setLinks(post.links);
    setPostId(post._id);
  };

  function updatePost() {
    const post = { name, danger, description, complexity, links };
    fetch(`http://localhost:5000/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(() => {
      console.log("post updated");
    });

    for (let i = 0; i < posts.length; i++) {
      if (posts[i]._id == postId) {
        posts[i].name = name;
        posts[i].danger = danger;
        posts[i].description = description;
        posts[i].complexity = complexity;
        posts[i].links = links;
      }
    }

    setPosts([...posts]);
  }

  return (
    <div>
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Input
                value={name1}
                setValue={setName1}
                type="text"
                placeholder="enter name"
              />
              <br />
              <Input
                value={dangerLevel1}
                setValue={setDangerLevel1}
                type="text"
                placeholder="enter danger level"
              />
              <br />
              <Input
                value={description1}
                setValue={setDescription1}
                type="text"
                placeholder="enter description"
              />
              <br />
              <Input
                value={complexity1}
                setValue={setComplexity1}
                type="text"
                placeholder="enter complexity"
              />
              <br />
              <Input
                value={links1}
                setValue={setLinks1}
                type="text"
                placeholder="enter links"
              />
              <br />

              <button onClick={() => addPost(arr)}>Push</button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <br />

              <input
                type="text"
                value={danger}
                onChange={(e) => {
                  setDangerLevel(e.target.value);
                }}
              />

              <br />
              <input
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <br />
              <input
                type="text"
                value={complexity}
                onChange={(e) => {
                  setComplexity(e.target.value);
                }}
              />
              <br />
              <input
                type="text"
                value={links}
                onChange={(e) => {
                  setLinks(e.target.value);
                }}
              />
              <br />

              <button onClick={() => updatePost()}>Update Post</button>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} lg={3}>
              <PostCard post={post} posts={posts} />

              <button onClick={() => removePost(post._id)}>Delete</button>
              <button onClick={() => selectPost(post)}>Update</button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Admin;
