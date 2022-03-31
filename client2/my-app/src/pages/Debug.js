import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 } from "uuid";

import { useDispatch } from "react-redux";
import { createPost, deletePost } from "../api/apiRequests";
import { Paper, Container, Grid, makeStyles, Button } from "@material-ui/core";
import PostCard from "../components/PostsCard";
import { useLocation } from "react-router-dom";
import Input from "../components/input/Input";

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
  flexColLeft: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "fit-content",
  },
  colItem: {
    marginBottom: "10px",
  },
});

const DebugPage = () => {
  const classes = useStyles(); //for css styling

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

  const mainId = generateID();
  const [name, setName] = useState("");
  const [danger, setDangerLevel] = useState("");
  const [description, setDescription] = useState("");
  const [complexity, setComplexity] = useState("");
  const [links, setLinks] = useState("");
  const [postId, setPostId] = useState("");

  const [nameAdd, setNameAdd] = useState("");
  const [dangerAdd, setDangerAdd] = useState("");
  const [descriptionAdd, setDescriptionAdd] = useState("");
  const [complexityAdd, setComplexityAdd] = useState("");
  const [linksAdd, setLinksAdd] = useState("");

  function generateID() {
    return v4();
  }

  let postFields = {
    name: nameAdd,
    danger: dangerAdd,
    description: descriptionAdd,
    complexity: complexityAdd,
    links: linksAdd,
    mainId: mainId,
    user: "none",
  };

  const addPost = (postFields) => {
    let posts1 = posts.find((item) => item.name === postFields.name);

    if (!posts1) {
      dispatch(
        createPost(
          postFields,
          () => setPosts([...posts, postFields]),
          () => alert("Error")
        )
      );
    } else {
      alert("Title must be unique");
    }
  };

  const removePost = (id) => {
    dispatch(
      deletePost(
        id,
        () => setPosts([...posts.filter((post) => post._id !== id)]),
        () => alert("Error")
      )
    );
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
    })
      .then(() => {
        console.log("post updated");
      })
      .catch((error) => {
        console.error("Error", error);
      });

    const Post = posts.find((post) => post._id === postId);

    if (Post._id === postId) {
      Post.name = name;
      Post.danger = danger;
      Post.description = description;
      Post.complexity = complexity;
      Post.links = links;
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
                value={nameAdd}
                setValue={setNameAdd}
                type="text"
                placeholder="enter name"
              />
              <br />
              <Input
                value={dangerAdd}
                setValue={setDangerAdd}
                type="text"
                placeholder="enter danger level"
              />
              <br />
              <textarea
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  resize: "vertical",
                  maxHeight: "200px",
                }}
                value={descriptionAdd}
                onChange={(e) => {
                  setDescriptionAdd(e.target.value);
                }}
                type="text"
                placeholder="enter description"
              />
              <br />
              <Input
                value={complexityAdd}
                setValue={setComplexityAdd}
                type="text"
                placeholder="enter complexity"
              />
              <br />
              <Input
                value={linksAdd}
                setValue={setLinksAdd}
                type="text"
                placeholder="enter links"
              />
              <br />

              <Button
                color="primary"
                variant="contained"
                onClick={() => addPost(postFields)}
              >
                Push
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} lg={3}>
              <PostCard
                setName={setName}
                setDescription={setDescription}
                setDangerLevel={setDangerLevel}
                setComplexity={setComplexity}
                setLinks={setLinks}
                setPostId={setPostId}
                removePost={removePost}
                updatePost={updatePost}
                post={post}
                posts={posts}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default DebugPage;
