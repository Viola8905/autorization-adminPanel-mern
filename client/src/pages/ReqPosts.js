import axios from "axios";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Paper,
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Input,
  Button,
} from "@material-ui/core";
import { Rating } from "@mui/material";

import PostsCard from "../components/ConfirmedPostsCard";
import { deleteReqPost, moveReqPost, moveToRejected } from "../api/apiRequests";
import BackBtn from "../components/backBtn/BackBtn";

const ReqPosts = () => {
  const [reqPosts, setReqPosts] = useState([]);

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
            `http://localhost:5000/api/reqPosts${query}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setReqPosts(response.data.data);
        } catch (e) {
          console.log(e.response.data);
          localStorage.removeItem("token");
        }
      };
    }
    dispatch(Posts());
  }, [params, filter]);

  //For adding new post
  const dispatch = useDispatch();
  function confirmPost(post) {
    dispatch(moveReqPost(post));

    dispatch(
      deleteReqPost(
        post._id,
        () =>
          setReqPosts([...reqPosts.filter((post1) => post1._id !== post._id)]),
        () => alert("ERRRROOOR")
      )
    );
  }

  function rejectPost(post) {
    dispatch(
      deleteReqPost(
        post._id,
        () =>
          setReqPosts([...reqPosts.filter((post1) => post1._id !== post._id)]),
        () => alert("ERRRROOOR")
      )
    );
    dispatch(moveToRejected(post));
  }

  const navigate = useNavigate();
  function showCard(post) {
    navigate(`/requested/${post.mainId}`);
  }

  return (
    <div className="">
      <Container>
        <BackBtn />
        <div
          style={{
            textAlign: "center",
            fontSize: "30px",
            padding: "20px 0",
            fontWeight: "700",
          }}
        >
          Requested Posts
        </div>
        <Grid container spacing={2}>
          {reqPosts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} lg={3}>
              {/* <PostsCard post={post} posts={reqPosts} /> */}
              <Card className="post-card">
                <CardHeader
                  title={
                    <Typography variant="h6" className="description_block">
                      {post.name}
                    </Typography>
                  }
                />
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    gap: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption" className="description_block">
                    {post.description}
                  </Typography>
                  <Typography variant="h6">
                    CVSS Score: {post.severity}
                  </Typography>
                  <Rating
                    value={post.severity}
                    readOnly
                    size="medium"
                    precision={0.1}
                    max={10}
                  />
                  <Typography variant="h6">
                    Access complexity: {post.complexity}
                  </Typography>
                  <Typography style={{ display: "block" }} variant="caption">
                    {post.fixes}
                  </Typography>
                  <Typography
                    style={{ display: "block", color: "blue" }}
                    variant="caption"
                  >
                    {post.user} proposed this post
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ padding: "10px 0", marginBottom: "10px" }}
                    onClick={() => showCard(post)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="outlined"
                    style={{
                      padding: "10px 0",
                      marginBottom: "10px",
                      backgroundColor: "#39c72a",
                      color: "white",
                    }}
                    onClick={() => confirmPost(post)}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{
                      padding: "10px 0",
                      marginBottom: "10px",
                      backgroundColor: "red",
                      color: "white",
                    }}
                    onClick={() => rejectPost(post)}
                  >
                    Reject
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ReqPosts;
