import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Grid, makeStyles } from "@material-ui/core";

import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Input from "../components/input/Input";

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

const Filter = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [severity, setSeverity] = useState("");
  const [developer, setDeveloper] = useState("");
  const [platform, setPlatform] = useState("");
  const [operationSystem, setOperationSystem] = useState("");
  const [version, setVersion] = useState("");
  const [fixes, setFixes] = useState("false");

  let query = "";
  let hasFixes =
    fixes == "false" ? (query = `&&fixes=`) : (query = `&&fixes[regex]=`);

  function showAll() {
    navigate(``);
    setSeverity("");
    setDeveloper("");
    setPlatform("");
    setOperationSystem("");
    setVersion("");
    setFixes("true");
  }

  function Filtering() {
    navigate(
      `?severity[regex]=${severity}&&developer[regex]=${developer}&&platform[regex]=${platform}&&operationSystem[regex]=${operationSystem}&&version[regex]=${version}${hasFixes}`
    );
    setSeverity("");
    setDeveloper("");
    setPlatform("");
    setOperationSystem("");
    setVersion("");
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
                padding: "10px 0",
              }}
            >
              Знайдіть пост, який вам потрібен!
            </Typography>

            <div className={classes.filter}>
              <InputLabel id="demo-simple-select-label">Severity</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={severity}
                label="Severity"
                onChange={(e) => setSeverity(e.target.value)}
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
              <TextField
                label="developer"
                id="outlined-size-small"
                size="small"
                onInput={(e) => setDeveloper(e.target.value)}
              />
              <br />

              <InputLabel id="demo-simple-select-label">Platform</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={platform}
                label="platform"
                onChange={(e) => setPlatform(e.target.value)}
              >
                <MenuItem value={"windows"}>Windows</MenuItem>
                <MenuItem value={"macos"}>Mac Os</MenuItem>
                <MenuItem value={"linux"}>Linux</MenuItem>
              </Select>
              <br />
              <TextField
                label="operation system"
                id="outlined-size-small"
                size="small"
                onInput={(e) => setOperationSystem(e.target.value)}
              />
              <br />
              <TextField
                label="operation system"
                id="outlined-size-small"
                size="small"
                onInput={(e) => setOperationSystem(e.target.value)}
              />
              <br />
              <TextField
                label="version"
                id="outlined-size-small"
                size="small"
                onInput={(e) => setVersion(e.target.value)}
              />
              <br />

              <div>
                <input
                  type="checkbox"
                  id="fixes"
                  name="fixes"
                  value={fixes}
                  style={{ marginRight: "10px" }}
                  onChange={() =>
                    fixes == "false" ? setFixes("true") : setFixes("false")
                  }
                />
                <label for="fixes"> contains fixes</label>
              </div>

              <div style={{ alignSelf: "center", marginTop: "10px" }}>
                <SearchIcon
                  style={{ marginLeft: "10px" }}
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
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Filter;
