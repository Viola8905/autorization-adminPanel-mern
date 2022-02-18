import React from 'react'
import { useState, useEffect } from "react";
import { Grid, } from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";



const LevelOfDPosts = () => {
	 const dispatch = useDispatch();
  

   const role = useSelector((state) => state.user.role);
   const isAuth = useSelector((state) => state.user.isAuth);
   const location = useParams();
   //console.log(location);

   let params = parseInt(location.danger);
	 //console.log("params"+ params)
   //console.log(typeof params);

   //Component state
   const [posts, setPosts] = useState([]);

   const [filter, setFilter] = useState("");

   //Side effects(loaded data to frontend network)
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
             `http://localhost:5000/api/posts?danger=${query}`,
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
	return (
    <div style={{overflow:"hidden"}}>
      
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} lg={3}>
            Post number {post.mainId}
            <div className="p"> name: {post.name}</div>
            <div className="p"> description: {post.description}</div>
            <div className="p"> danger: {post.danger}</div>
            <div className="p"> complexity: {post.complexity}</div>
            <div className="p"> links: {post.links}</div>
         
          </Grid>
        ))}
      </Grid>

		
    </div>
  );
}

export default LevelOfDPosts