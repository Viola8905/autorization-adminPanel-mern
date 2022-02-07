import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";


const PostCard = ({post}) => {
		const navigate = useNavigate();
    function f() {
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
        <Typography variant="h6" onClick={f}>
          show card
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
