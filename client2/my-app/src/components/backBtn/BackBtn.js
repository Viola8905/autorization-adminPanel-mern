import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Link as MaterialLink } from "@material-ui/core";
const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <Button
    //  className={classes.backButton}
      variant="outlined"
      size="small"
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default BackBtn;
