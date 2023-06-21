import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Post from "../../components/user/Post";
import MobileHome from "../../components/user/MobileHome";
import { useSelector } from "react-redux";

const Home = () => {
  const style = {
    background:
      "linear-gradient(to bottom , rgba(255,255,255,0) 5%, rgba(	80, 199, 255, 0.37) 40%)",
  };
  const styleBox = {
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(2.9px)",
    WebkitBackdropFilter: "blur(1.9px)",
    // border: "1px solid rgba(255, 255, 255, 0.1)",
  };
  const user = useSelector((state) => state.user.value);
  const imageAddress =
    "https://images.unsplash.com/photo-1676793894040-b6dd72276620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2xhc3Ntb3JwaGlzbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
  return (
    <>
      <Grid container sx={{ display: { xs: "none", lg: "flex" } }}>
        <Grid item xs={8} sx={{ display: "flex", flexDirection: "column" }}>
          <Post />
        </Grid>
        <Grid
          item
          xs={4}
          style={{ position: "fixed", right: 0, top: 0, height: "100vh" }}
        >
          <Grid padding={3}>
            <Card
              style={styleBox}
              sx={{
                backgroundImage: `url(${imageAddress})`,
                height: 150,
                width: 380,
                display: "flex",
                justifyContent: "end",
                flexDirection: "column",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "15px",
              }}
            >
              <CardActionArea style={style} sx={{ borderRadius: 0 }}>
                <CardContent
                  sx={{ padding: 1.2, display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    src={user.profileUrl}
                    variant="rounded"
                    sx={{
                      width: "75px",
                      height: "75px",
                      borderRadius: "15px",
                      backgroundColor: "primary.main",
                    }}
                  />
                  <Typography
                    component={"span"}
                    sx={{ fontSize: "16px", fontWeight: 500, ml: 1 }}
                    color="#00000"
                  >
                    {user.username}
                    <Typography
                      sx={{ fontSize: "13px", fontWeight: 400 }}
                      color="#004242"
                    >
                      @{user.email}
                    </Typography>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <MobileHome />
    </>
  );
};

export default Home;
