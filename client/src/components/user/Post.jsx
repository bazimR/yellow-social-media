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
import { useMutation,useInfiniteQuery } from "@tanstack/react-query";
import { homePost, likePost } from "../../helper/helper";
import { useSelector } from "react-redux";

const Post = () => {
  const userId = useSelector((state) => state.user.value._id);
  const {
    data,
    isLoading,
  } = useInfiniteQuery({
    queryKey:["posts"],
    getNextPageParam: prevData => prevData.nextPage,
    queryFn:({pageParams=1})=> homePost(userId,pageParams)
  }
  // , ({ pageParams=1 }) =>
  //   homePost(userId, pageParams)
  // , {
  //   getNextPageParam: (lastPage) => {
  //     const currentPage = lastPage[lastPage.length - 1];
  //     if (currentPage.page < currentPage.total_pages) {
  //       return currentPage.page + 1;
  //     }
  //     return undefined;
  //   },
  // }
  );

console.log(data)
const handleLoad = () => {
  console.log(isLoading);
};
  const likeMn = useMutation({
    mutationKey:["posts"],
    mutationFn: likePost,
  });
  const handleLike = (postId, userId) => {
    likeMn.mutate({ postId, userId });
  };
  if (isLoading) return <h1>loading</h1>;

  return (
    <Grid
      container
      direction="row"
      sx={{
        height: "75vh",
        overflow: "auto",
        paddingTop: 1,
      }}
    >
      {data.pages.map((page) =>
        page.map((posts) => {
        return (
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
            <Card elevation={0} sx={{ width: 400, height: 550 }}>
              <CardActions sx={{ top: 0, left: 0, padding: 0 }}>
                <Button sx={{ padding: 1 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src=""
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
                    marginRight: 0,
                    fontSize: "0.9em",
                    fontWeight: "fontWeightMedium",
                    color: "primary.main",
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
                    <Typography
                      variant="body1"
                      color="secondary.darker"
                      sx={{ cursor: "default" }}
                    >
                      {posts.caption}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        handleLike(posts._id, userId);
                      }}
                      sx={{
                        color: `${
                          posts.likes?.includes(userId)
                            ? "primary.main"
                            : "primary.main"
                        }`,
                        padding: 0,
                      }}
                      aria-label="like"
                    >
                      {posts.likes.includes(userId) ? (
                        <FavoriteIcon
                          style={{ width: "35px", height: "35px" }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          style={{ width: "35px", height: "35px" }}
                        />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="comments"
                      sx={{ color: "secondary.darker", marginLeft: 1 }}
                    >
                      <BsChatSquareDots
                        style={{ width: "30px", height: "30px" }}
                      />
                    </IconButton>
                    <IconButton
                      aria-label="comments"
                      sx={{ color: "secondary.darker", marginLeft: 1 }}
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
      }))}
      <><button disabled={ isLoading}onClick={handleLoad}>load more</button></>
    </Grid>
  );
};

export default Post;
