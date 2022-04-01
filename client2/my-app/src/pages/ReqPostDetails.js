import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useStyles } from "../styles/global";
import {
  Container,
  Grid,
  Button,
  Paper,
  Typography,
  Link as MaterialLink,
} from "@material-ui/core";
import BackBtn from "../components/backBtn/BackBtn";

const ReqPostDetails = () => {
  // Material ui styles
  const dispatch = useDispatch();
  const classes = useStyles();

  const role = useSelector((state) => state.user.role);
  const isAuth = useSelector((state) => state.user.isAuth);
  const location = useParams();

  let params = parseInt(location.mainId);

  //Component state
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState("");

  useLayoutEffect(() => {});

  useEffect(() => {
    const fetchData = () => {
      return async (dispatch) => {
        try {
          let query;
          if (params && !filter) {
            query = params;
          } else {
            query = filter;
          }

          const response = await axios.get(
            `http://localhost:5000/api/requested/${query}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          setPosts(response.data.data);
        } catch (error) {
          console.log(error.response.data);
          localStorage.removeItem("token");
        }
      };
    };

    dispatch(fetchData());
  }, [filter, params]);

  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      {/* //go to main page button */}
      <BackBtn />

      <Grid className={classes.flexColCenter} container spacing={2}>
        {posts.map((post) => (
          <Grid
            className={classes.fullWidthCenter}
            item
            key={post._id}
            xs={12}
            sm={6}
            lg={3}
          >
            <Paper className={classes.fullWidth}>
              <Typography className={classes.mainPageHeading} variant="h3">
                {post.name}
                <Typography className={classes.id}>
                  #ID: {post.mainId}
                </Typography>
              </Typography>
            </Paper>
            <Paper className={classes.fullWidth}>
              <div className={classes.cardInfoTileWrapper}>
                <div className={classes.cardHeadingWrapper}>
                  <Typography variant="h5">Description:</Typography>
                </div>
                <div className={classes.cardContentWrapper}>
                  <Typography paragraph="true">{post.description}</Typography>
                </div>
              </div>
              <div className={classes.flexRow}>
                <div className={classes.rowItem}>
                  <div className={classes.cardInfoTileWrapper}>
                    <div className={classes.cardHeadingWrapper}>
                      <Typography variant="h5">CVSS Score:</Typography>
                    </div>
                    <div className={classes.cardContentWrapper}>
                      <Typography>{post.danger}</Typography>
                    </div>
                  </div>
                </div>
                <div className={classes.rowItem}>
                  <div className={classes.cardInfoTileWrapper}>
                    <div className={classes.cardHeadingWrapper}>
                      <Typography variant="h5">Complexity:</Typography>
                    </div>
                    <div className={classes.cardContentWrapper}>
                      <Typography>{post.complexity}</Typography>
                    </div>
                  </div>
                </div>
                <div className={classes.rowItem}>
                  <div className={classes.cardInfoTileWrapper}>
                    <div className={classes.cardHeadingWrapper}>
                      <Typography variant="h5">Views:</Typography>
                    </div>
                    <div className={classes.cardContentWrapper}>
                      <Typography>17{post.views}</Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.cardInfoTileWrapper}>
                <div className={classes.cardHeadingWrapper}>
                  <Typography variant="h5">References:</Typography>
                </div>
                <div className={classes.cardContentWrapper}>
                  <MaterialLink href={post.links}>{post.links}</MaterialLink>
                </div>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReqPostDetails;
