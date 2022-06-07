import React from "react";
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

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Input from "../components/input/Input";
import { createReqPost } from "../api/apiRequests";
import BackBtn from "../components/backBtn/BackBtn";

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
const CreatePostU = () => {
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
  const [developer1, setDeveloper1] = useState("");
  const [platform1, setPlatform1] = useState("");

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
    version: version1,
    operationSystem: operationSystem1,
    developer: developer1,
    platform: platform1,
    mainId: mainId,
    user: userName,
  };

  const addPost = (arr) => {
    dispatch(createReqPost(arr));
    setName1("");
    setSeverityLevel1("");
    setDescription1("");
    setComplexity1("");
    setFixes1("");
    setVersion1("");
    setOperationSystem1("");
    setDeveloper1("");
    setPlatform1("");
  };

  return (
    <Container className={classes.root}>
      {/* //Filtering and sorting section */}
      <BackBtn />

      <Paper className={classes.paper}>
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: "700",
              margin: "20px 0",
              color: "#4287f5",
            }}
          >
            Запропонуйте свій пост!
          </span>
          <Input
            value={name1}
            setValue={setName1}
            type="text"
            placeholder="enter name"
          />
          <br />
          <InputLabel id="demo-simple-select-label">Severity</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={severityLevel1}
            label="Severity"
            onChange={(e) => setSeverityLevel1(e.target.value)}
            style={{ minWidth: "70%" }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
          <br />
          <br />
          <textarea
            value={description1}
            onChange={(e) => {
              setDescription1(e.target.value);
            }}
            type="text"
            placeholder="enter description"
            style={{
              width: "210px",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid gray",
              borderRadius: "5px",
              minWidth: "70%",
            }}
          />
          <br />
          <InputLabel id="demo-simple-select-label">Complexity</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={complexity1}
            label="Complexity"
            onChange={(e) => setComplexity1(e.target.value)}
            style={{ minWidth: "70%" }}
          >
            <MenuItem value={"low"}>Low</MenuItem>
            <MenuItem value={"middle"}>Middle</MenuItem>
            <MenuItem value={"hard"}>Hard</MenuItem>
          </Select>
          <br />
          <br />
          <Input
            value={fixes1}
            setValue={setFixes1}
            type="text"
            placeholder="enter fixes"
          />
          <br />
          <Input
            value={version1}
            setValue={setVersion1}
            type="text"
            placeholder="enter version"
          />
          <br />
          <Input
            value={operationSystem1}
            setValue={setOperationSystem1}
            type="text"
            placeholder="enter operation system"
          />
          <br />
          <Input
            value={developer1}
            setValue={setDeveloper1}
            type="text"
            placeholder="enter developer"
          />
          <br />
          <InputLabel id="demo-simple-select-label">Platform</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={platform1}
            label="Platform"
            onChange={(e) => setPlatform1(e.target.value)}
            style={{ minWidth: "70%" }}
          >
            <MenuItem value={"windows"}>Windows</MenuItem>
            <MenuItem value={"macos"}>Mac Os</MenuItem>
            <MenuItem value={"linux"}>Linux</MenuItem>
          </Select>
          <br />
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={() => addPost(arr)}
            style={{ alignSelf: "center" }}
          >
            Add Post
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreatePostU;
