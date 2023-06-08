import { Grid } from "@mui/material";
import Story from "../../components/user/Story";
import Post from "../../components/user/Post";
import MobileHome from "../../components/user/MobileHome";

const Home = () => {
  return (
    <>
      <Grid container  sx={{ display: { xs: "none", lg: "flex" } }}>
        <Grid item xs={8} sx={{ display: "flex", flexDirection: "column" }}>
          <Story />
          <Post />
        </Grid>
        <Grid item xs={4} sx={{ height: "100vh" }}>
          left
        </Grid>
      </Grid>
      <MobileHome />
    </>
  );
};

export default Home;