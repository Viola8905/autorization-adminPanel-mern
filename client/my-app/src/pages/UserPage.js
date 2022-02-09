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
import Input from "../components/input/Input"
import { createPost, createReqPost } from "../api/apiRequests";

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

const UserPage = () => {
  // Material ui styles
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
  
  

	function PostFilter () {
	
		 navigate(
       `?complexity[regex]=${level}&&name[regex]=${title}&&danger[regex]=${danger}`
     );
		
	}
  
  function f4() {
    navigate(``);
  }

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
    dispatch(createReqPost(arr));
  };

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
              <button onClick={() => PostFilter()}> Push</button>
              <br />
              <input
                type="text"
                onInput={handleChange2}
                placeholder="type title"
              />
              <button onClick={() => PostFilter()}> Push</button>
              <br />
              <input
                type="text"
                onInput={handleChange3}
                placeholder="type level of danger"
              />
              <button onClick={() => PostFilter()}> Push</button>
              <br />

              <button onClick={f4}> Show All</button>
            </Grid>
          </Grid>
        </Paper>

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

export default UserPage;
