import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Typography,
  Container,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";
import Input from "../components/input/Input";
import { createReqPost } from "../api/apiRequests";
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
  inputField: {
    padding: "5px",
    marginBottom: "10px",
  },
});

const UserPage = () => {
  // Material ui styles
  const dispatch = useDispatch();
  const classes = useStyles();
  const userName = useSelector((state) => state.user.currentUser.username);

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
              <Input
                className={classes.inputField}
                value={dangerLevel1}
                setValue={setDangerLevel1}
                type="text"
                placeholder="enter danger level"
              />
              <Input
                value={description1}
                setValue={setDescription1}
                type="text"
                placeholder="enter description"
              />
              <Input
                value={complexity1}
                setValue={setComplexity1}
                type="text"
                placeholder="enter complexity"
              />
              <Input
                value={links1}
                setValue={setLinks1}
                type="text"
                placeholder="enter links"
              />
              <Button
                color="primary"
                variant="contained"
                onClick={() => addPost(arr)}
              >
                Push
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* //Posts listening */}
        <PostGallery />
      </Container>
    </div>
  );
};

export default UserPage;
