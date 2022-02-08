import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";

import PostsCard from "../components/PostsCard";
import { deleteReqPost, moveReqPost } from "../api/apiRequests";

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
          //console.log(response.data.data);
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
        () => setReqPosts([...reqPosts.filter((post1) => post1._id !== post._id)]),
        () => alert("ERRRROOOR")
      )
    );
  }

	function rejectPost (post){
		dispatch(
      deleteReqPost(
        post._id,
        () =>
          setReqPosts([...reqPosts.filter((post1) => post1._id !== post._id)]),
        () => alert("ERRRROOOR")
      )
    );
	}

  return (
    <div className="">
      <Container>
        <Link to="/user">
          <Button variant={"outline-dark"} size="small">
            Back
          </Button>
        </Link>
        <div
          style={{ textAlign: "center", fontSize: "20px", padding: "20px 0" }}
        >
          Requested Posts
        </div>
        <Grid container spacing={2}>
          {reqPosts.map((post) => (
            <Grid item key={post._id} xs={12} sm={6} lg={3}>
              <PostsCard post={post} posts={reqPosts} />
              <button onClick={() => confirmPost(post)}>Confirm</button>
              <button onClick={() => rejectPost(post)}>Reject</button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ReqPosts;
