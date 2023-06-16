import { Modal, Box, Grid } from "@mui/material";
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  List,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { setModalComment } from "../../redux/commentModelSlice";
import TimeAgo from "timeago-react";
import Comment from "./Comment";
// import { RiBookmarkFill } from "@react-icons/all-files/ri/RiBookmarkFill.esm"//when saved done

import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addComment, getComments } from "../../helper/helper";
import { useState } from "react";

const CommentModal = () => {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post?.value);
  const queryClient = useQueryClient();

  const BoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      lg: "60em",
    },
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 0,
  };
  const handleClose = () => {
    dispatch(setModalComment(false));
  };
  const modal = useSelector((state) => state.modal.value);
  const userId = useSelector((state) => state.user.value._id);
  const username = useSelector((state) => state.user.value.username);
  const postId = posts._id;

  //

  // geting comments
  const commentQuery = useQuery({
    enabled: modal,
    queryKey: ["comments", postId],
    queryFn: () => {
      return getComments(postId, userId);
    },
    refetchOnWindowFocus: true,
  });
  if (commentQuery.isLoading) {
    return <h1>loading</h1>;
  }
  // mutation
  const handleCommentSubmit = () => {
    const formData = {
      userId,
      postId,
      username,
      body,
    };
    addComment(formData).then(() => {
      queryClient
        .refetchQueries({ queryKey: ["comments", postId] })
        .then(() => {
          setBody("");
        });
    });
  };
  // handle delete

  return (
    <Modal
      sx={{ display: { xs: "none", lg: "flex" } }}
      disableAutoFocus={true}
      open={modal}
      onClose={handleClose}
    >
      <Box sx={BoxStyle}>
        <Grid container direction="row" spacing={0} columns={16}>
          <Grid xs={9} item key={posts._id}>
            <Card
              elevation={0}
              sx={{
                width: 500,
                height: 500,
                padding: 1,
                borderRadius: "10px",
              }}
            >
              <CardContent
                sx={{
                  backgroundImage: `url(${posts.imageUrl})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  width: 500,
                  height: 500,
                  padding: 0,
                  borderRadius: "10px",
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
                ></Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item padding={1} xs={7}>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Avatar
                alt="user"
                src=""
                sx={{
                  bgcolor:"primary.light",
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
            </Grid>
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
                {posts.username} : {posts.caption}
              </Typography>
              <Typography sx={{ fontSize: "12px" }} color="#737373">
                <TimeAgo live={false} datetime={posts.Date} />
              </Typography>
            </Grid>
            <Grid item>
              <Divider />
              <List sx={{ height: 360, overflow: "auto" }}>
                {commentQuery.data.length === 0 ? (
                  <Typography
                    component={"span"}
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginY: 20,
                    }}
                  >
                    Be the first one to comment....
                  </Typography>
                ) : (
                  commentQuery.data.map((doc) => {
                    return <Comment doc={doc} key={doc._id} />;
                  })
                )}
              </List>
            </Grid>
            <Divider />
            <Grid item>
              <TextField
                value={body}
                id="Commentbody"
                name="Commentbody"
                onChange={(e) => {
                  setBody(e.target.value);
                }}
                placeholder="comment...."
                variant="standard"
                sx={{ width: "80%" }}
                inputProps={{ style: { height: "2em" } }}
              />
              <Button
                disabled={body === ""}
                onClick={handleCommentSubmit}
                variant="text"
                sx={{ marginTop: 1, marginLeft: 2 }}
              >
                post
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CommentModal;
