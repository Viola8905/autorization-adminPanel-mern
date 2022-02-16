import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, functions }) => {
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  function showCard() {
    navigate(`/${post.mainId}`);
  }

  return (
    <Card>
      <CardHeader title={<Typography variant="h6">{post.name}</Typography>} />

      <CardContent>
        <Typography variant="caption">{post.description}</Typography>
        <Typography variant="h6">{post.danger}</Typography>
        <Typography variant="h6">{post.complexity}</Typography>
        <Typography variant="h6">{post.links}</Typography>
        <Typography variant="h6" onClick={showCard}>
          show card
        </Typography>
        {role === 1 ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => functions.removePost(post._id)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => functions.updatePost(post)}
            >
              Update
            </Button>
          </>
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
