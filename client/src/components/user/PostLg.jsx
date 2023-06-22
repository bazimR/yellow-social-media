import {
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import propTypes from "prop-types";
import { RiHeartFill } from "@react-icons/all-files/ri/RiHeartFill.esm";
import { RiHeartLine } from "@react-icons/all-files/ri/RiHeartLine.esm";
import { RiBookmarkLine } from "@react-icons/all-files/ri/RiBookmarkLine.esm";
// import { RiBookmarkFill } from "@react-icons/all-files/ri/RiBookmarkFill.esm"//when saved done
import TimeAgo from "timeago-react";
import { RiChat1Line } from "@react-icons/all-files/ri/RiChat1Line.esm";
import { RiEdit2Line } from "@react-icons/all-files/ri/RiEdit2Line.esm";
import { RiDeleteBin6Line } from "@react-icons/all-files/ri/RiDeleteBin6Line.esm";

import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, likePost } from "../../helper/helper";
import { useState } from "react";
import { setPostModal, setPostRedux } from "../../redux/postSlice";
import { setModalComment } from "../../redux/commentModelSlice";
import { RiMoreFill } from "@react-icons/all-files/ri/RiMoreFill.esm";
import { useConfirm } from "material-ui-confirm";

const PostLg = ({ posts }) => {
  const confirm = useConfirm();
  const userId = useSelector((state) => state.user.value._id);
  const [likeCount, setLikeCount] = useState(posts.likes.length);
  const [like, setLike] = useState(posts.likes.includes(userId));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    confirm({
      title: "Are you sure you want to delete this post?",
      confirmationButtonProps: { autoFocus: true },
    })
      .then(() => {
        setAnchorEl(null);
        deletePost(posts._id).then(() => {
          queryClient.invalidateQueries(["posts", userId]);
        });
      })
      .catch(() => {
        console.log("canceled");
      });
  };
  const style = {
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(1.9px)",
    WebkitBackdropFilter: "blur(1.9px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  };

  const handleEdit = () => {
    console.log("hi");
    dispatch(setPostRedux(posts));
    dispatch(setPostModal(true));
    setAnchorEl(null);
  };
  return (
    <>
      <Card
        style={style}
        sx={{
          width: 450,
          height: 620,
          padding: 1,
          borderRadius: "20px",
        }}
      >
        <CardActions sx={{ top: 0, left: 0, padding: 0 }}>
          <Avatar
            alt="user"
            src={posts.profileUrl}
            sx={{
              bgcolor: "primary.light",
              width: 40,
              height: 40,
              marginY: 1,
            }}
          />
          <Typography
            component={"span"}
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
            <Typography sx={{ fontSize: "10px" }} color="#737373">
              <TimeAgo live={false} datetime={posts.Date} />
            </Typography>
          </Typography>

          <IconButton
            sx={{ marginLeft: "auto" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <RiMoreFill />
          </IconButton>

          {posts.userId === userId && (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                sx={{ color: "red" }}
                onClick={() => {
                  handleDelete(posts._id);
                }}
              >
                <RiDeleteBin6Line />
                <Typography variant="body1" ml={1} color="initial">
                  delete
                </Typography>
              </MenuItem>

              <MenuItem
                sx={{ color: "primary.main" }}
                onClick={() => {
                  handleEdit();
                }}
              >
                <RiEdit2Line />
                <Typography variant="body1" ml={1} color="initial">
                  edit
                </Typography>
              </MenuItem>
            </Menu>
          )}
        </CardActions>
        <CardContent
          sx={{
            backgroundImage: `url(${posts.imageUrl})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            width: 450,
            height: 450,
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
                  {like ? (
                    <RiHeartFill style={{ width: "35px", height: "35px" }} />
                  ) : (
                    <RiHeartLine style={{ width: "35px", height: "35px" }} />
                  )}
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
            <Grid item>
              <Typography
                variant="body1"
                color="secondary.darker"
                sx={{ cursor: "default", fontWeight: 500 }}
              >
                {likeCount} likes
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "secondary.darker",
                  fontWeight: 500,
                }}
              >
                {posts.username}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#747474",
                  fontWeight: 500,
                  paddingX: 1,
                }}
              >
                {posts.caption}
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

PostLg.propTypes = {
  posts: propTypes.object.isRequired,
};

export default PostLg;
