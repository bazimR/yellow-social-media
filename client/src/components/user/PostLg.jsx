import {
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Typography,
  Badge,
} from "@mui/material";
import propTypes from "prop-types";
import { RiHeartFill } from "@react-icons/all-files/ri/RiHeartFill.esm";
import { RiHeartLine } from "@react-icons/all-files/ri/RiHeartLine.esm";
import { RiBookmarkLine } from "@react-icons/all-files/ri/RiBookmarkLine.esm";
// import { RiBookmarkFill } from "@react-icons/all-files/ri/RiBookmarkFill.esm"//when saved done
import TimeAgo from "timeago-react";
import { RiChat1Line } from "@react-icons/all-files/ri/RiChat1Line.esm";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { likePost } from "../../helper/helper";
import { useState } from "react";
import { setPostRedux } from "../../redux/postSlice";
import { setModalComment } from "../../redux/commentModelSlice";

const PostLg = ({ posts }) => {
  const userId = useSelector((state) => state.user.value._id);
  const [likeCount, setLikeCount] = useState(posts.likes.length);
  const [like, setLike] = useState(posts.likes.includes(userId));
  const likeMn = useMutation({
    mutationKey: ["posts"],
    mutationFn: likePost,
    onSuccess: ({ data }) => {
      const value = parseInt(data.value);
      setLike(!like);
      if (value < 1) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
    },
  });

  const handleLike = (postId, userId) => {
    likeMn.mutate({ postId, userId });
  };

  const dispatch = useDispatch();

  const handleComment = () => {
    dispatch(setPostRedux(posts));
    dispatch(setModalComment(true));
  };
  const style = {
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(1.9px)",
    WebkitBackdropFilter: "blur(1.9px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  };
  return (
    <>
      <Grid
        item
        xs={12}
        key={posts._id}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Card
          style={style}
          elevation={10}
          sx={{
            width: 400,
            height: 535,
            padding: 1,
            borderRadius: "20px",
          }}
        >
          <CardActions sx={{ top: 0, left: 0, padding: 0 }}>
            <Avatar
              alt="user"
              src=""
              sx={{
                width: 40,
                height: 40,
                marginY: 1,
              }}
            />
            <Typography
              sx={{
                paddingLeft: 1,
                marginRight: 0,
                fontSize: "0.9em",
                fontWeight: "fontWeightMedium",
                color: "black",
                cursor: "default",
              }}
            >
              {posts.username}
            </Typography>
          </CardActions>
          <CardContent
            sx={{
              backgroundImage: `url(${posts.imageUrl})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              width: 400,
              height: 400,
              padding: 0,
              borderRadius: "20px",
            }}
          ></CardContent>
          <CardActions>
            <Grid
              container
              direction={"column"}
              sx={{
                padding: 0,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "inherit",
                }}
              >
                <Typography
                  variant="body1"
                  color="secondary.darker"
                  sx={{ cursor: "default", fontWeight: 500 }}
                >
                  {posts.caption}
                </Typography>
                <Typography sx={{ fontSize: "12px" }} color="#737373">
                  <TimeAgo live={false} datetime={posts.Date} />
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid>
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(posts._id, userId);
                    }}
                    sx={{
                      color: `${like ? "red" : "black"}`,
                      padding: 0,
                    }}
                    aria-label="like"
                  >
                    <Badge
                      badgeContent={likeCount}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      {like ? (
                        <RiHeartFill
                          style={{ width: "35px", height: "35px" }}
                        />
                      ) : (
                        <RiHeartLine
                          style={{ width: "35px", height: "35px" }}
                        />
                      )}
                    </Badge>
                  </IconButton>
                  <IconButton
                    onClick={handleComment}
                    aria-label="comments"
                    sx={{ color: "black", marginLeft: 1 }}
                  >
                    <RiChat1Line style={{ width: "35px", height: "35px" }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton sx={{ color: "black", marginLeft: "auto" }}>
                    <RiBookmarkLine style={{ width: "35px", height: "35px" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

PostLg.propTypes = {
  posts: propTypes.object.isRequired,
};

export default PostLg;
