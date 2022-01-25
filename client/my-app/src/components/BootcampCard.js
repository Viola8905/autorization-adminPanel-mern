import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const BootcampCard = ({ bootcamp }) => {
  const navigate = useNavigate();
  function f() {
    navigate(`/${bootcamp.mainId}`);
  }
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={<Typography variant="h6">{bootcamp.name}</Typography>}
      />

      <CardContent>
        <Typography variant="caption">{bootcamp.description}</Typography>
        <Typography variant="h6">{bootcamp.price}</Typography>
        <Typography variant="h6" onClick={f}>
          show card
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BootcampCard;
