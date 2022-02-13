import { useState, useEffect } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
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
import Filter from "../components/Filter";
import PostGallery from "../components/PostGallery";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  
  paper: {
    marginBottom: "1rem",
    padding: 20,
  },
  
});

const UserPage = () => {
  // Material ui styles
  const dispatch = useDispatch();
  const classes = useStyles();
	const userName = useSelector((state) => state.user.currentUser.username);
  //Component state
 
  //Side effects(loaded data to frontend network)
 

  //Posts filtering


  

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
		user: userName,
  };

  const addPost = (arr) => {
    dispatch(createReqPost(arr));
  };

  return (
    <div>
      <Container className={classes.root}>
        {/* //Filtering and sorting section */}
        <Filter />

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
        <PostGallery/>
      </Container>
    </div>
  );
};

export default UserPage;
