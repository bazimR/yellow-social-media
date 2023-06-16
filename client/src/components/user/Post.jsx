import { Grid } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { homePost } from "../../helper/helper";
import { useSelector } from "react-redux";
import PostLg from "./PostLg";
import CommentModal from "./CommentModal";
import Story from "./Story";

const Post = () => {
  const userId = useSelector((state) => state.user.value._id);
  const modal = useSelector((state) => state.modal.value);
  const postQuery = useInfiniteQuery({
    queryKey: ["posts"],
    getNextPageParam: (prevData) => prevData.nextPage,
    queryFn: ({ pageParams = 1 }) => homePost(userId, pageParams),
    refetchOnWindowFocus: false,
  });

  if (postQuery.isLoading) return <h1>loading</h1>;

  return (
    <Grid
      container
      direction="row"
      sx={{
        height: "100vh",
        overflow: "auto",
        padding:3
      }}
    >
      <Story/>
      {modal && <CommentModal/>}

      {postQuery.data.pages.map((page) =>
        page.map((posts) => {
          return <PostLg posts={posts} key={posts._id} />;
        })
      )}
    </Grid>
  );
};

export default Post;
