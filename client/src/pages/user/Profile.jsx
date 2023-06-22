import {
  Card,
  Grid,
  CardMedia,
  Button,
  CardContent,
  Avatar,
  Typography,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { RiCamera2Fill } from "@react-icons/all-files/ri/RiCamera2Fill.esm";
import { RiEdit2Fill } from "@react-icons/all-files/ri/RiEdit2Fill.esm";
import { RiGridFill } from "@react-icons/all-files/ri/RiGridFill.esm";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { profilePosts } from "../../helper/helper";

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  const userId = user._id;
  const { data, isLoading } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => profilePosts(userId),
  });
  const style = {
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: "2px 10px 40px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(1.9px)",
    WebkitBackdropFilter: "blur(1.9px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };
  const imageAddress =
    "https://images.unsplash.com/photo-1603486002664-a7319421e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2484&q=80";
  if (isLoading) return <h1>loading</h1>;
  return (
    <Grid
      container
      direction="row"
      sx={{
        display: { xs: "none", lg: "flex" },
        overflow: "auto",
        height: "100vh",
        alignItems: "flex-start",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          top: 0,
          right: 0,
          left: 0,
          p: 2,
          height: 530,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{ borderRadius: "15px", height: 500, width: "65vw" }}
          style={style}
        >
          <CardMedia
            title="cover-image"
            sx={{
              width: "65vw",
              height: 300,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "end",
            }}
            image={imageAddress}
          >
            <Button
              sx={{
                margin: 2,
                paddingX: 2,
                color: "primary.main",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
              variant="text"
              startIcon={<RiCamera2Fill />}
            >
              edit cover photo
            </Button>
          </CardMedia>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CardContent>
              <Avatar
                src={user.profileUrl}
                sx={{
                  border: 5,
                  borderColor: "white",
                  mt: -10,
                  position: "sticky",
                  width: 150,
                  height: 150,
                  backgroundColor: "primary.light",
                }}
              />
            </CardContent>
            <Grid sx={{ display: "flex", flexDirection: "column", padding: 0 }}>
              <Typography
                component={"span"}
                sx={{
                  fontSize: "3.375em",
                  fontWeight: 400,
                  color: "primary.dark",
                }}
              >
                {user.username}
                <Button
                  size="small"
                  sx={{
                    marginX: 1,
                    color: "primary.main",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    alignItems: "center",
                    paddingX: 1,
                  }}
                  variant="text"
                  startIcon={
                    <RiEdit2Fill style={{ width: "12px", height: "12px" }} />
                  }
                >
                  <Typography sx={{ fontSize: "0.775em", fontWeight: 600 }}>
                    edit profile
                  </Typography>
                </Button>
              </Typography>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  paddingY: 1,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "primary.dark",
                    mr: 1,
                  }}
                >
                  {data.length}
                </Typography>
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "primary.dark",
                    mr: 1,
                  }}
                >
                  posts
                </Typography>
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "primary.dark",
                    mr: 1,
                  }}
                >
                  {user.follower.length}
                </Typography>
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "primary.dark",
                    mr: 1,
                  }}
                >
                  followers
                </Typography>
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "primary.dark",
                    mr: 1,
                  }}
                >
                  {user.following.length}
                </Typography>
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "primary.dark",
                  }}
                >
                  following
                </Typography>
              </Grid>
              <Typography
                component={"span"}
                sx={{
                  fontSize: "16px",
                  fontWeight: 300,
                  color: "primary.dark",
                }}
              >
                {user.email}
              </Typography>
              <Box sx={{ width: 300, height: 50, mt: 1 }}>
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "primary.dark",
                  }}
                >
                  {user.biography || "add bio"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            borderRadius: "15px",
            width: "65vw",
          }}
        >
          <Grid>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "primary.dark",
                fontSize: "1.5em",
              }}
            >
              <RiGridFill
                style={{ width: "1.2em", height: "1.2em", marginRight: 5 }}
              />
              posts
            </Typography>
          </Grid>

          <ImageList
            sx={{
              overflow: "visible",
              marginBottom: 5,
              borderRadius: "15px",
            }}
            cols={3}
            rowHeight='auto'
          >
            {data.map((item) => (
              <ImageListItem key={item._id}>
                <img
                  src={item.imageUrl}
                  srcSet={item.imageUrl}
                  alt={item.caption}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
