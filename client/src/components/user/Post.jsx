import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import PostLg from "./PostLg";
import CommentModal from "./CommentModal";
import Story from "./Story";
import PostSkelton from "./PostSkelton";
import { useUsersQuery } from "../../hooks/user/fetch.posts";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import StoryModal from "./StoryModal";

const Post = () => {
  const userId = useSelector((state) => state.user.value._id);
  const modal = useSelector((state) => state.modal.value);
  const { data, fetchNextPage, status, isFetching, hasNextPage } =
    useUsersQuery(userId);
  const lastPostReft = useRef(null);

  const { ref, entry } = useIntersection({
    root: lastPostReft.current,
    threshold: 0.75,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  return (
    <>
      <Grid
        container
        direction="row"
        sx={{
          height: "100vh",
          overflow: "auto",
          padding: 3,
        }}
      >
        <Story />

        {modal && <CommentModal />}
        <StoryModal />
        {status === "loading" || data === undefined ? (
          <PostSkelton />
        ) : (
          data.pages.map((page) => {
            return page.results.map((posts, i) => {
              if (i === page.results.length) {
                return (
                  <Grid
                    key={posts._id}
                    ref={ref}
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <PostLg posts={posts} />
                  </Grid>
                );
              } else {
                return (
                  <Grid
                    key={posts._id}
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <PostLg posts={posts} />
                  </Grid>
                );
              }
            });
          })
        )}
        <Grid
          ref={ref}
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          {hasNextPage || isFetching || data.pages.length === 0 ? (
            <PostSkelton />
          ) : (
            <Typography color="HighlightText">all caught up...</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Post;
