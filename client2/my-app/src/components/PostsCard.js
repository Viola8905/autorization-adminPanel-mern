import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Input,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStyles } from "../styles/global";
import { Rating } from "@mui/material";

const PostCard = ({
  post,
  setDescription,
  setName,
  setDangerLevel,
  setComplexity,
  setLinks,
  setPostId,
  updatePost,
  removePost,
}) => {
  const classes = useStyles();
  const [isEditing, setEdit] = useState(false);

  const role = useSelector((state) => state.user.role);

  const navigate = useNavigate();
  function showCard() {
    navigate(`/${post.mainId}`);
  }

  const setEditDefault = () => {
    setPostId(post._id);
    setName(post.name);
    setDangerLevel(post.danger);
    setDescription(post.description);
    setComplexity(post.complexity);
    setLinks(post.links);
  };

  function renderCard(role, isEditing) {
    if (!isEditing) {
      return (
        <Card>
          <CardHeader
            title={<Typography variant="h6">{post.name}</Typography>}
          />
          <CardContent
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Typography variant="caption">{post.description}</Typography>
            <Typography variant="h6">CVSS Score: {post.danger}</Typography>
            <Rating
              value={post.danger}
              readOnly
              size="medium"
              precision={0.1}
              max={10}
            />
            <Typography variant="h6">
              Access complexity: {post.complexity}
            </Typography>
            <Typography style={{ display: "block" }} variant="caption">
              {post.links}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              style={{ padding: "10px 0", marginBottom: "10px" }}
              onClick={showCard}
            >
              Details
            </Button>
            {role ? (
              <>
                <Button
                  onClick={() => {
                    setEdit(true);
                    setEditDefault();
                  }}
                  variant="contained"
                  color="primary"
                  style={{ padding: "10px 0", marginBottom: "10px" }}
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    removePost(post._id);
                  }}
                  variant="contained"
                  color="secondary"
                  style={{ padding: "10px 0" }}
                >
                  Delete
                </Button>
              </>
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
      );
    } else if (isEditing) {
      return (
        <Card>
          <CardHeader
            title={
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                defaultValue={post.name}
                type="text"
                placeholder=""
              />
            }
          />
          <CardContent className={classes.flexColLeft}>
            <Input
              className={classes.colItem}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              defaultValue={post.description}
              type="text"
              placeholder="description"
              name="description"
            />
            <Input
              className={classes.colItem}
              onChange={(e) => {
                setDangerLevel(e.target.value);
              }}
              defaultValue={post.danger}
              type="text"
              placeholder="danger"
            />
            <Input
              className={classes.colItem}
              onChange={(e) => {
                setComplexity(e.target.value);
              }}
              defaultValue={post.complexity}
              type="text"
              placeholder="complexity"
              name="complexity"
            />
            <Input
              className={classes.colItem}
              onChange={(e) => {
                setLinks(e.target.value);
              }}
              defaultValue={post.links}
              type="text"
              placeholder="links"
              name="complexity"
            />
            {role ? (
              <Button
                onClick={() => {
                  setEdit(false);
                  updatePost();
                }}
                variant="contained"
                color="primary"
              >
                Save Changes
              </Button>
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
      );
    }
  }

  return <>{renderCard(role, isEditing)}</>;
};

export default PostCard;
