import { Grid } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { homePost } from "../../helper/helper";
import { useSelector } from "react-redux";
import PostLg from "./PostLg";
import CommentModal from "./CommentModal";

const Post = () => {
  const userId = useSelector((state) => state.user.value._id);
  const modal = useSelector((state) => state.modal.value);
  const { data, isLoading } = useInfiniteQuery({
    queryKey: ["posts"],
    getNextPageParam: (prevData) => prevData.nextPage,
    queryFn: ({ pageParams = 1 }) => homePost(userId, pageParams),
    refetchOnWindowFocus: false,
  });

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
      {modal && <CommentModal />}

      {data.pages.map((page) =>
        page.map((posts) => {
          return <PostLg posts={posts} key={posts._id} />;
        })
      )}
    </Grid>
  );
};

export default Post;
