import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import {
  Paper,
  Typography,
  Container,
  Grid,
  Button,
  InputLabel,
  Slider,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Stack,
} from "@mui/material";

import { createPost } from "../api/apiRequests";
import BackBtn from "../components/backBtn/BackBtn";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SeveritySlider = styled(Slider)({
  color: "white",
  background:
    "linear-gradient(90deg, rgba(60,166,77,1) 10%, rgba(77,214,99,1) 20%, rgba(93,245,117,1) 30%, rgba(199,245,93,1) 40%, rgba(227,245,93,1) 50%, rgba(245,225,93,1) 60%, rgba(245,204,93,1) 70%, rgba(245,172,93,1) 80%, rgba(245,136,93,1) 90%, rgba(245,93,93,1) 100%)",
});

const CreatePostA = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.currentUser.username);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const mainId = getRandomInt(10, 1000000);

  const defaultPost = {
    name: "",
    severity: 0,
    description: "",
    complexity: "",
    fixes: "",
    version: "",
    operationSystem: "",
    developer: "",
    platform: "",
    mainId: mainId,
    user: userName,
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

  const [postCandidate, setPostCandidate] = useState(defaultPost);

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setPostCandidate({ ...postCandidate, [name]: value, mainId: mainId });
  };

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

  console.log(postCandidate);

  const addPost = (postCandidate) => {
    let existingPost = posts.find((item) => item.name === postCandidate.name);

    if (!existingPost) {
      dispatch(
        createPost(
          postCandidate,
          () => setPosts([...posts, postCandidate]),
          () => alert("Error occured!")
        )
      );

      // setPostCandidate(defaultPost);
    }
  };

  return (
    <Container>
      {/* //Filtering and sorting section */}
      <BackBtn />

      <Paper>
        <Grid
          container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "20px",
              fontWeight: "700",
              margin: "20px 0",
              color: "#4287f5",
            }}
          >
            Форма для додавання поста в систему
          </Typography>
          <TextField
            name="name"
            sx={{ minWidth: "70%" }}
            label="Назва"
            variant="outlined"
            value={postCandidate.name}
            onChange={handleStateChange}
            type="text"
            placeholder="Введіть назву вразливості..."
          />

          <br />
          <InputLabel sx={{ pb: 1 }}>
            Оберіть небезпечність вразливості
          </InputLabel>
          <SeveritySlider
            name="severity"
            sx={{ maxWidth: "70%" }}
            value={postCandidate.severity}
            onChange={handleStateChange}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={10}
            marks={marks}
          ></SeveritySlider>
          <Typography variant="h6">Оцінка: {postCandidate.severity}</Typography>
          <br />

          <TextField
            sx={{ minWidth: "70%" }}
            multiline
            rows={4}
            name="description"
            label="Опис"
            value={postCandidate.description}
            onChange={handleStateChange}
            type="text"
            placeholder="Введіть опис вразливості..."
          />
          <br />

          <InputLabel sx={{ pb: 1 }}>Доступність вразливості</InputLabel>
          <FormControl>
            <RadioGroup name="complexity" onChange={handleStateChange}>
              <Stack direction="row">
                <FormControlLabel
                  sx={{
                    minWidth: "150px",
                    background: "rgba(60,166,77,1)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    "& .MuiSvgIcon-root": {
                      fontSize: 28,
                    },
                  }}
                  value="low"
                  control={<Radio size="" />}
                  label="Низька"
                />
                <FormControlLabel
                  sx={{
                    minWidth: "150px",
                    background: "rgba(245,225,93,1)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    "& .MuiSvgIcon-root": {
                      fontSize: 28,
                    },
                  }}
                  value="middle"
                  control={<Radio />}
                  label="Середня"
                />
                <FormControlLabel
                  sx={{
                    minWidth: "150px",
                    background: "rgba(245,93,93,1)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    "& .MuiSvgIcon-root": {
                      fontSize: 28,
                    },
                  }}
                  value="high"
                  control={<Radio />}
                  label="Висока"
                />
              </Stack>
            </RadioGroup>
          </FormControl>

          <br />

          <TextField
            sx={{ minWidth: "70%" }}
            name="fixes"
            label="Рішення"
            value={postCandidate.fixes}
            onChange={handleStateChange}
            type="text"
            placeholder="Ввдеіть рішення до вразливості..."
          />

          <br />

          <TextField
            sx={{ minWidth: "70%" }}
            name="version"
            label="Версія"
            value={postCandidate.version}
            onChange={handleStateChange}
            type="text"
            placeholder="Введіть версію вразливості..."
          />
          <br />

          <TextField
            sx={{ minWidth: "70%" }}
            name="operationSystem"
            label="Операційна система"
            value={postCandidate.operationSystem}
            onChange={handleStateChange}
            type="text"
            placeholder="Операційна система..."
          />
          <br />
          <TextField
            sx={{ minWidth: "70%" }}
            name="developer"
            label="Розробник"
            value={postCandidate.developer}
            onChange={handleStateChange}
            type="text"
            placeholder="Розробник ОС..."
          />
          <br />

          <InputLabel sx={{ pb: 1 }}>Платформа</InputLabel>
          <FormControl>
            <RadioGroup row name="platform" onChange={handleStateChange}>
              <FormControlLabel
                sx={{
                  minWidth: "150px",
                  color: "black",
                  padding: "20px",
                  borderRadius: "10px",
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                  },
                  border: "1px solid lightgray",
                }}
                value="windows"
                control={<Radio />}
                label="Windows"
              />
              <FormControlLabel
                sx={{
                  minWidth: "150px",
                  color: "black",
                  padding: "20px",
                  borderRadius: "10px",
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                  },
                  border: "1px solid lightgray",
                }}
                value="linux"
                control={<Radio />}
                label="Linux"
              />
              <FormControlLabel
                sx={{
                  minWidth: "150px",
                  color: "black",
                  padding: "20px",
                  borderRadius: "10px",
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                  },
                  border: "1px solid lightgray",
                }}
                value="macos"
                control={<Radio />}
                label="Mac OS"
              />
            </RadioGroup>
          </FormControl>

          <br />
          <br />

          <Button
            color="primary"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              addPost(postCandidate);
            }}
            style={{ alignSelf: "center" }}
          >
            Add Post
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreatePostA;
