import React from 'react';
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
import Filter from '../components/Filter';
import PostGallery from '../components/PostGallery';


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

const MainPage = () => {
	 const dispatch = useDispatch();
   const classes = useStyles();

   //Component state
   
   //Posts filtering

   
  
  
	return (
    <div>
      <Container className={classes.root}>
        {/* //Filtering and sorting section */}
        <Filter/>

        {/* //Posts listening */}
        <PostGallery/>
      </Container>
    </div>
  );
};

export default MainPage;
