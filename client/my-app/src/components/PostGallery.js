import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Typography,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import PostCard from "../components/PostsCard";
import { useLocation, useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import Pagination from "./Pagination";

const PostGallery = () => {
  const useStyles = makeStyles({
    root: {
      marginTop: 10,
    },
  });

  const dispatch = useDispatch();
  const classes = useStyles();
  const role = useSelector((state) => state.user.role);
  //Component state
  const [danger1, setDanger1] = useState([]);
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState("");

  const location = useLocation();

  const params = location.search ? location.search : null;

  const [danger2, setDanger2] = useState([]);
  const [danger3, setDanger3] = useState([]);
  const [danger4, setDanger4] = useState([]);
  const [danger5, setDanger5] = useState([]);
  const [danger6, setDanger6] = useState([]);
  const [danger7, setDanger7] = useState([]);
  const [danger8, setDanger8] = useState([]);
  const [danger9, setDanger9] = useState([]);
  const [danger10, setDanger10] = useState([]);

  // for (let i = 0; i < posts.length; i++){
  // 	if (posts[i].danger == 1) {
  //     setDanger1(posts[i]);
  //   } else if (posts[i].danger == 2) {
  //     setDanger2(posts[i]);
  //   } else if (posts[i].danger == 3) {
  //     setDanger3(posts[i]);
  //   } else if (posts[i].danger == 4) {
  //     setDanger4(posts[i]);
  //   } else if (posts[i].danger == 5) {
  //     setDanger5(posts[i]);
  //   } else if (posts[i].danger == 6) {
  //     setDanger6(posts[i]);
  //   } else if (posts[i].danger == 7) {
  //     setDanger7(posts[i]);
  //   } else if (posts[i].danger == 8) {
  //     setDanger8(posts[i]);
  //   } else if (posts[i].danger == 9) {
  //     setDanger9(posts[i]);
  //   } else if (posts[i].danger == 10) {
  //     setDanger10(posts[i]);
  //   }else{

  // 	}

  // }

  // console.log(danger2);
  //  function Table (posts){

  // 		let a = 	posts.map((post) => {

  // 			if (post.danger == 1) {
  // 				setDanger1(post);
  // 			} else if (post.danger == 2) {
  // 				setDanger2('hello');
  // 			} else if (post.danger == 3) {
  // 				setDanger3(post);
  // 			} else if (post.danger == 4) {
  // 				setDanger4(post);
  // 			} else if (post.danger == 5) {
  // 				setDanger5(post);
  // 			} else if (post.danger == 6) {
  // 				setDanger6(post);
  // 			} else if (post.danger == 7) {
  // 				setDanger7(post);
  // 			} else if (post.danger == 8) {
  // 				setDanger8(post);
  // 			} else if (post.danger == 9) {
  // 				setDanger9(post);
  // 			} else if (post.danger == 10) {
  // 				setDanger10(post);
  // 			}else{

  // 			}

  // 			console.log(post.danger)
  // 		})

  //  console.log(danger2);
  // }

  //Side effects(loaded data to frontend network)
  useEffect(() => {
    const Posts = () => {
      return async () => {
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
          setPosts(response.data.data);
          setDanger1(response.data.data.filter((post) => post.danger == "1"));
          setDanger2(response.data.data.filter((post) => post.danger == "2"));
          setDanger3(response.data.data.filter((post) => post.danger == "3"));
          setDanger4(response.data.data.filter((post) => post.danger == "4"));
          setDanger5(response.data.data.filter((post) => post.danger == "5"));
          setDanger6(response.data.data.filter((post) => post.danger == "6"));
          setDanger7(response.data.data.filter((post) => post.danger == "7"));
          setDanger8(response.data.data.filter((post) => post.danger == "8"));
          setDanger9(response.data.data.filter((post) => post.danger == "9"));
          setDanger10(response.data.data.filter((post) => post.danger == "10"));
        } catch (e) {
          console.log(e.response.data);
          localStorage.removeItem("token");
        }
      };
    };

    dispatch(Posts());
  }, [params, filter]);

  function Table(posts) {
    //  let a = posts.map((post) => {
    //    if (post.danger == '1') {
    //      setDanger1(post);
    //    } else if (post.danger == 2) {
    //      setDanger2(post);
    //    } else if (post.danger == 3) {
    //      setDanger3(post);
    //    } else if (post.danger == 4) {
    //      setDanger4(post);
    //    } else if (post.danger == 5) {
    //      setDanger5(post);
    //    } else if (post.danger == 6) {
    //      setDanger6(post);
    //    } else if (post.danger == 7) {
    //      setDanger7(post);
    //    } else if (post.danger == 8) {
    //      setDanger8(post);
    //    } else if (post.danger == 9) {
    //      setDanger9(post);
    //    } else if (post.danger == 10) {
    //      setDanger10(post);
    //    } else {
    //    }
    //  });
  }

  //setDanger1([...danger1.filter((post) => post._id !== id)]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = posts.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <button>click</button>
      <Grid container spacing={2}>
        {currentPost.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} lg={6}>
            <PostCard post={post} posts={posts} />
          </Grid>
        ))}
      </Grid>
      <div
        className=""
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
      <div>{danger1.length}</div>
    </>
  );
};

export default PostGallery;
