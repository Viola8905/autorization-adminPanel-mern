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
  setSeverityLevel,
  setComplexity,
  setFixes,
  setVersion,
  setOperationSystem,
  setDeveloper,
  setPlatform,
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
    setSeverityLevel(post.severity);
    setDescription(post.description);
    setComplexity(post.complexity);
    setFixes(post.fixes);
    setVersion(post.version);
    setOperationSystem(post.operationSystem);
    setDeveloper(post.developer);
    setPlatform(post.platform);
  };

  function renderCard(role, isEditing) {
    if (!isEditing) {
      return (
        <Card className="post-card">
          <CardHeader
            title={
              <Typography variant="h6" className="description_block">
                {post.name}
              </Typography>
            }
          />
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="caption" className="description_block">
              {post.description}
            </Typography>
            <Typography variant="h6">CVSS Score: {post.severity}</Typography>
            <Rating
              value={post.severity}
              readOnly
              size="medium"
              precision={0.1}
              max={10}
            />
            <Typography variant="h6">
              Access complexity: {post.complexity}
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
                setSeverityLevel(e.target.value);
              }}
              defaultValue={post.severity}
              type="text"
              placeholder="severity"
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
                setFixes(e.target.value);
              }}
              defaultValue={post.fixes}
              type="text"
              placeholder="fixes"
              name="fixes"
            />
            <Input
              className={classes.colItem}
              onChange={(e) => {
                setVersion(e.target.value);
              }}
              defaultValue={post.version}
              type="text"
              placeholder="version"
              name="version"
            />
            <Input
              className={classes.colItem}
              onChange={(e) => {
                setOperationSystem(e.target.value);
              }}
              defaultValue={post.operationSystem}
              type="text"
              placeholder="operationSystem"
              name="operationSystem"
            />
            <Input
              className={classes.colItem}
              onChange={(e) => {
                setDeveloper(e.target.value);
              }}
              defaultValue={post.developer}
              type="text"
              placeholder="developer"
              name="developer"
            />
            <Input
              className={classes.colItem}
              onChange={(e) => {
                setPlatform(e.target.value);
              }}
              defaultValue={post.platform}
              type="text"
              placeholder="platform"
              name="platform"
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
