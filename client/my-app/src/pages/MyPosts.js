import React from 'react'
import axios from "axios";
import  { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Paper,
  Typography,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";

import PostsCard from "../components/PostsCard";
import { deleteReqPost, moveReqPost, moveToRejected } from "../api/apiRequests";

const MyPosts = () => {

const user = useSelector((state) => state.user.currentUser.username);


 const [reqPosts, setReqPosts] = useState([]);
 const [rejPosts, setRejPosts] = useState([]);
 const [allPosts, setAllPosts] = useState([]);

 const [filter, setFilter] = useState("");

 const location = useLocation();

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
          //console.log(response.data.data);
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
          //console.log(response.data.data);
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
          //console.log(response.data.data);
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
	
	function f () {
			// setAllPosts([...allPosts.filter((post) => post.user == user)]);
	}


 
  //For adding new post
  const dispatch = useDispatch();
	return (
    <div>
      <div
        className=""
        style={{ textAlign: "center", fontSize: "20px", padding: "20px 0" ,color: 'red' }}
      >
        Confirmed
      </div>
      <Grid container spacing={2}>
        {allPosts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} lg={3}>
            <PostsCard post={post} posts={reqPosts} />
            <div className="">{post.user} added this post</div>
          </Grid>
        ))}
      </Grid>
      <div
        className=""
        style={{ textAlign: "center", fontSize: "20px", padding: "20px 0" , color: 'red'}}
      >
        Rejected posts
      </div>
      <Grid container spacing={2}>
        {rejPosts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} lg={3}>
            <PostsCard post={post} posts={reqPosts} />
            <div className="">{post.user} added this post</div>
          </Grid>
        ))}
      </Grid>
      <div
        style={{ textAlign: "center", fontSize: "20px", padding: "20px 0" ,color: 'red' }}
        className=""
      >
        waiting for confirm posts
      </div>
      <Grid container spacing={2}>
        {reqPosts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} lg={3}>
            <PostsCard post={post} posts={reqPosts} />
            <div className="">{post.user} added this post</div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MyPosts