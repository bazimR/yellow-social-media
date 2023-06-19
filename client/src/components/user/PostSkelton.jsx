import {
  Grid,
  Card,
  CardActions,
  Typography,
  Skeleton,
} from "@mui/material";
const PostSkelton = () => {
  const skelton = [1];
  const style = {
    background: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(1.9px)",
    WebkitBackdropFilter: "blur(1.9px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  };
  return skelton.map((doc) => {
    return (
      <Grid
        key={doc}
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Card
          style={style}
          elevation={10}
          sx={{
            width: 500,
            height: 670,
            padding: 1,
            borderRadius: "20px",
          }}
        >
          <CardActions sx={{ top: 0, left: 0, padding: 0 }}>
            <Skeleton
               animation='wave'
              sx={{ margin: 1, padding: 0 }}
              variant="circular"
              width={40}
              height={40}
            />
            <Typography
              sx={{
                marginRight: 0,
                fontSize: "0.9em",
                fontWeight: "fontWeightMedium",
                color: "black",
                cursor: "default",
              }}
            >
              <Skeleton
                 animation='wave'
                variant="text"
                width={"5em"}
                sx={{ fontSize: "1rem" }}
              />
            </Typography>
          </CardActions>
         
            <Skeleton
               animation='wave'
              sx={{
                width: 500,
                height: 500,
                padding: 0,
                margin: 0,
                borderRadius: "20px",
              }}
              variant="rounded"
            />
          
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
                  alignItems: "inherit",
                }}
              >
                <Skeleton
                   animation='wave'
                  variant="text"
                  width={"100%"}
                  sx={{ fontSize: "1rem" }}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "inherit",
                }}
              >
                <Skeleton
                   animation='wave'
                  variant="text"
                  width={"30%"}
                  sx={{ fontSize: "1rem" }}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "inherit",
                }}
              >
                <Skeleton
                   animation='wave'
                  variant="text"
                  width={"100%"}
                  height={40}
                  sx={{ fontSize: "1rem" }}
                />
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    );
  });
};

export default PostSkelton;
