import { Grid } from "@mui/material";
import Story from "../../components/user/Story";
import Post from "../../components/user/Post";

const Home = () => {
  return (
    <Grid container sx={{ display: { xs: "none", lg: "flex" } }}>
      <Grid xs={8} container direction={"column"}>
        <Story />
        <Post/>
      </Grid>
      <Grid xs={4} sx={{ height: "100vh" }}>
        left
      </Grid>
    </Grid>
  );
};

export default Home;
