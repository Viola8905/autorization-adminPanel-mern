import { useState, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BootcampCard from "./BootcampCard";
import React from "react";

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
const BootcampsPage = () => {
  // Material ui styles
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.search);
  const params = location.search ? location.search : null;

  

  //Component state
  const [bootcamps, setBootcamps] = useState([]);

  const [loading, setLoading] = useState(false);

  //const [sliderMax,setSliderMax] = useState(1000);

  //const [priceRange, setPriceRange] = useState([25,75]);

  const [filter, setFilter] = useState("");

  //Side effects(loaded data to frontend network)
  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      setLoading(true);
      try {
        let query;
        if (params && !filter) {
          query = params;
        } else {
          query = filter;
        }

        const { data } = await axios({
          method: "GET",
          url: `/api/v1/bootcamps${query}`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        setBootcamps(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();

    return () => cancel();
  }, [filter, params]);

  const [price, setPrice] = useState();

  const handleChange = (event) => {
    setPrice(event.target.value);
  };

  function f() {
    navigate(`?price[gte]=${price} `);
  }

  return (
    <Container className={classes.root}>
      {/* //Filtering and sorting section */}
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Filters</Typography>

            <input type="number" onInput={handleChange} />
            <button onClick={f}> Push</button>
          </Grid>
        </Grid>
      </Paper>

      {/* //Bootcamps listening */}
      <Grid container spacing={2}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) : (
          bootcamps.map((bootcamp) => (
            <Grid item key={bootcamp._id} xs={12} sm={6} lg={3}>
              <BootcampCard bootcamp={bootcamp} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default BootcampsPage;
