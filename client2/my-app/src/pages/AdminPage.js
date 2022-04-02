import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import { createPost, deletePost } from "../api/apiRequests";
import { Paper, Container, Grid, makeStyles } from "@material-ui/core";
import PostCard from "../components/ConfirmedPostsCard";
import { useLocation } from "react-router-dom";
import Input from "../components/input/Input";
import { v4 } from "uuid";

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

  // Side effects(loaded posts to frontend network)

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

  const [name1, setName1] = useState("");
  const [severity1, setSeverity1] = useState("");
  const [description1, setDescription1] = useState("");
  const [complexity1, setComplexity1] = useState("");
  const [fixes1, setFixes1] = useState("");
	const [version1, setVersion1] = useState("");
	const [operationSystem1, setOperationSystem1] = useState("");

  function generateID() {
    return v4();
  }

  const mainId = generateID();

  let arr = {
    name: name1,
    severity: severity1,
    description: description1,
    complexity: complexity1,
    fixes: fixes1,
		version:version1,
    mainId: mainId,
		operationSystem: operationSystem1,
    user: "none",
  };

  const addPost = (arr) => {
    let posts1 = posts.find((item) => item.name === arr.name);

    if (!posts1) {
      dispatch(
        createPost(
          arr,
          () => setPosts([...posts, arr]),
          () => alert("Error")
        )
      );
    } else {
      alert("title must be unique");
    }
  };

  //removing post function

  const removePost = (id) => {
    dispatch(
      deletePost(
        id,
        () => setPosts([...posts.filter((post) => post._id !== id)]),
        () => alert("ERRRROOOR")
      )
    );
  };

  const [name, setName] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [complexity, setComplexity] = useState("");
  const [fixes, setFixes] = useState("");
  const [postId, setPostId] = useState("");
  const [version, setVersion] = useState("");
  const [operationSystem, setOperationSystem] = useState("");

  const selectPost = (post) => {
    setName(post.name);
    setSeverity(post.severity);
    setDescription(post.description);
    setComplexity(post.complexity);
    setFixes(post.fixes);
    setPostId(post._id);
		setVersion(post.version);
		setOperationSystem(post.operationSystem);
  };

  function updatePost() {
    const post = { name, severity, description, complexity, fixes,version,operationSystem };
		console.log(post)
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

    for (let i = 0; i < posts.length; i++) {
      if (posts[i]._id == postId) {
        posts[i].name = name;
        posts[i].severity = severity;
        posts[i].description = description;
        posts[i].complexity = complexity;
        posts[i].fixes = fixes;
				posts[i].version = version;
				posts[i].operationSystem = operationSystem;
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
                value={severity1}
                setValue={setSeverity1}
                type="text"
                placeholder="enter danger level"
              />
              <br />
              <textarea
                value={description1}
                onChange={(e) => {
                  setDescription1(e.target.value);
                }}
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
                value={fixes1}
                setValue={setFixes1}
                type="text"
                placeholder="enter fixes"
              />
              <br />
              <input
                type="text"
                value={version1}
                onChange={(e) => {
                  setVersion(e.target.value);
                }}
              />
              <br />
              <input
                type="text"
                value={operationSystem1}
                onChange={(e) => {
                  setOperationSystem(e.target.value);
                }}
              />

              <button onClick={() => addPost(arr)}>Pussssh</button>
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
                value={severity}
                onChange={(e) => {
                  setSeverity(e.target.value);
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
                value={fixes}
                onChange={(e) => {
                  setFixes(e.target.value);
                }}
              />
              <br />
              <input
                type="text"
                value={version}
                onChange={(e) => {
                  setVersion(e.target.value);
                }}
              />
              <br />
              <input
                type="text"
                value={operationSystem}
                onChange={(e) => {
                  setOperationSystem(e.target.value);
                }}
              />

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
