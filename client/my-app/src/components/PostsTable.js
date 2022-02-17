import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { green } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Paper } from "@material-ui/core";

const PostsTable = () => {
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

  const dispatch = useDispatch();

  //Component state

  const [posts, setPosts] = useState([]);

  const [danger1, setDanger1] = useState([]);
  const [danger2, setDanger2] = useState([]);
  const [danger3, setDanger3] = useState([]);
  const [danger4, setDanger4] = useState([]);
  const [danger5, setDanger5] = useState([]);
  const [danger6, setDanger6] = useState([]);
  const [danger7, setDanger7] = useState([]);
  const [danger8, setDanger8] = useState([]);
  const [danger9, setDanger9] = useState([]);
  const [danger10, setDanger10] = useState([]);

  useEffect(() => {
    const Posts = () => {
      return async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/posts`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
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
  }, []);

  function Percentage(danger, coutOfPosts) {
    return <>{Math.ceil((danger / coutOfPosts) * 100)}%</>;
  }

  return (
    <TableContainer component={Paper} style={{ margin: "30px 0" }}>
      <Table sx={{}} aria-label="customized table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#1976d2" }}>
            <StyledTableCell>CVSS danger</StyledTableCell>
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
            level of danger: 1
          </StyledTableCell>
          <StyledTableCell align="center">{danger1.length}</StyledTableCell>
          <StyledTableCell align="right">
            {Percentage(danger1.length, posts.length)}
          </StyledTableCell>
        </TableBody>
        <TableBody>
          <StyledTableCell
            align="center"
            style={{ backgroundColor: "#4dd663", fontWeight: 700 }}
          >
            level of danger: 2
          </StyledTableCell>
          <StyledTableCell align="center">{danger2.length}</StyledTableCell>
          <StyledTableCell align="right">
            {Percentage(danger2.length, posts.length)}
          </StyledTableCell>
        </TableBody>
        <TableBody>
          <StyledTableCell
            align="center"
            style={{ backgroundColor: "#5df575", fontWeight: 700 }}
          >
            level of danger: 3
          </StyledTableCell>
          <StyledTableCell align="center">{danger3.length}</StyledTableCell>
          <StyledTableCell align="right">
            {Percentage(danger3.length, posts.length)}
          </StyledTableCell>
        </TableBody>
        <TableBody>
          <StyledTableCell
            align="center"
            style={{ backgroundColor: "#c7f55d", fontWeight: 700 }}
          >
            level of danger: 4
          </StyledTableCell>
          <StyledTableCell align="center">{danger4.length}</StyledTableCell>
          <StyledTableCell align="right">
            {Percentage(danger4.length, posts.length)}
          </StyledTableCell>
        </TableBody>
        <TableBody>
          <StyledTableCell
            align="center"
            style={{ backgroundColor: "#e3f55d", fontWeight: 700 }}
          >
            level of danger: 5
          </StyledTableCell>
          <StyledTableCell align="center">{danger5.length}</StyledTableCell>
          <StyledTableCell align="right">
            {Percentage(danger5.length, posts.length)}
          </StyledTableCell>
        </TableBody>
        <TableBody>
          <StyledTableCell
            align="center"
            style={{ backgroundColor: "#f5e15d", fontWeight: 700 }}
          >
            level of danger: 6
          </StyledTableCell>
          <StyledTableCell align="center">{danger6.length}</StyledTableCell>
          <StyledTableCell align="right">
            {Percentage(danger6.length, posts.length)}
          </StyledTableCell>
        </TableBody>
        <TableBody>
          <StyledTableCell
            align="center"
            style={{ backgroundColor: "#f5cc5d", fontWeight: 700 }}
          >
            level of danger: 7
          </StyledTableCell>
          <StyledTableCell align="center">{danger7.length}</StyledTableCell>
          <StyledTableCell align="right">
            {Percentage(danger7.length, posts.length)}
          </StyledTableCell>
        </TableBody>
        <TableBody>
          <StyledTableCell
            align="center"
            style={{ backgroundColor: "#f5ac5d", fontWeight: 700 }}
          >
            level of danger: 8
          </StyledTableCell>
          <StyledTableCell align="center">{danger8.length}</StyledTableCell>
          <StyledTableCell align="right">
            {Percentage(danger8.length, posts.length)}
          </StyledTableCell>
        </TableBody>
        <TableBody>
          <StyledTableCell
            align="center"
            style={{ backgroundColor: "#f5885d", fontWeight: 700 }}
          >
            level of danger: 9
          </StyledTableCell>
          <StyledTableCell align="center">{danger9.length}</StyledTableCell>
          <StyledTableCell align="right">
            {Percentage(danger9.length, posts.length)}
          </StyledTableCell>
        </TableBody>
        <TableBody>
          <StyledTableCell
            align="center"
            style={{ backgroundColor: "#f55d5d", fontWeight: 700 }}
          >
            level of danger: 10
          </StyledTableCell>
          <StyledTableCell align="center">{danger10.length}</StyledTableCell>
          <StyledTableCell align="right">
            {Percentage(danger10.length, posts.length)}
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
  );
};

export default PostsTable;
