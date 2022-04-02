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
import Filter from "../components/Filter";
import Pagination from "./Pagination";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { green } from "@material-ui/core/colors";

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
  const [severity1, setSeverity1] = useState([]);
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState("");

  const location = useLocation();

  const params = location.search ? location.search : null;

  const [severity2, setSeverity2] = useState([]);
  const [severity3, setSeverity3] = useState([]);
  const [severity4, setSeverity4] = useState([]);
  const [severity5, setSeverity5] = useState([]);
  const [severity6, setSeverity6] = useState([]);
  const [severity7, setSeverity7] = useState([]);
  const [severity8, setSeverity8] = useState([]);
  const [severity9, setSeverity9] = useState([]);
  const [severity10, setSeverity10] = useState([]);

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
          setSeverity1(response.data.data.filter((post) => post.severity == "1"));
          setSeverity2(response.data.data.filter((post) => post.severity == "2"));
          setSeverity3(response.data.data.filter((post) => post.severity == "3"));
          setSeverity4(response.data.data.filter((post) => post.severity == "4"));
          setSeverity5(response.data.data.filter((post) => post.severity == "5"));
          setSeverity6(response.data.data.filter((post) => post.severity == "6"));
          setSeverity7(response.data.data.filter((post) => post.severity == "7"));
          setSeverity8(response.data.data.filter((post) => post.severity == "8"));
          setSeverity9(response.data.data.filter((post) => post.severity == "9"));
          setSeverity10(
            response.data.data.filter((post) => post.severity == "10")
          );
        } catch (e) {
          console.log(e.response.data);
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
        className=""
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
      <TableContainer component={Paper} style={{ margin: "30px 0" }}>
        <Table sx={{}} aria-label="customized table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#1976d2" }}>
              <StyledTableCell>CVSS severity</StyledTableCell>
              <StyledTableCell align="center">
                Number of vulnerabilities
              </StyledTableCell>
              <StyledTableCell align="right">Persentage</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#3ca64d", fontWeight: 700 }}
            >
              level of severity: 1
            </StyledTableCell>
            <StyledTableCell
              align="center"
              onClick={() => Navigate(severity1[0].severity)}
            >
              <a href="">{severity1.length}</a>
            </StyledTableCell>
            <StyledTableCell align="right">
              {Percentage(severity1.length, posts.length)}
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#4dd663", fontWeight: 700 }}
            >
              level of severity: 2
            </StyledTableCell>
            <StyledTableCell
              align="center"
              onClick={() => Navigate(severity2[0].severity)}
            >
              <a href="">{severity2.length}</a>
            </StyledTableCell>
            <StyledTableCell align="right">
              {Percentage(severity2.length, posts.length)}
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#5df575", fontWeight: 700 }}
            >
              level of severity: 3
            </StyledTableCell>
            <StyledTableCell
              align="center"
              onClick={() => Navigate(severity3[0].severity)}
            >
              <a href="">{severity3.length}</a>
            </StyledTableCell>
            <StyledTableCell align="right">
              {Percentage(severity3.length, posts.length)}
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#c7f55d", fontWeight: 700 }}
            >
              level of severity: 4
            </StyledTableCell>
            <StyledTableCell
              align="center"
              onClick={() => Navigate(severity4[0].severity)}
            >
              <a href="">{severity4.length}</a>
            </StyledTableCell>
            <StyledTableCell align="right">
              {Percentage(severity4.length, posts.length)}
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#e3f55d", fontWeight: 700 }}
            >
              level of severity: 5
            </StyledTableCell>
            <StyledTableCell
              align="center"
              onClick={() => Navigate(severity5[0].severity)}
            >
              <a href="">{severity5.length}</a>
            </StyledTableCell>
            <StyledTableCell align="right">
              {Percentage(severity5.length, posts.length)}
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#f5e15d", fontWeight: 700 }}
            >
              level of severity: 6
            </StyledTableCell>
            <StyledTableCell
              align="center"
              onClick={() => Navigate(severity6[0].severity)}
            >
              <a href="">{severity6.length}</a>
            </StyledTableCell>
            <StyledTableCell align="right">
              {Percentage(severity6.length, posts.length)}
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#f5cc5d", fontWeight: 700 }}
            >
              level of severity: 7
            </StyledTableCell>
            <StyledTableCell
              align="center"
              onClick={() => Navigate(severity7[0].severity)}
            >
              <a href="">{severity7.length}</a>
            </StyledTableCell>
            <StyledTableCell align="right">
              {Percentage(severity7.length, posts.length)}
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#f5ac5d", fontWeight: 700 }}
            >
              level of severity: 8
            </StyledTableCell>
            <StyledTableCell
              align="center"
              onClick={() => Navigate(severity8[0].severity)}
            >
              <a href="">{severity8.length}</a>
            </StyledTableCell>
            <StyledTableCell align="right">
              {Percentage(severity8.length, posts.length)}
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#f5885d", fontWeight: 700 }}
            >
              level of severity: 9
            </StyledTableCell>
            <StyledTableCell
              align="center"
              onClick={() => Navigate(severity9[0].severity)}
            >
              <a href="">{severity9.length}</a>
            </StyledTableCell>
            <StyledTableCell align="right">
              {Percentage(severity9.length, posts.length)}
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledTableCell
              align="center"
              style={{ backgroundColor: "#f55d5d", fontWeight: 700 }}
            >
              level of severity: 10
            </StyledTableCell>
            <StyledTableCell
              align="center"
              onClick={() => Navigate(severity10[0].severity)}
            >
              <a href="">{severity10.length}</a>
            </StyledTableCell>
            <StyledTableCell align="right">
              {Percentage(severity10.length, posts.length)}
            </StyledTableCell>
          </TableBody>
          <TableBody>
            <StyledTableCell align="left"></StyledTableCell>
            <StyledTableCell
              align="center"
              style={{ fontWeight: 900, fontSize: "16px" }}
            >
              Total count of posts: {posts.length}
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PostGallery;
