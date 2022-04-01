import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
	Button,
	
} from "@material-ui/core";
import { Rating } from "@mui/material";


import PostsCard from "../components/ConfirmedPostsCard";
import { deleteReqPost, moveReqPost, moveToRejected } from "../api/apiRequests";

const MyPosts = () => {
	
  const user = useSelector((state) => state.user.currentUser.username);

  const [reqPosts, setReqPosts] = useState([]);
  const [rejPosts, setRejPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const [filter, setFilter] = useState("");

  const location = useLocation();
	const query = location.search

  const params = location.search ? location.search : null;
  useEffect(() => {
    function AllPosts() {
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
          setAllPosts([
            ...response.data.data.filter((post) => post.user == user),
          ]);
          //setAllPosts([...allPosts.filter((post) => post.username == user)] )
        } catch (e) {
          console.log(e.response.data);
          localStorage.removeItem("token");
        }
      };
    }

    function ReqPosts() {
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
          setReqPosts([
            ...response.data.data.filter((post) => post.user == user),
          ]);
        } catch (e) {
          console.log(e.response.data);
          localStorage.removeItem("token");
        }
      };
    }
    function RejPosts() {
      return async (dispatch) => {
        try {
          let query;
          if (params && !filter) {
            query = params;
          } else {
            query = filter;
          }
          const response = await axios.get(
            `http://localhost:5000/api/rejPosts${query}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setRejPosts([
            ...response.data.data.filter((post) => post.user == user),
          ]);
        } catch (e) {
          console.log(e.response.data);
          localStorage.removeItem("token");
        }
      };
    }
    dispatch(AllPosts());
    dispatch(ReqPosts());
    dispatch(RejPosts());
  }, [params, filter]);


	const navigate = useNavigate();
	function showRequestedPostDetails(post) {
    navigate(`/requested/${post.mainId}`);
  }
  //For adding new post
  const dispatch = useDispatch();
  return (
    <Container>
      <div
        className=""
        style={{
          textAlign: "center",
          fontSize: "20px",
          padding: "20px 0",
          color: "white",
          backgroundColor: "green",
        }}
      >
        Confirmed
      </div>
      <Grid container spacing={2}>
        {allPosts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} lg={3}>
            <PostsCard post={post} posts={allPosts} />
          </Grid>
        ))}
      </Grid>
      <div
        className=""
        style={{
          textAlign: "center",
          fontSize: "20px",
          padding: "20px 0",
          color: "white",
          backgroundColor: "red",
        }}
      >
        Rejected posts
      </div>
      <Grid container spacing={2}>
        {rejPosts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} lg={3}>
            <PostsCard post={post} posts={rejPosts} />
          </Grid>
        ))}
      </Grid>
      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          padding: "20px 0",
          color: "white",
          backgroundColor: "blue",
        }}
        className=""
      >
        Waiting for confirm posts
      </div>
      <Grid container spacing={2}>
        {reqPosts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} lg={3}>
            
              <Card className="post-card">
                <CardHeader
                  title={<Typography variant="h6">{post.name}</Typography>}
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
                    CVSS Score: {post.danger}
                  </Typography>
                  <Rating
                    value={post.danger}
                    readOnly
                    size="medium"
                    precision={0.1}
                    max={10}
                  />
                  <Typography variant="h6">
                    Access complexity: {post.complexity}
                  </Typography>
                  <Typography style={{ display: "block" }} variant="caption">
                    {post.links}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ padding: "10px 0", marginBottom: "10px" }}
										onClick={() => showRequestedPostDetails(post)}
                  >
                    Details
                  </Button>
                </CardContent>
              </Card>
            
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyPosts;
