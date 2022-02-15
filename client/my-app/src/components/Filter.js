import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";

import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
const useStyles = makeStyles({
  

  paper: {
    marginBottom: "1rem",
    padding: 20,
  },
  filter: {
    display:'flex',
		justifyContent:'center'
  },
	input:{
		margin: " 0 0 0 20px",
	},
  
});

const Filter = () => {
  const classes = useStyles();

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

  function showAll() {
    navigate(``);
  }

  function Filtering() {
    navigate(
      `?complexity[regex]=${level}&&name[regex]=${title}&&danger=${danger}`
    );
		
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Typography
              gutterBottom
              style={{
                textAlign: "center",
                fontSize: "20px",
                padding: "20px 0",
              }}
            >
              Find post you need!
            </Typography>

            <div className={classes.filter}>
              <TextField
                label="level of complexity"
                id="outlined-size-small"
                size="small"
                onInput={handleChange1}
              />
              <TextField
                style={{ marginLeft: "20px" }}
                label="title"
                id="outlined-size-small"
                size="small"
                onInput={handleChange2}
              />
              <TextField
                style={{ marginLeft: "20px" }}
                className={classes.input}
                label="level of danger"
                id="outlined-size-small"
                size="small"
                onInput={handleChange3}
              />
              <SearchIcon
                style={{ marginLeft: "10px" }}cd 
                onClick={Filtering}
                color="primary"
                sx={{ fontSize: 35 }}
              />
              <CancelOutlinedIcon
                style={{ marginLeft: "10px" }}
                onClick={showAll}
                color="primary"
                sx={{ fontSize: 35 }}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Filter;
