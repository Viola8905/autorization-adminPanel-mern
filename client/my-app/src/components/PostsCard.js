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
          <CardContent>
            <Typography variant="caption">{post.description}</Typography>
            <Typography variant="h6">{post.danger}</Typography>
            <Typography variant="h6">{post.complexity}</Typography>
            <Typography variant="h6">{post.links}</Typography>
            <Typography variant="h6" onClick={showCard}>
              show card
            </Typography>
            {role ? (
              <>
                <Button
                  onClick={() => {
                    setEdit(true);
                    setEditDefault();
                  }}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    removePost(post._id);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Delete
                </Button>
              </>
            ) : (
              <></>
            )}
            <Button onClick={() => console.log(role)}>Log role</Button>
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
