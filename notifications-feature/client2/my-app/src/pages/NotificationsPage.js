import {
  Container,
  Grid,
  Button,
  Paper,
  Typography,
  makeStyles,
	Card,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import BackBtn from "../components/backBtn/BackBtn";

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

const NotificationsPage = () => {
  const notifications = useSelector(
    (state) => state.user.currentUser.notifications
  );

  const navigate = useNavigate();
  function showCard(id) {
    navigate(`/${id}`);
  }

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {/* //go to main page button */}
      <BackBtn />

      <Grid container spacing={2}>
        {notifications.map((notif) => (
          <Grid item key={notif._id} xs={12} sm={12} lg={12}>
            <Card
              style={{
                display: "flex",
                padding: "20px",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Typography style={{ fontWeight: "700" }}>
                {notif.content}
              </Typography>
              <Typography style={{ fontSize: "14px", color:"blue" }}>
                {new Date(notif.createdAt).toUTCString()}
              </Typography>
              {/* <Link to={`/${notif.postId}`}>Link</Link> */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => showCard(notif.postId)}
                style={{ alignSelf: "flex-end" }}
              >
                дивитися пост
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NotificationsPage;
