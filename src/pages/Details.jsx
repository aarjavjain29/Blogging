import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import "./styles/datails.css";
import { useAuthContext } from "../contexts/AuthContext";
import { DeleteBlog } from "../utils/firebaseUtils";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.item;

  const { currentUser, handleFavIcon } = useAuthContext();

  const deleteFunc = () => {
    DeleteBlog(data.id);
    navigate("/");
  };

  return (
    <div className="detailsContainer">
      <Card sx={{ width: 700, margin: "3rem" }} className="cardContainer">
        <CardMedia
          className="cardImage"
          component="img"
          height="250"
          image={data?.imgUrl}
          alt="blog image"
        />
        <CardContent className="cardContent">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center"
            color="#e84224"
          >
            {data?.title}
          </Typography>

          <Typography variant="body3" value={data.date}>
            {data.date}
          </Typography>

          <Typography variant="body1" color="black" marginTop="1rem">
            {data?.content}
          </Typography>
          <Typography variant="body2" marginTop="1rem">
            {data.user}
          </Typography>
        </CardContent>
        <CardActions sx={{ borderRadius: "50%" }}>
          <FavoriteIcon
            className={
              data?.likedUserIds?.includes(currentUser.uid) > 0
                ? "active"
                : "favBtn"
            }
            sx={{ cursor: "pointer", marginRight: "5px" }}
            onClick={(e) => handleFavIcon(e, data)}
          />
          <span> {data?.likedUserIds?.length}</span>

          <ModeCommentOutlinedIcon sx={{ cursor: "pointer" }} />
          <span> 0</span>
        </CardActions>

        {currentUser?.email === data?.user ? (
          <div className="buttons">
            <Button className="deleteButton" onClick={deleteFunc}>
              DELETE
            </Button>
            <Button
              className="updateButton"
              onClick={() => navigate(`/updateBlog/${data.id}`, { state: { data } })}
            >
              UPDATE
            </Button>
          </div>
        ) : (
          <div className="blogWarning">
            Only the author of this blog can make changes...
          </div>
        )}
      </Card>
    </div>
  );
};

export default Details;
