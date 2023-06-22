import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import loading from "react-useanimations/lib/loading";
import { useDispatch, useSelector } from "react-redux";
import { setPostModal, setPostRedux } from "../../redux/postSlice";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import UseAnimations from "react-useanimations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../helper/helper";

const EditPost = () => {
  const posts = useSelector((state) => state.post.value);
  const queryClient = useQueryClient();

  const BoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 0,
  };
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.post.postModal);
  const handleClose = () => {
    dispatch(setPostRedux(""));
    dispatch(setPostModal(false));
  };
  const editPostMn = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      dispatch(setPostModal(false));
      setCaption("");
      dispatch(setPostRedux(""));
      queryClient.invalidateQueries(["posts", posts.userId]);
    },
  });
  const handleEdit = () => {
    const postObj = {
      postId: posts._id,
      caption: caption,
    };
    editPostMn.mutate(postObj);
  };
  return (
    <Modal
      sx={{ display: { xs: "none", lg: "flex" } }}
      disableAutoFocus={true}
      open={modal}
      onClose={handleClose}
    >
      <Box sx={BoxStyle}>
        <Card
          sx={{
            width: 450,
            height: 610,
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
            </Typography>
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
              ></Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <TextField
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  id="caption"
                  name="caption"
                  size="small"
                  variant="standard"
                  sx={{ width: "100%", padding: { xs: 1 } }}
                  type="text"
                  value={caption}
                  placeholder={posts.caption}
                />
                <LoadingButton
                  onClick={handleEdit}
                  disabled={caption || editPost.isLoading ? false : true}
                  type="button"
                  sx={{ fontSize: 20, padding: 1 }}
                  variant="text"
                  disableTouchRipple
                  loadingIndicator={
                    <UseAnimations
                      animation={loading}
                      strokeColor="#4aa0e7"
                      size={40}
                    />
                  }
                  loading={editPostMn.isLoading}
                >
                  edit
                </LoadingButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default EditPost;
