import { useState, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import BootcampCard from "../components/BootcampCard";
import React from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginBottom: "1rem",
    padding: 20,
  },
  filters: {
    padding: " 0 1.5rem",
  },
  priceRangeInputs: {
    display: "flex",
    justifyContent: "space-between",
  },
});
const ItemPage = () => {
  // Material ui styles
  const dispatch = useDispatch();
  const classes = useStyles();

  // const navigate = useNavigate();
  const location = useParams();
  console.log(location);

  let params = parseInt(location.mainId);
  console.log(typeof params);

  //Component state
  const [posts, setPosts] = useState([]);

  //const [loading, setLoading] = useState(false);

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

          console.log("query:" + typeof query + "---" + query);
          const response = await axios.get(
            `http://localhost:5000/api/posts/${query}`,
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
    <Container className={classes.root}>
      {/* //Filtering and sorting section */}

      {/* //Bootcamps listening */}
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
    </Container>
  );
};

export default ItemPage;
