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
  const [severityLevel1, setSeverityLevel1] = useState("");
  const [description1, setDescription1] = useState("");
  const [complexity1, setComplexity1] = useState("");
  const [fixes1, setFixes1] = useState("");
	const [version1, setVersion1] = useState("");
	const [operationSystem1, setOperationSystem1] = useState("");
	
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const mainId = getRandomInt(10, 100);

  let arr = {
    name: name1,
    severity: severityLevel1,
    description: description1,
    complexity: complexity1,
    fixes: fixes1,
		version:version1,
		operationSystem : operationSystem1,
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
                value={severityLevel1}
                setValue={setSeverityLevel1}
                type="text"
                placeholder="enter severity level"
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
                value={fixes1}
                setValue={setFixes1}
                type="text"
                placeholder="enter fixes"
              />
              <Input
                value={version1}
                setValue={setVersion1}
                type="text"
                placeholder="enter version"
              />
              <Input
                value={operationSystem1}
                setValue={setOperationSystem1}
                type="text"
                placeholder="enter operationSystem"
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
