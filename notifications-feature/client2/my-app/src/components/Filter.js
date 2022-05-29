import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Grid, makeStyles, Button } from "@material-ui/core";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { styled } from "@mui/material/styles";
import {
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Radio,
} from "@mui/material";

const useStyles = makeStyles({
  paper: {
    marginBottom: "1rem",
    padding: 20,
  },
  filter: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  input: {
    margin: " 0 0 0 20px",
  },
});

const SeveritySlider = styled(Slider)({
  color: "white",
  background:
    "linear-gradient(90deg, rgba(60,166,77,1) 10%, rgba(77,214,99,1) 20%, rgba(93,245,117,1) 30%, rgba(199,245,93,1) 40%, rgba(227,245,93,1) 50%, rgba(245,225,93,1) 60%, rgba(245,204,93,1) 70%, rgba(245,172,93,1) 80%, rgba(245,136,93,1) 90%, rgba(245,93,93,1) 100%)",
});

const Filter = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const defaultSearchingPost = {
    name: "",
    complexity: "",
    severity: 0,
    developer: "",
    platform: "",
    operationSystem: "",
    version: "1",
    fixes: "",
  };

  const [searchingPost, setSearchingPost] = useState(defaultSearchingPost);
  const [sliderType, setSliderType] = useState({ type: "gte" });

  function showAll() {
    navigate(``);
    setSearchingPost(defaultSearchingPost);
  }

  const formNavigationString = (post) => {
    let navString = "";

    for (let [key, value] of Object.entries(post)) {
      let firstOrConsequent = navString.includes("?") ? "&&" : "?";

      if (key === "severity" && value !== defaultSearchingPost[`${key}`])
        navString += `${firstOrConsequent}${key}[${sliderType.type}]=${value}`;

      if (value !== defaultSearchingPost[key] && key !== "severity")
        navString += `${firstOrConsequent}${key}[regex]=${value}`;
    }

    return navString;
  };

  console.log(formNavigationString(searchingPost));

  function Filtering() {
    navigate(formNavigationString(searchingPost));
    setSearchingPost(defaultSearchingPost);
  }

  const handleRadioInput = (e) => {
    setSliderType(e.target.value);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSearchingPost({ ...searchingPost, [name]: value });
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "10",
    },
  ];

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
                padding: "10px 0",
              }}
            >
              Знайдіть пост, який вам потрібен!
            </Typography>

            <div className={classes.filter}>
              <TextField
                name="name"
                label="Post name"
                id="outlined-size-small"
                size="small"
                onInput={handleChangeInput}
              />
              <br />
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <InputLabel>
                  Severity: <strong>{searchingPost.severity}</strong>
                </InputLabel>
                <Radio
                  name="type"
                  checked={sliderType.type === "gte"}
                  onChange={handleRadioInput}
                  value="gte"
                />
                <Radio
                  name="type"
                  checked={sliderType.type === "lte"}
                  onChange={handleRadioInput}
                  value="lte"
                />
                <Radio
                  name="type"
                  checked={sliderType.type === "equals"}
                  onChange={handleRadioInput}
                  value="exact"
                />
              </Stack>
              <SeveritySlider
                name="severity"
                value={searchingPost.severity}
                onChange={handleChangeInput}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
                marks={marks}
              ></SeveritySlider>
              <br />
              <TextField
                name="developer"
                label="developer"
                id="outlined-size-small"
                size="small"
                onInput={handleChangeInput}
              />
              <br />
              <InputLabel id="demo-simple-select-label">Platform</InputLabel>
              <Select
                name="platform"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchingPost.platform}
                label="platform"
                onChange={handleChangeInput}
              >
                <MenuItem value={"windows"}>Windows</MenuItem>
                <MenuItem value={"macos"}>Mac Os</MenuItem>
                <MenuItem value={"linux"}>Linux</MenuItem>
              </Select>
              <br />
              <TextField
                name="operationSystem"
                label="Operating system"
                id="outlined-size-small"
                size="small"
                onInput={handleChangeInput}
              />
              <br />
              <TextField
                name="version"
                label="version"
                id="outlined-size-small"
                size="small"
                onInput={handleChangeInput}
              />
              <br />
              <div>
                <input
                  type="checkbox"
                  id="fixes"
                  name="fixes"
                  value={searchingPost.fixes}
                  style={{ marginRight: "10px" }}
                  onChange={handleChangeInput}
                />
                <label> contains fixes</label>
              </div>
              <div style={{ alignSelf: "center", marginTop: "10px" }}>
                <Button variant="contained" onClick={Filtering}>
                  Search
                  <SearchIcon
                    style={{ marginLeft: "10px" }}
                    color="primary"
                    sx={{ fontSize: 35 }}
                  />
                </Button>
                <CancelOutlinedIcon
                  style={{ marginLeft: "10px" }}
                  onClick={showAll}
                  color="primary"
                  sx={{ fontSize: 35 }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Filter;
