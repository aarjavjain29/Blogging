import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../utils/firebaseUtils";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import spinner from "../assests/spinner.gif";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const BlogCard = () => {
  const { blogList } = useFetch();
  let navigate = useNavigate();
  const { currentUser, handleFavIcon } = useContext(AuthContext);
  // console.log(currentUser)

 

  return (
    <div className="blogCardForm">
      {blogList ? (
        blogList?.map((item, index) => (
          <Card sx={{ maxWidth: 320 }} className="cardContainer" key={index} loading="lazy">
            <CardMedia
              className="cardImage"
              component="img"
              height="170"
              image={item?.imgUrl}
              alt="blog image"
              onClick={() =>
                navigate(`/details/${item.id}`, { state: { item } })
              }
              sx={{ cursor: "pointer" }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                onClick={() =>
                  navigate(`/details/${item.id}`, { state: { item } })
                }
                sx={{ cursor: "pointer" }}
              >
                {item?.title}
              </Typography>

              <Typography variant="h6" sx={{ fontSize: "12px" }}>
                {item?.date}
              </Typography>
              <Typography
              height={90}
                variant="body2"
                color="text.secondary"
                sx={{ cursor: "pointer", "&:hover": { color: "black" } }}
                onClick={() =>
                  navigate(`/details/${item.id}`, { state: { item } })
                }
              >
                {item?.content.substring(0, 150) + " ..."}
              </Typography>
            </CardContent>
            <CardActions sx={{ borderRadius: "50%" }} className="cardBottom">
              <FavoriteIcon
                className={
                  item?.likedUserIds?.includes(currentUser.uid) > 0
                    ? "active"
                    : "favBtn"
                }
                sx={{ cursor: "pointer", marginRight: "5px" }}
                onClick={(e) => handleFavIcon(e, item)}
              />
              <span style={{ marginRight: "0.5rem" }}>
                {" "}
                {item.likedUserIds?.length}
              </span>
              <ModeCommentOutlinedIcon sx={{ cursor: "pointer" }} />
              <span>0</span>

              <Typography className="email">{item.user}</Typography>
            </CardActions>
          </Card>
        ))
      ) : (
        <div className="spinner">
          <img src={spinner} alt="" />
        </div>
      )}
    </div>
  );
};

export default BlogCard;
