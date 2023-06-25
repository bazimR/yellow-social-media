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
import { RiEditFill } from "@react-icons/all-files/ri/RiEditFill.esm";
import { RiGridFill } from "@react-icons/all-files/ri/RiGridFill.esm";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { profilePosts } from "../../helper/helper";
import { setCoverModal, setProfileModal } from "../../redux/editProfileSlice";

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
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
  const handleProfileEdit = () => {
    dispatch(setProfileModal(true));
  };
  const handleCover = () => {
    dispatch(setCoverModal(true));
  };

  if (isLoading) return <h1>loading</h1>;
  return (
    // TODO:refactor!!!!!!!!!!
    <>
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
            sx={{
              borderRadius: "15px",
              height: 500,
              width: "65vw",
              paddingBottom: 2,
            }}
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
              image={user.coverImageUrl}
            >
              <Button
                onClick={handleCover}
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
              <Grid
                sx={{ display: "flex", flexDirection: "column", padding: 0 }}
              >
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: "3.375em",
                    fontWeight: 400,
                    color: "primary.dark",
                  }}
                >
                  {user.username}
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
                    fontWeight: 400,
                    color: "primary.dark",
                  }}
                >
                  {user.firstname} {user.lastname}
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
              <Button
                onClick={handleProfileEdit}
                size="medium"
                sx={{
                  marginLeft: "auto",
                  marginRight: 2,
                  marginTop: "auto",
                  color: "primary.main",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  alignItems: "center",
                  paddingX: 1,
                }}
                variant="text"
                startIcon={
                  <RiEditFill style={{ width: "15px", height: "15px" }} />
                }
              >
                <Typography
                  sx={{ fontSize: "1em", fontWeight: 600, textAlign: "center" }}
                >
                  edit profile
                </Typography>
              </Button>
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
            <Grid sx={{ marginY: 3 }}>
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
              rowHeight="auto"
            >
              {data.map((item) => (
                <ImageListItem key={item._id}>
                  <img
                    // onClick={handleClick} //TODO: add post view
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
    </>
  );
};

export default Profile;
