import { Modal, Box, Grid } from "@mui/material";
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import { setModalComment } from "../../redux/commentModelSlice";
// import { RiBookmarkFill } from "@react-icons/all-files/ri/RiBookmarkFill.esm"//when saved done

import { useDispatch, useSelector } from "react-redux";

const CommentModal = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post?.value);
  //  const userId = useSelector((state) => state.user.value._id); remember !!!!!!!!!!!!!!!!!!!!
  var currentDate = new Date(); // Current date and time
  var postDate = new Date(posts.Date); // Date and time of the post

  // Calculate the time difference in milliseconds
  var timeDiff = currentDate.getTime() - postDate.getTime();

  // Convert the time difference to hours
  var hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  // handling comment
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
                {hoursDiff} hours ago
              </Typography>
            </Grid>
            <Grid item>
              <Divider />
              <List sx={{ maxHeight: 300, overflow: "auto" }}>
                <ListItem disableGutters>
                  <ListItemAvatar>
                    <Avatar
                      alt="user"
                      src=""
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ display: "inline" }}
                    primary={"username"}
                    secondary={
                      <>
                        <Typography
                          sx={{
                            overflowWrap: "break-word", // Set the overflowWrap property
                            wordBreak: "break-word", // Add wordBreak property for better support
                          }}
                          variant="subtitle2"
                          color="initial"
                        >
                          subject
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CommentModal;
