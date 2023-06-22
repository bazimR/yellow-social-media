import { Grid } from "@mui/material";
import Post from "../../components/user/Post";
import MobileHome from "../../components/user/MobileHome";
import ProfileWidget from "../../components/user/ProfileWidget";

const Home = () => {
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
            <ProfileWidget />
          </Grid>
        </Grid>
      </Grid>
      <MobileHome />
    </>
  );
};

export default Home;
