import { useState, useEffect } from "react";

import {
  Container,
  Grid,
  Button,
  Typography,
  makeStyles,
  Card,
} from "@material-ui/core";

import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

import BackBtn from "../components/backBtn/BackBtn";
import { updateUser } from "../reducers/userReducer";

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
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  function showCard(id) {
    navigate(`/${id}`);
  }

  const [notificationsState, setNotifications] = useState(notifications);
  const [deleteNotification, setDeleteNotifications] = useState(false);

  const classes = useStyles();

  const updateReduxState = (user) => {
    return (dispatch) => {
      dispatch(updateUser(user));
    };
  };

  const updateNotifications = (id) => {
    setNotifications(notificationsState.filter((notif) => notif._id !== id));
  };

  const handleDelete = async (id, user) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/notifications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            id,
            user,
          },
        }
      );

      if (response.data.success) {
        updateNotifications(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updateUser = { ...user };
    if (updateUser.notifications == null || undefined)
      updateUser.notifications(notificationsState);
    dispatch(updateReduxState(updateUser));
  }, [notificationsState]);

  const isStateEmpty =
    notificationsState !== null &&
    notificationsState !== undefined &&
    notificationsState?.length !== 0;

  console.log(isStateEmpty);
  return (
    <Container className={classes.root}>
      {/* //go to main page button */}
      <BackBtn />

      <Grid container spacing={2}>
        {isStateEmpty ? (
          notificationsState.map((notif) => (
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
                <Typography style={{ fontSize: "14px", color: "blue" }}>
                  {new Date(notif.createdAt).toLocaleString()}
                </Typography>

                {deleteNotification ? (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => showCard(notif.postId)}
                      style={{ alignSelf: "flex-end", marginRight: "10px" }}
                    >
                      дивитися пост
                    </Button>
                    <Button
                      key={`acceptkey-${notif._id}`}
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(notif._id, user._id)}
                      style={{ marginRight: "10px" }}
                    >
                      {/* <span>Notif {notif._id}</span> */}
                      {/* <span>User{user._id}</span> */}
                      <DoneIcon />
                    </Button>
                    <Button
                      key={`cancelkey-${notif._id}`}
                      variant="contained"
                      color="inherit"
                      onClick={() => setDeleteNotifications(false)}
                    >
                      <CloseIcon />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => showCard(notif.postId)}
                      style={{ alignSelf: "flex-end", marginRight: "10px" }}
                    >
                      дивитися пост
                    </Button>
                    <Button
                      key={`deletekey-${notif._id}`}
                      variant="contained"
                      color="primary"
                      onClick={() => setDeleteNotifications(true)}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </div>
                )}
              </Card>
            </Grid>
          ))
        ) : (
          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            xs={12}
            sm={12}
            lg={12}
          >
            <Card
              style={{
                display: "flex",
                padding: "20px",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Typography
                style={{
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                No notifications <NotificationsNoneIcon />
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default NotificationsPage;
