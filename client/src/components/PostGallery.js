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
import PostCard from "./ConfirmedPostsCard";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PostsTable from "./PostsTable";

const PostGallery = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      // backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const useStyles = makeStyles({
    root: {
      marginTop: 10,
    },
  });

  const dispatch = useDispatch();
  const classes = useStyles();
  const role = useSelector((state) => state.user.role);
  //Component state

  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState("");

  const location = useLocation();

  const params = location.search ? location.search : null;

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
          setPosts(response.data.data);
        } catch (e) {
          localStorage.removeItem("token");
        }
      };
    };

    dispatch(Posts());
  }, [params, filter]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = posts.slice(firstPostIndex, lastPostIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function Percentage(danger, countOfPosts) {
    return <>{Math.ceil((danger / countOfPosts) * 100)}%</>;
  }

  const navigate = useNavigate();

  function Navigate(severity) {
    if (severity) {
      navigate(`/severity/${severity}`);
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        {currentPost.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} lg={6}>
            <PostCard post={post} posts={posts} />
          </Grid>
        ))}
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
      <PostsTable />
    </>
  );
};

export default PostGallery;
