import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useSavedQuery } from "../../hooks/user/fetch.saved";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef } from "react";
import PostSkelton from "../../components/user/PostSkelton";
import PostLg from "../../components/user/PostLg";

const Saved = () => {
  const lastPostReft = useRef(null);

  const userId = useSelector((state) => state.user.value._id);
  const { data, fetchNextPage, status, hasNextPage } =
    useSavedQuery(userId);

  const { ref, entry } = useIntersection({
    root: lastPostReft.current,
    threshold: 0.6,
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
          overflow: "scroll",
          paddingY: 10,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        {status === "loading" || data.pages.total ? (
          <>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PostSkelton />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PostSkelton />
            </Grid>
          </>
        ) : (
          data.pages.map((page) => {
            return page.results.map((posts, i) => {
              if (i === page.results.length) {
                return (
                  <Grid
                    key={posts._id}
                    ref={ref}
                    item
                    xs={6}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
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
                    xs={6}
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
          {hasNextPage ? (
            <>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PostSkelton />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PostSkelton />
              </Grid>
            </>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Saved;
