import { Container, makeStyles } from "@material-ui/core";
import Filter from "../components/Filter";
import PostGallery from "../components/PostGallery";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
  paper: {
    marginBottom: "1rem",
    padding: 20,
  },
  inputField: {
    padding: "5px",
    marginBottom: "10px",
  },
});

const UserPage = () => {
  // Material ui styles

  const classes = useStyles();

  return (
    <div>
      <Container className={classes.root}>
        {/* //Filtering and sorting section */}
        <Filter />
        {/* //Posts listening */}
        <PostGallery />
      </Container>
    </div>
  );
};

export default UserPage;
