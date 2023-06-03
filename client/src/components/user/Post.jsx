import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BsChatSquareDots } from "@react-icons/all-files/bs/BsChatSquareDots.esm";
import { FaRegBookmark } from "@react-icons/all-files/fa/FaRegBookmark.esm";
import { useState } from "react";

const Post = () => {
  const post = ["", ",", ",", ",", ",", ""];
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  return (
    <Grid
      container
      direction="row"
      sx={{
        height:'75vh',
        overflow: "auto",
        paddingTop: 1,
      }}
    >
      {post.map((post) => {
        return (
          <Grid
            xs={12}
            key={post}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom:2
            }}
          >
            <Card elevation={0} sx={{ width: 400, height: 580 }}>
              <CardActions sx={{ top: 0, left: 0, padding: 0 }}>
                <Button sx={{ padding: 1 }}>
                  <Avatar
                    alt="Remy Sharp"
                    sx={{
                      width: 35,
                      height: 35,
                      border: 2,
                      borderColor: "primary.main",
                    }}
                  />
                </Button>
                <Typography
                  sx={{
                    padding: 0,
                    marginRight: 23,
                    fontSize: "0.9em",
                    fontWeight: "fontWeightRegular",
                    color: "black",
                  }}
                  color="initial"
                >
                  username
                </Typography>
                <Button sx={{ marginLeft: "auto" }}>Report</Button>
              </CardActions>
              <CardContent
                sx={{
                  backgroundColor: "red",
                  width: 400,
                  height: 430,
                  padding: 0,
                }}
              ></CardContent>
              <CardActions>
                <Grid
                  container
                  direction={"column"}
                  spacing={1}
                  sx={{
                    padding: 0,
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Grid item>
                    <Typography variant="body1" color="initial">
                      Post caption
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <IconButton
                      sx={{
                        color: `${like ? "initial" : "primary.main"}`,
                        padding: 0,
                      }}
                      aria-label="like"
                      onClick={() => handleLike()}
                    >
                      {like ? (
                        <FavoriteBorderIcon
                          style={{ width: "35px", height: "35px" }}
                        />
                      ) : (
                        <FavoriteIcon
                          style={{ width: "35px", height: "35px" }}
                        />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="comments"
                      sx={{ color: "initial", marginLeft: 1 }}
                    >
                      <BsChatSquareDots
                        style={{ width: "30px", height: "30px" }}
                      />
                    </IconButton>
                    <IconButton
                      aria-label="comments"
                      sx={{ color: "initial", marginLeft: 1 }}
                    >
                      <FaRegBookmark
                        style={{ width: "30px", height: "30px" }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Post;
