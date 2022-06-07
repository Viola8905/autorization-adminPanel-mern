import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Link as MaterialLink } from "@material-ui/core";
const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <Button
    //  className={classes.backButton}
			style={{margin:"10px 0",backgroundColor:"black",color:"white"}}
      variant="outlined"
      size="small"
      onClick={() => navigate(-1)}
    >
      Назад
    </Button>
  );
};

export default BackBtn;
