import React from "react";
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
import PostCard from "../components/ConfirmedPostsCard";
import { useLocation, useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import PostGallery from "../components/PostGallery";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

const MainPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  //Component state

  //Posts filtering

  return (
    <div className="main-page">
      <Container className={classes.root}>
        {/* //Filtering and sorting section */}
        <Filter />

        {/* //Posts listening */}
        <PostGallery />
      </Container>
    </div>
  );
};

export default MainPage;
